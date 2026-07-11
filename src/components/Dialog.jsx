import { useRef } from 'react'
import { useDialogState } from '../hooks/useDialogState.js'

// Reusable animated dialog: fades the backdrop and scales the panel using the
// transitions.dev modal motion. Retains the last children while closing so the
// content doesn't vanish before the exit animation finishes.
export default function Dialog({
  open,
  onClose,
  children,
  panelClassName = '',
  overlayClassName = '',
  ariaLabel,
}) {
  const { mounted, visible } = useDialogState(open, 150)
  const lastChildren = useRef(children)
  if (open) lastChildren.current = children

  if (!mounted) return null

  return (
    <div
      className={`t-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-margin-mobile ${
        visible ? 'is-open' : ''
      } ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        className={`t-modal ${visible ? 'is-open' : 'is-closing'} ${panelClassName}`}
      >
        {open ? children : lastChildren.current}
      </div>
    </div>
  )
}
