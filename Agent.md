# Agent.md — Day 5 Homework: Pareto Talent Landing Page

Agent-oriented guide. Read this before touching anything in `day5hw/`.

## 1. What this project is

A single-page marketing landing page for **Pareto Talent's "Right Hand Program"**, built as
Day 5 homework for the Pareto Talent bootcamp ("Funnels, Vibe Coding & Branding").

- **Brief**: one offer, one audience, one action.
  - Offer: the Right Hand Program (a dedicated top 1% executive assistant).
  - Audience: founders of 6–7 figure businesses who are time-poor.
  - Action: **Book Your Free Strategy Call**.
- **Format**: pure HTML + CSS + vanilla JS. **No framework, no build step, no package manager.**
  Open `site/index.html` and it runs.
- **The page itself is in English.** The surrounding planning docs are in Spanish; that is
  intentional and must not "fix" the English copy.

## 2. Folder structure

```
day5hw/
├── site/                      <-- THE DEPLOYABLE FOLDER. Drop this one, nothing else.
│   ├── index.html             8 sections, in order. All copy lives here.
│   ├── styles.css             design tokens + every component. No CSS framework.
│   ├── script.js              6 jobs: reveal, count-up, modal, chrome, progress, parallax
│   └── assets/                copy of the 6 images, referenced as assets/...
├── assets/                    master copy from the image-generation step (MASTER-DIA5.md).
│                              Byte-identical to site/assets/. Do not delete either one.
├── Kasim-Second-Brain/        source of truth for ALL facts, pricing and testimonials
├── TODO-CREAR-DIA5.md         the 8 sections of final copy, ready to paste
├── MASTER-DIA5.md             asset names, generation prompts, palette, layout plan
├── MASTER-PROMPT-PAGINA.md    the full page spec handed to a page builder
├── CONSIGNA-Y-TRANSCRIPT-DIA5.md   the literal assignment + class transcript
├── PROMPTS-FASE3.md           prompt-engineering phase notes
└── Agent.md                   this file
```

**`site/` must stay self-contained.** `index.html`, `styles.css`, `script.js` and `assets/`
travel together. No absolute paths, no symlinks, nothing fetched from a build output.

## 3. Run and test it

```bash
# simplest: just open the file
xdg-open site/index.html          # or open it in a browser by hand

# or serve it (closer to production, and needed to test anything relative)
cd site && python3 -m http.server 8000
# -> http://localhost:8000

# syntax gate for the JS
node --check site/script.js
```

Check these before calling any change done:

- 8 sections render in order: hero, social proof, problem, how it works, benefits,
  the offer, guarantees, final CTA.
- No horizontal scrollbar at **1440 / 1024 / 768 / 390** px.
- Stats count up when scrolled into view; the details dialog opens, traps focus and closes
  with Escape.
- With *Emulate CSS `prefers-reduced-motion: reduce`* on, no motion runs and the stats show
  their final values immediately.
- Nothing is invisible without JS: reveal styles are gated behind `.js`, and the dialog
  triggers ship `hidden` and are revealed by the script.

## 4. Brand rules (non-negotiable)

| Rule | Value |
|---|---|
| Palette 60-30-10 | White `#FFFFFF` 60% · Deep Blue `#2563EB` 30% · Gray `#64748B` 10% |
| Navy | `#1E3A8A` — footer, final CTA band, step-number discs |
| Green | `#059669` — **checkmark icons in Benefits only** |
| Forbidden | neon, yellow, rainbow, "stocky generic AI" gradients |
| Headings | Karla 700 |
| Body | Inter 400 |
| Icons | Lucide, one set, inlined as static SVGs in the markup. No CDN, no download |
| External deps | Google Fonts only. Nothing else |
| Copy | English, verbatim from the source docs. Never reworded, never re-ordered |

Supporting tints of the same hues (`--blue-50` … `--blue-400`, `--navy-deep`) are allowed;
new hues are not.

## 5. Content sources — copy is not yours to write

The copy is authored upstream. Read the source before changing any string.

