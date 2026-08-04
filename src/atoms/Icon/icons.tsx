// src/atoms/Icon/icons.tsx
// Icons on a 24x24 grid. Each entry is the *content* of the <svg> — one or
// more shapes — rendered inside Icon.tsx's wrapper, which sets the shared
// defaults (fill="none", stroke="currentColor", strokeWidth, round caps/joins).
// A shape only needs its own attributes when it departs from those defaults:
// a filled shape sets fill="currentColor" and stroke="none" (no color literals —
// everything recolors via currentColor from the parent).
//
// Every icon below is measured against the prototype
// (Nina Canina.dc.html) where a counterpart exists — see
// docs/superpowers/0b3-icon-refactor-report.md for the line-by-line audit.
// A handful have no counterpart in the prototype (the site draws them as
// plain text glyphs, e.g. "+", "−", "✕", or doesn't draw them at all); those
// are marked `// invented by the DS: no counterpart in the prototype` and left as-is —
// those are ours, not measurements of the design.
export const ICONS = {
  // Bag + 2 solid wheels. 3 real candidates existed for "cart" (see the
  // report); this one won on repetition — the exact "Agregar al carrito"
  // button icon, measured 3x (lines 222, 291, 533), 2 of those 3 (291, 533)
  // sharing this wheel geometry (r=1.4, cy=19.5) against 1 (line 222, r=1.5,
  // cy=19). The header cart badge (line 54) lost, 1 use.
  cart: (
    <>
      <path d="M4 5h2l2 11h9l2-7H7" />
      <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),

  // Brand bubble, fully filled, no handset detail. 3 real candidates
  // existed (see the report); this one won on repetition — measured 4x
  // (lines 765, 993, 1028, 1335) against 1 each for the bubble+handset
  // (line 207) and the ring+handset (line 66) variants.
  whatsapp: (
    <path
      d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z"
      fill="currentColor"
      stroke="none"
    />
  ),

  // Rect + 2 tabs + divider. Measured: header "Agendar cita" button, line
  // 62 (identical repeat at line 166).
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),

  // invented by the DS: no counterpart in the prototype (no
  // search/magnifying-glass icon or search input appears anywhere in the
  // markup). Interface glyph of our own, not measured — kept because a real
  // icon beats a typographic character for accessibility and alignment.
  search: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3" />,

  // invented by the DS: no counterpart in the prototype (every close
  // control there is the literal "✕" text glyph, e.g. lines 940/1067/1188,
  // not an SVG). Interface glyph of our own, not measured.
  close: <path d="M18 6 6 18M6 6l12 12" />,

  // Measured: testimonial carousel "next" arrow, line 336 (the "prev"
  // arrow at line 335 is its mirror, `M14 6l-6 6 6 6`, not currently a
  // separate icon in this set).
  'chevron-right': <path d="M10 6l6 6-6 6" />,

  // Measured, single use: booking-confirmation success glyph, line 1148 —
  // the only *bare* checkmark (no circle in the same <svg>) in the
  // prototype. Kept distinct from `check-circle` below (8 uses, its own
  // compound icon) on the coordinator's call: different roles, not a
  // duplicate to resolve by frequency.
  check: <path d="M5 13l4 4 10-10" />,

  // Compound "circle + check" badge. Measured 8x (lines 250, 251, 252, 258,
  // 259, 260, 261, 353) — the far more common check pattern in the
  // prototype, always drawn as circle+check together, never as a bare
  // check. Re-verified during the 0b3-ds-gapfill round: 7 of these 8 uses
  // (250-252, 258-261) are the HotelStore Requisitos/Incluye checklist —
  // same geometry HotelStore's own report flagged, already covered here,
  // no new icon needed. Two-tone by design (accent circle behind a
  // contrasting check):
  // the circle takes currentColor like every other shape here, but the
  // checkmark can't — it sits on top of that same circle, so a currentColor
  // stroke would render invisible (same color as what's behind it). It
  // needs a color that stays fixed regardless of the circle's currentColor,
  // so it uses the `--nc-white` token directly instead. Don't "fix" this by
  // switching it back to currentColor.
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
      <path d="M8 12.5l2.5 2.5 5-5" stroke="var(--nc-white)" />
    </>
  ),

  // invented by the DS: no counterpart in the prototype (quantity steppers
  // use the literal "+" text glyph, e.g. line 961). Interface glyph of our
  // own, not measured.
  plus: <path d="M12 5v14M5 12h14" />,

  // invented by the DS: no counterpart in the prototype (quantity steppers
  // use the literal "−" text glyph, e.g. line 959). Interface glyph of our
  // own, not measured.
  minus: <path d="M5 12h14" />,

  // The 3 icons below come from the "¿Por qué elegir" section of the
  // prototype (Nina Canina.dc.html, lines 202/212/217). Geometry
  // (the `d` / cx/cy/r attributes) is copied verbatim from that markup.

  // Person + heart — "Atención personalizada" (line 202).
  care: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 19c0-3.2 2.9-5.5 6.5-5.5" />
      <path
        d="M17 14.5c1.2 0 2.5 1 2.5 2.4 0 1.7-2.5 3.1-2.5 3.1s-2.5-1.4-2.5-3.1c0-1.4 1.3-2.4 2.5-2.4z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),

  // Rect + circle + flap — "Fotos antes y después" (line 212).
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <circle cx="12" cy="13.5" r="3.2" />
      <path d="M8 7l1.5-2.5h5L16 7" />
    </>
  ),

  // Shield + check — "Hospedaje seguro" (line 217).
  'shield-check': (
    <>
      <path d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),

  // Gap-fill round (Header/Footer/Hero/HotelStore/Testimonials, 0b3-ds-gapfill):
  // these 8 close out the 26 inline SVGs those 5 sections drew because the
  // catalog didn't cover them yet. Measured against Nina Canina.dc.html,
  // frequency counted across the whole file (not just these 5 sections).

  // Single filled path, 4 toe pads + palm as one compound path (no
  // sub-shapes needed — the "z...M..." subpaths close on their own).
  // Measured 6x total (lines 39 Hero, 147/161/176 Servicios — a section not
  // built yet, out of scope here — 236 HotelStore, 986 Footer); at least 3
  // of those are in the sections this round covers, well past the
  // threshold either way.
  paw: (
    <path
      d="M9 11.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm6 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-9.5 4a2 2 0 11-4 0 2 2 0 014 0zM13 16.5c0 2-1.8 3-3.5 3S6 18.5 6 16.5 8 13 9.5 13s3.5 1.5 3.5 3.5z"
      fill="currentColor"
      stroke="none"
    />
  ),

  // Head + shoulders. Measured once (Header "Ingresar", line 58) — under
  // the 3-use threshold, but a login/account glyph is a genuinely reusable
  // interface icon (not a one-screen decoration), so it clears the bar on
  // judgment per the coordinator's rule 1.
  account: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </>
  ),

  // Envelope: rect + flap. Measured once (Footer contact list, line 1029)
  // — under threshold, kept as a genuinely reusable interface glyph (same
  // call as `account`; likely needed again for contact/email fields).
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),

  // Map pin: outline + hole. Measured once (Footer contact list, line
  // 1030) — under threshold, same reusable-glyph call as `account`/`mail`.
  location: (
    <>
      <path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),

  // Brand mark. Measured once (Footer social row, line 1003) — a social
  // icon is reusable by nature (one instance per page is expected), so a
  // single measured use still clears the bar. The dot is solid in the
  // markup (`fill="#fff"`, no stroke); the outer square and lens stay
  // stroke-only like every other outline shape in this file.
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),

  // Brand mark, fully filled, no stroke. Measured once (Footer social row,
  // line 1004) — reusable brand glyph, same call as `instagram`.
  facebook: (
    <path
      d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13V9c0-.6.4-1 1-1z"
      fill="currentColor"
      stroke="none"
    />
  ),

  // Brand mark, fully filled, no stroke. Measured once (Footer social row,
  // line 1005) — reusable brand glyph, same call as `instagram`/`facebook`.
  tiktok: (
    <path
      d="M16 3a5 5 0 005 5v3a8 8 0 01-5-1.7V15a6 6 0 11-6-6v3a3 3 0 103 3V3z"
      fill="currentColor"
      stroke="none"
    />
  ),

  // Bed frame: 2 levels of detail existed in the prototype for this
  // concept — with leg/headboard ticks (`...M3 18v2m18-2v2M7 10V8a2 2 0
  // 012-2h2`, lines 85 Hero CTA + 166 Servicios card, 2 uses) vs. the frame
  // alone (line 242 HotelStore badge, 1 use). The detailed one wins,
  // 2 against 1, no tie to break.
  bed: <path d="M3 18v-5a3 3 0 013-3h12a3 3 0 013 3v5M3 14h18M3 18v2m18-2v2M7 10V8a2 2 0 012-2h2" />,

  // Round 4 (0b3-ds-gapfill, package.json 0.2.1): 4 more glyphs the
  // Aseo/Tienda/checkout areas drew inline. Each measures under the 3-use
  // threshold in Nina Canina.dc.html, but all 4 are functional/brand glyphs
  // tied to their own business area or flow (Aseo, Tienda, checkout) rather
  // than decoration on one screen, so they clear the bar on the same
  // "genuinely reusable" judgment already used for `account`/`mail`/
  // `location`/the socials. What's decorative and stays OUT of the catalog
  // (verified, not just asserted): the Hero star/swoosh/sparkle, the
  // Hero trust-badge medal/crown/heart, the "2 owners" glyph in the
  // booking-card header, the Testimonials drag handle and quote mark — none
  // of those are reused across more than one screen's worth of context,
  // they're single-section ornaments, and none of them entered.

  // Scissors, single path. Measured 2x, not 1 (Hero CTA "Agendar estética"
  // line 81; Servicios "Aseo canino" card icon line 151) — both identical.
  scissors: <path d="M6 4l4 4m8-4l-4 4m0 0a4 4 0 11-4 4 4 4 0 014-4zm-2.8 6.8L4 20m15-9l-4.2 1.8" />,

  // Bag: body + handle. Measured 2x, not 1 (Servicios "Tienda" card icon
  // line 183; HotelStore "Tienda pet friendly" badge line 279) — both
  // identical. Distinct from `cart`: no wheels, it's a closed shopping bag.
  bag: (
    <>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </>
  ),

  // Lock: body + shackle. Measured once (Hero booking card, "¡Rápido,
  // fácil y 100% seguro!" trust line, line 134) — under threshold, kept as
  // a genuinely reusable glyph: a payment-security signal belongs to the
  // checkout flow generally, not just this one line of the Hero.
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),

  // Long arrow: shaft + head, one path. Measured once (HotelStore "Ver más
  // productos" link, line 296) — under threshold, kept as a reusable
  // "see more" affordance likely to recur on any list-with-more pattern.
  // Wide, short glyph by design (meant to sit inline next to text), not the
  // 24×24 grid every other icon here assumes — verbatim geometry, unscaled;
  // see `ICON_VIEWBOX` below for how `Icon.tsx` renders it undistorted.
  'arrow-right-long': <path d="M2 7h18m0 0l-5-5m5 5l-5 5" />,

  // Sidebar gap-fill (DS consolidation round): the admin's own sidebar nav
  // (Nina Canina Admin.dc.html:57-121) draws 7 glyphs this catalog didn't
  // have yet — Resumen/Pedidos/Tarifas/Productos/Empleados/Clientes/
  // Bitácora. All measured directly from those nav buttons (stroke-width
  // 1.7 there, same runtime `strokeWidth` prop `Icon.tsx` already exposes,
  // not baked into the geometry below).
  //
  // Two nav icons are deliberately NOT part of this round: `calendar`
  // (Citas) and `paw` (Mascotas) already exist and were reused as-is by the
  // admin skeleton — re-measured here against this same nav while auditing
  // the other 7, and both have a small discrepancy worth flagging (not
  // fixed here — out of this round's scope, see the consolidation report):
  // `calendar`'s divider is `M3 9h18` (measured from the *web* prototype);
  // the admin nav draws it one unit lower, `M3 10h18`. `paw` is a filled
  // single path (web prototype); the admin nav's Mascotas icon is a
  // stroke-only glyph with different pad radii — same concept, different
  // rendering style, not a pixel match.
  //
  // Hotel is also NOT a new icon here: its nav glyph (:71, "M3 19v-6a3 3 0
  // 013-3h12a3 3 0 013 3v6M3 15h18M3 19v2m18-2v2M7 10V8a2 2 0 012-2h2") is
  // the same bed-frame concept as `bed` above — 1 unit taller (frame height
  // 6 vs 5, baseline y19 vs y18) but with the identical headboard segment
  // ("M7 10V8a2 2 0 012-2h2", verbatim in both) — reads as drift between
  // the two .dc.html files, not a deliberate second icon. `bed` is reused
  // for Hotel instead of duplicating it, per the encargo's own "si ya
  // existe con otro nombre, no lo dupliques" rule.

  // Resumen nav — 4 rounded squares. Measured once (:60), under the 3-use
  // threshold, kept as a reusable dashboard/grid affordance (same
  // "genuinely reusable interface glyph" call as `account`/`mail`).
  grid: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </>
  ),

  // Pedidos nav — closed box, isometric outline. Measured 2x, not 1 (:79
  // sidebar nav; :171 the Resumen dashboard's own "Pedidos abiertos" KPI
  // icon draws the identical two paths).
  box: (
    <>
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4v-9z" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" />
    </>
  ),

  // Tarifas nav — a literal dollar sign (vertical stroke + S-curve), not a
  // price-tag shape despite the task/nav framing being about pricing.
  // Measured once (:85), kept as a reusable currency/pricing glyph.
  price: (
    <>
      <path d="M12 3v18" />
      <path d="M16 7.5c0-1.7-1.8-2.5-4-2.5s-4 .8-4 2.5S9.8 10 12 10s4 .9 4 2.8-1.8 2.7-4 2.7-4-.9-4-2.7" />
    </>
  ),

  // Productos nav — a price/gift tag (hexagonal outline + punch-hole).
  // Measured once (:91). The punch-hole is filled — same reason every
  // other filled shape in this file sets stroke="none" explicitly instead
  // of inheriting the wrapper's stroke="currentColor" (see `check-circle`'s
  // comment above).
  tag: (
    <>
      <path d="M4 9.5l5.5-5.5H19a1 1 0 011 1v9.5L14.5 20a1.4 1.4 0 01-2 0L4 11.5a1.4 1.4 0 010-2z" />
      <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),

  // Empleados nav — 2 feet/circles crossed by 2 diagonals, an abstract
  // "team" mark distinct from `people` below. Measured once (:99).
  team: (
    <>
      <circle cx="6" cy="18" r="2.6" />
      <circle cx="18" cy="18" r="2.6" />
      <path d="M7.6 16L18 4M16.4 16L6 4" />
    </>
  ),

  // Clientes nav — one full person + a second, partial one. Measured once
  // (:111). Distinct from the single-person `account` above (different
  // radii/position, plus the second figure) — not a duplicate.
  people: (
    <>
      <circle cx="9.5" cy="8.5" r="3.4" />
      <path d="M3 20c0-3.3 2.9-5.6 6.5-5.6S16 16.7 16 20" />
      <path d="M16.5 5.4a3.2 3.2 0 010 6.2M18 14.8c2 .7 3 2.4 3 5.2" />
    </>
  ),

  // Bitácora nav — clock face. Measured once (:117).
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
} as const

export type IconName = keyof typeof ICONS

/**
 * Icons whose artwork is not square in the prototype. Everything else uses the
 * 24×24 default; forcing a non-square glyph into that box leaves dead space
 * around it, and redrawing it to fit would mean inventing geometry.
 *
 * The prototype itself draws `arrow-right-long` at `width="20" height="14"`
 * for this `viewBox="0 0 24 14"` (line 296) — that specific 20×14 pixel pair
 * isn't the viewBox's exact ratio either (20/14 ≈ 1.43 vs 24/14 ≈ 1.71), just
 * one hand-picked instance size. `Icon.tsx` doesn't hardcode that pair: it
 * derives `height` from `size` and this viewBox's own aspect ratio, so the
 * artwork stays undistorted at *any* requested `size`, not just 20.
 *
 * 24 of 25 icons are square today, so square stays the default and this is
 * the explicit, narrow exception — not the other way around. Revisit that
 * default if the catalog ever grows mostly non-square; with 1 of 25, it
 * shouldn't.
 */
export const ICON_VIEWBOX: Partial<Record<IconName, string>> = {
  'arrow-right-long': '0 0 24 14',
}
