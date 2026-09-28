/* ==========================================================================
   Pareto Talent — Right Hand Program
   Vanilla JS, no dependencies. Six jobs:
     1. Reveal sections on scroll with IntersectionObserver (staggered)
     2. Count-up the social-proof stats once they scroll into view
     3. Open/close the program-details dialog with focus management
     4. Smooth in-page navigation + sticky navbar state
     5. Reading-progress hairline in the navbar
     6. Optional pointer parallax on the hero glows (fine pointers only)
   The icon set is inlined as static SVGs in the markup — no external CDN.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
   * 1. Scroll reveal
   * ------------------------------------------------------------------- */
  function stagger(container, selector, step, start) {
    var items = container.querySelectorAll(selector);
    for (var i = 0; i < items.length; i++) {
      items[i].style.setProperty('--reveal-delay', (start + i * step) + 'ms');
    }
  }

  function initReveal() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!targets.length) return;

    // No observer (or reduced motion): show everything immediately.
    if (reduceMotion || typeof window.IntersectionObserver !== 'function') {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // Cascade siblings inside each group so cards animate in sequence.
    // The offer list has 7 rows, so it uses a tighter step to keep the
    // whole cascade under half a second.
    document.querySelectorAll('.testimonials, .steps, .guarantees__grid, .stats, .checks')
      .forEach(function (group) { stagger(group, '.reveal', 80, 0); });
    document.querySelectorAll('.offer')
      .forEach(function (group) { stagger(group, '.reveal', 60, 0); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // reveal once, then stop watching
      });
    }, {
      threshold: 0.12,
      // Fires a little early so content is already in place on arrival.
      rootMargin: '0px 0px -8% 0px'
    });

    targets.forEach(function (el) { observer.observe(el); });

    // Safety net: anything still hidden after 2.5s gets revealed anyway,
    // so a fast scroll or a tall viewport can never strand invisible content.
    window.setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    }, 2500);
  }

  /* ---------------------------------------------------------------------
   * 3. Count-up stats
   *
   * The final strings ("3", "$1M+", "100%") are already in the markup, so a
   * script failure, a reduced-motion visitor or a browser without
   * requestAnimationFrame all see the real numbers. The animation only ever
   * rewrites the numeric core and re-attaches the prefix and suffix it parsed
   * out of the original text, so the rendered result is byte-identical to the
   * static one.
   * ------------------------------------------------------------------- */
  function parseStatValue(raw) {
    // "prefix" = everything before the first digit, "suffix" = everything after.
    var match = /^\s*([^\d]*?)(\d+(?:\.\d+)?)([\s\S]*)$/.exec(raw);
    if (!match) return null;
    return { prefix: match[1], target: parseFloat(match[2]), suffix: match[3] };
  }

  function initCountUp() {
    var list = document.querySelector('.stats');
    if (!list) return;

    var items = [];
    Array.prototype.forEach.call(list.querySelectorAll('.stat__value'), function (el) {
      var parsed = parseStatValue(el.textContent);
      if (parsed) items.push({ el: el, prefix: parsed.prefix, target: parsed.target, suffix: parsed.suffix });
    });
    if (!items.length) return;

    // Reduced motion, or no rAF: leave the markup exactly as it is.
    if (reduceMotion || typeof window.requestAnimationFrame !== 'function') return;
    if (typeof window.IntersectionObserver !== 'function') return;

    var DURATION = 1400;
    var STAGGER = 90;

    function count(item, delay) {
      window.setTimeout(function () {
        var start = 0;

        function frame(now) {
          if (!start) start = now;
          var progress = Math.min((now - start) / DURATION, 1);
          // easeOutCubic: fast off the line, soft landing on the target.
          var eased = 1 - Math.pow(1 - progress, 3);
          item.el.textContent = item.prefix + Math.round(item.target * eased) + item.suffix;
          if (progress < 1) window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
      }, delay);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.disconnect();   // once, and only once
        items.forEach(function (item, index) { count(item, index * STAGGER); });
      });
    }, {
      // 0.2 rather than "half visible": the two-column mobile grid is short
      // enough that a stricter threshold can be missed on a short viewport.
      threshold: 0.2,
      rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(list);
  }

  /* ---------------------------------------------------------------------
   * 3. Program-details dialog
   *
   * The body is cloned out of #offer on first open instead of being repeated in
   * the HTML: the seven components and the pricing line then cannot drift away
   * from the offer they are meant to repeat.
   * ------------------------------------------------------------------- */
  function fillModal(body) {
    if (!body || body.childElementCount) return;

    var offer = document.querySelector('#offer .offer');
    var pricing = document.querySelector('#offer .pricing');
    if (!offer) return;

    // A clone must not inherit the scroll-reveal hidden state: inside the
    // dialog nothing is observed, so `.reveal` would stay at opacity 0 forever.
    function unhide(node) {
      if (node.classList) node.classList.remove('reveal', 'is-visible');
      node.style.removeProperty('--reveal-delay');
      Array.prototype.forEach.call(node.querySelectorAll('.reveal, .is-visible'), function (el) {
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--reveal-delay');
      });
    }

    var list = offer.cloneNode(true);
    unhide(list);
    body.appendChild(list);

    if (pricing) {
      var price = pricing.cloneNode(true);
      unhide(price);
      body.appendChild(price);
    }
  }

  function initModal() {
    var modal = document.getElementById('program-details');
    if (!modal) return;

    var dialog = modal.querySelector('[data-modal-dialog]');
    var body = modal.querySelector('[data-modal-body]');
    var triggers = document.querySelectorAll('[data-modal-open]');

    // Now that the dialog can actually be opened, let the triggers be seen.
    Array.prototype.forEach.call(triggers, function (trigger) { trigger.removeAttribute('hidden'); });
    if (!triggers.length || !dialog) return;

    var lastFocus = null;

    function focusables() {
      return Array.prototype.filter.call(
        dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
        function (el) { return el.getClientRects().length > 0; }
      );
    }

    function onKeydown(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep Tab inside the dialog while it owns the screen.
      var items = focusables();
      if (!items.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function open(event) {
      if (event) event.preventDefault();
      lastFocus = (event && event.currentTarget) || document.activeElement;

      // Clone on first open, not on load: a visitor who never opens the
      // dialog never pays for the extra nodes. fillModal is idempotent.
      fillModal(body);

      // Losing the scrollbar shifts the page sideways; pad for it.
      var gap = window.innerWidth - document.documentElement.clientWidth;
      if (gap > 0) document.body.style.setProperty('--scrollbar-gap', gap + 'px');
      document.body.classList.add('is-modal-open');

      modal.hidden = false;
      // A frame has to pass with the dialog laid out before the open
      // transition has a starting state to animate from. Without rAF there
      // is no frame, so apply the class straight away — and, critically, keep
      // going: this must never be able to skip the key handler below, or the
      // dialog would open with no way to close it.
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(function () { modal.classList.add('is-open'); });
      } else {
        modal.classList.add('is-open');
      }

      document.addEventListener('keydown', onKeydown);
      dialog.focus();
    }

    function close() {
      if (modal.hidden) return;
      modal.classList.remove('is-open');
      modal.hidden = true;
      document.body.classList.remove('is-modal-open');
      document.body.style.removeProperty('--scrollbar-gap');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
      lastFocus = null;
    }

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', open);
    });

    // Overlay click, the close button, and the empty part of the fixed layer.
    modal.addEventListener('click', function (event) {
      if (event.target === modal || (event.target.closest && event.target.closest('[data-modal-close]'))) {
        close();
      }
    });
  }

  /* ---------------------------------------------------------------------
   * 4. Chrome — sticky navbar state, reading progress + smooth anchors
   * ------------------------------------------------------------------- */
  function initChrome() {
    var navbar = document.getElementById('navbar');
    var bar = document.getElementById('progress');
    var ticking = false;

    function paint() {
      ticking = false;
      var y = window.scrollY || document.documentElement.scrollTop;

      if (navbar) navbar.classList.toggle('is-stuck', y > 8);

      if (bar) {
        // 0 at the top, 1 when the last pixel of the document is on screen.
        var span = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (span > 0 ? Math.min(y / span, 1) : 0) + ')';
      }
    }

    function onScroll() {
      if (ticking) return;      // one write per frame, not one per event
      ticking = true;
      window.requestAnimationFrame(paint);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    paint();

    // scroll-behavior + scroll-padding-top already handle the offset in CSS.
    // This only adds a guard for reduced motion and a focus move for a11y.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        // Move keyboard focus with the viewport without adding a tab stop.
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });

    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------------------
   * 5. Hero glow parallax — the one piece of JS-driven motion
   *
   * Kept deliberately cheap: it writes a single transform per layer inside one
   * requestAnimationFrame loop that stops itself as soon as the layers settle,
   * it only runs while the hero is on screen, and it is skipped entirely for
   * coarse pointers (touch) and for reduced-motion visitors. The CSS drift
   * lives on ::before, so this never fights the keyframe for the transform.
   * ------------------------------------------------------------------- */
  function initHeroParallax() {
    var layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length || reduceMotion) return;
    if (typeof window.requestAnimationFrame !== 'function') return;
    if (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) return;

    var hero = document.getElementById('hero');
    if (!hero) return;

    var depths = [];
    Array.prototype.forEach.call(layers, function (layer) {
      depths.push(parseFloat(layer.getAttribute('data-parallax')) || 1);
    });

    var targetX = 0, targetY = 0, x = 0, y = 0;
    var queued = false;
    var onScreen = true;

    if (typeof window.IntersectionObserver === 'function') {
      var watcher = new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        if (!onScreen) { targetX = 0; targetY = 0; }   // drift back to rest
      }, { threshold: 0 });
      watcher.observe(hero);
    }

    function paint() {
      for (var i = 0; i < layers.length; i++) {
        layers[i].style.transform =
          'translate3d(' + (x * depths[i]).toFixed(2) + 'px,' + (y * depths[i]).toFixed(2) + 'px,0)';
      }
    }

    function frame() {
      queued = false;
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      if (Math.abs(targetX - x) < 0.06 && Math.abs(targetY - y) < 0.06) { x = targetX; y = targetY; }
      paint();
      if (x !== targetX || y !== targetY) schedule();
    }

    function schedule() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(frame);
    }

    window.addEventListener('pointermove', function (event) {
      if (!onScreen) return;
      var w = window.innerWidth || 1;
      var h = window.innerHeight || 1;
      targetX = (event.clientX / w - 0.5) * 2;   // -1 .. 1
      targetY = (event.clientY / h - 0.5) * 2;
      schedule();
    }, { passive: true });
  }

  /* ------------------------------------------------------------------- */
  function init() {
    initReveal();
    initCountUp();
    initModal();
    initChrome();
    initHeroParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
