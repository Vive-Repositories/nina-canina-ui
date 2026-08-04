// src/molecules/Modal/useFocusTrap.ts
import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * The 3 things an accessible modal must do with focus, extracted so
 * `Modal.tsx` stays about markup: (1) trap Tab/Shift+Tab inside the panel,
 * (2) close on Escape, (3) return focus to whatever had it before opening.
 * Not measured from a prototype — this is behavior, not a visual value.
 *
 * `active` (not just `open`) on purpose: `Modal.tsx` gates its first real
 * paint behind a `mounted` flag (SSR safety, see its own comment), so the
 * render where `open` first becomes true is the one where `mounted` is
 * still false and the panel hasn't attached to `panelRef` yet — focusing it
 * there would be a no-op. `active` is `mounted && open`, so this effect
 * re-fires exactly when the panel actually exists in the DOM.
 */
export function useFocusTrap(active: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    openerRef.current = document.activeElement as HTMLElement | null
    // Focus the panel itself first: it's always present, unlike "the first
    // focusable child," which some panel content (e.g. a loading state)
    // doesn't have yet.
    panelRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusables = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [])
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) {
        event.preventDefault()
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      openerRef.current?.focus()
    }
  }, [active, onClose])

  return panelRef
}
