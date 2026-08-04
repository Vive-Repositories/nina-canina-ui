// src/molecules/Modal/Modal.tsx
'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from './useFocusTrap'
import s from './Modal.module.scss'

/**
 * The 3 widths measured from the admin's own centered modals (Nina Canina
 * Admin.dc.html): Invitar empleado 450px (:824), Nueva cita 470px (:739),
 * Detalle de cobro 480px (:770). All 3 share the exact same shell
 * (border-radius/padding/shadow/z-index) but each has its own width, 1 use
 * apiece — none crosses the 3+ "is a token" threshold on its own, so none
 * is picked as *the* default and the others discarded. Exposed as a literal
 * union instead, same pattern already established by Card's `CardPadding`
 * (22|24|26|28, also all below-threshold individually). See
 * docs/token-audit.md, "DS consolidation round — admin gap-fill".
 */
export type ModalWidth = 450 | 470 | 480

// CSS class selectors cannot start with a digit (stylelint's
// selector-class-pattern) — same reason Card maps its padding scale through
// a lookup instead of indexing `s[width]` directly.
const WIDTH_CLASS: Record<ModalWidth, string> = {
  450: 'width450',
  470: 'width470',
  480: 'width480',
}

export interface ModalProps {
  open: boolean
  onClose: () => void
  /**
   * Accessible name for the dialog (`aria-label`) — required, not optional,
   * so a modal can never ship without one. Same pattern the admin's own
   * hand-built modals already used (`aria-label="Detalle de cobro y
   * extras"` / `aria-label={\`Foto de ${product.name}\`}`), just enforced
   * at the type level here.
   */
  label: string
  /**
   * One of the 3 measured widths (see `ModalWidth`). Defaults to 480, the
   * only one of the 3 with a real consumer today (the appointment detail
   * modal) — not chosen for looking "average."
   */
  width?: ModalWidth
  children: React.ReactNode
  className?: string
}

/**
 * Accessible overlay + centered panel — the piece both
 * `AppointmentDetailModal.tsx` and `ProductImageUploadModal.tsx` in
 * `nina-canina-admin` had to hand-roll (no `Modal`/`Dialog` existed in
 * `@nina/ui` — `ls node_modules/@nina/ui/dist` had no `organisms/` at all).
 * This absorbs exactly the part that's error-prone to hand-roll and was
 * NOT measured content (focus trap, Escape, returning focus, portal, aria
 * wiring) — the header/title/close-button/body markup stays the caller's,
 * since that varies per screen and both admin implementations already
 * measured their own content against the prototype.
 *
 * No built-in header or close button: the admin's 3 real modals all use an
 * identical 34×34 close-button pattern too (`background:#F2F4F8;
 * width:34px;height:34px;border-radius:10px;color:#667085`), a genuine
 * repeated pattern — but it wasn't in this round's scope, so it isn't
 * added speculatively. Flagged in the consolidation report as a follow-up
 * candidate instead.
 *
 * Deliberately does NOT lock body scroll: neither admin implementation
 * this was ported from does either, and the encargo's explicit list
 * (focus trap, Escape, focus return, aria-modal+label, width) doesn't ask
 * for it — noted in the report as an omission, not an oversight.
 */
export function Modal({ open, onClose, label, width = 480, children, className }: ModalProps) {
  // Portals need `document`, which doesn't exist during SSR. Every real
  // consumer today opens closed by default (`appointmentId: string | null`,
  // `product: Product | null`), so this guard is defensive rather than
  // load-bearing for current usage — but a future caller defaulting to
  // `open` would otherwise crash Next's server render, not just misbehave.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // `mounted && open`, not just `open` — see useFocusTrap's own comment.
  const panelRef = useFocusTrap(mounted && open, onClose)

  if (!mounted || !open) return null

  const classes = [s.panel, s[WIDTH_CLASS[width]], className].filter(Boolean).join(' ')

  return createPortal(
    <>
      <div className={s.backdrop} onClick={onClose} />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={classes}>
        {children}
      </div>
    </>,
    document.body,
  )
}