| Source | What it is authoritative for |
|---|---|
| `TODO-CREAR-DIA5.md` | the 8 sections of final copy — **the primary copy source** |
| `MASTER-PROMPT-PAGINA.md` | section order, brand system, technical requirements |
| `MASTER-DIA5.md` | asset filenames, generation prompts, palette table, layout |
| `Kasim-Second-Brain/01-Identity-Offer/offer-pricing.md` | pricing, the 7 program components, guarantees, testimonials |
| `Kasim-Second-Brain/` (rest) | identity, frameworks, transcripts |

Rules that follow from that:

1. **Do not change** headings, body text, testimonials, numbers or pricing. The assignment
   grades the copy against the Second Brain.
2. **Do not invent facts.** Every claim on the page traces to the Second Brain.
3. The offer list and the pricing line appear twice on purpose — once in `#offer`, once in
   the details dialog. The dialog is **cloned from `#offer` by `script.js`**, so it cannot
   drift. If you edit the offer, the dialog follows automatically. Do not hand-copy it.
4. If new UI chrome is needed (a button label, a dialog title), reuse an existing string
   from the page rather than inventing one.

## 6. Assets — do not rename, do not re-export

Six files, referenced with relative `assets/...` paths:

| File | Where it is used | Real size |
|---|---|---|
| `founder.png` | hero portrait | 1254×1254 |
| `logo.png` | navbar + footer | 2688×1536 canvas |
| `favicon.png` | browser tab | 2048×2048 |
| `photo-work.jpg` | problem | 3710×5565 |
| `photo-team.jpg` | benefits | 4160×6240 |
| `photo-lifestyle.jpg` | final CTA | 4000×6000 |

- The generation prompt and section mapping for each one is in `MASTER-DIA5.md` §1–2.
- `logo.png` has a large empty canvas: `.logo-mark` in `styles.css` crops it with
  percentage offsets. **Those offsets are coupled to the exact canvas.** Re-export the logo
  and you must update `.logo-mark` in the same commit.
- `founder.png` is a portrait on a white studio background. It is deliberately **not** inside
  a `.media` frame — a frame or drop-shadow would expose the square canvas edge. It sits on
  the soft `.hero__blob` shape instead. Do not "tidy" this.
- The `width`/`height` attributes on every `<img>` match the real pixel dimensions, so the
  page does not shift while images load. Keep them accurate.

## 7. Delivery

1. **Publish** — <https://app.netlify.com/drop>, drag the **`site/` folder** onto the page.
   Get the preview URL Netlify prints.
2. **Submit** — <https://bootcamp.paretotalent.com/homework>, with the preview URL plus the
   prompts and assets you used. A screenshot is not a submission, and no domain is required.
3. **Post** — share in `#Homework`, and one thing you liked about the class in `#General`.
4. Add the preview URL to this file under a "Delivery" heading so the next person does not
   have to dig for it.

Checklist before publishing:

- [ ] `node --check site/script.js` passes
- [ ] 8 sections, in order, copy unchanged
- [ ] no horizontal overflow at 1440 / 1024 / 768 / 390
- [ ] dialog opens, closes and traps focus
- [ ] reduced motion respected
- [ ] page works with the JS disabled (nothing invisible, no dead control)

## 8. Things that will bite you

- **CSS animations outrank inline styles in the cascade.** The hero glows put the CSS drift
  on `::before` and the JS parallax on the span's own `transform` precisely so they do not
  fight. Collapse them onto one element and the parallax silently dies.
- **A cloned node keeps its `reveal` class**, which means `opacity: 0` with no observer to
  reveal it. `fillModal()` strips it. If you clone anything else into a dialog, strip it too.
- **`max-width: 100%` on `.btn`** is what stops a long CTA label from causing a horizontal
  scrollbar on a narrow phone. Do not remove it in favour of `white-space: nowrap`.
- The navbar CTA and the hero CTA are only 1–2 characters from wrapping at 390px. The
  `@media (max-width: 430px)` block is load-bearing.
