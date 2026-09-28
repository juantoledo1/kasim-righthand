# DÍA 5 — MASTER: Assets + Nombres + UI/UX Plan

## 1) ASSETS — nombre de archivo EXACTO → dónde se usa en la landing

| Archivo (exacto) | Se usa en sección | Generado con |
|---|---|---|
| `founder.png` | **HERO** (retrato + slogan) | IDEogram (sí escribe texto) |
| `logo.png` | **NAVBAR + FOOTER** | ChatGPT / Ideogram |
| `favicon.png` | **Pestaña del navegador** | ChatGPT / Ideogram |
| `photo-work.png` | **PROBLEM / HOW IT WORKS** | Pexels (gratis) |
| `photo-team.png` | **SOCIAL PROOF / BENEFITS** | Pexels (gratis) |
| `photo-lifestyle.png` | **FINAL CTA** (sensación freedom) | Pexels (gratis) |

Todos en: `day5hw/assets/`

---

## 2) PROMPTS (en inglés)

### founder.png — IDEogram (texto bien renderizado)
> "Professional corporate half-body portrait of a confident male founder in his early 40s, short dark hair, light stubble, wearing a premium NAVY BLUE t-shirt with LARGE, BOLD, CENTERED WHITE TEXT on the chest reading 'GET 20 HOURS BACK'. The text is BIG, clearly readable, uppercase, bold sans-serif font, high contrast against the navy shirt. Warm genuine smile, bright clean white studio background, soft lighting, high-end business photography, sharp focus, 4K. The text 'GET 20 HOURS BACK' must be spelled exactly and perfectly visible."
*En Ideogram poner el texto también en su campo de texto.*

### logo.png — ChatGPT o Ideogram
> "Minimalist logo for a premium executive assistant agency for founders. A single elegant bird/eagle in flight, simple geometric lines, deep blue (#2563EB) on pure white background, conveying freedom and reliability. Clean logotype style, scalable, modern, professional. No text, mark only."

### favicon.png — misma sesión del logo
> "Same eagle mark, simplified to a square favicon, deep blue on white, 512x512, high contrast, minimal."

### photo-work.png / photo-team.png / photo-lifestyle.png — Pexels/Unsplash
- photo-work.png → "entrepreneur working laptop modern office"
- photo-team.png → "remote team meeting video call professional"
- photo-lifestyle.png → "business owner relaxed coffee outdoors"

---

## 3) UI/UX PLAN — paleta profesional + psicología del color

### Paleta (60-30-10)
| Color | Hex | % | Psicología | Uso |
|---|---|---|---|---|
| Blanco | `#FFFFFF` | 60% | Claridad, espacio, premium, calma | Fondo general |
| Azul profundo | `#2563EB` | 30% | CONFIANZA, autoridad, seguridad, lealtad | Botones CTA, headings, logo |
| Gris | `#64748B` | 10% | Neutralidad, equilibrio, profesionalismo | Textos secundarios, bordes |

### Colores de apoyo (complementan sin romper la regla)
| Color | Hex | Uso |
|---|---|---|
| Navy oscuro | `#1E3A8A` | Recién en remera/footer — profundiza la confianza |
| Verde éxito (opcional) | `#059669` | Solo micro-checkmarks en benefits |

### Reglas de psicología aplicadas
- **Azul en CTA** = confianza → "Book Your Free Strategy Call" SIEMPRE en azul.
- **Blanco dominante** = el producto se ve premium, no gritón.
- **Navy** = autoridad profunda → footer y foto del founder.
- **Gris en texto secundario** = jerarquía visual clara (título azul/negro, body gris).
- **60-30-10**: nunca más de 30% de color fuerte — si algo se ve "amarillo" o cargado, es un error de UX.

### Transiciones perfectas (a usar en GoHighLevel)
- **Hover en CTA**: azul → navy (`#2563EB` → `#1E3A8A`), no salto brusco: transición 0.2s.
- **Entrada de secciones**: fade-in suave (opacity 0→1, 0.5s) al scrollear.
- **Tarjetas (benefits)**: hover con sombra sutil y elevación leve (translateY -2px).
- **Nunca** animaciones ruidosas ni colores neón: la marca es premium.
- **Tipografía**: Karla (headings, bold) + Inter (body). Jerarquía: H1 grande, H2 medio, body gris.

### Layout (hero que convierte)
1. Navbar: logo.png arriba-izquierda + CTA a la derecha.
2. Hero: izquierda = headline + sub + CTA; derecha = founder.png.
3. Social proof: 3-4 números en fila + testimonios.
4. Problem: texto + photo-work.png.
5. How it works: 4 pasos con iconos Lucide.
6. Benefits: 5 tarjetas con checkmarks + photo-team.png.
7. The offer: tabla/lista de 7 componentes + precio.
8. Guarantees: 3 tarjetas (Freedom 40, Matching, Lifetime).
9. Final CTA: fondo azul/navy con text blanco + photo-lifestyle.png.

---

## 4) CHECKLIST DE GENERACIÓN (hacer YA, 3 pasos)

- [ ] Ideogram → `founder.png` (retrato + slogan) → assets/
- [ ] ChatGPT/Ideogram → `logo.png` + `favicon.png` → assets/
- [ ] Pexels → `photo-work.png`, `photo-team.png`, `photo-lifestyle.png` → assets/
- [ ] Confirmar que los 6 archivos están en `day5hw/assets/` → construir landing