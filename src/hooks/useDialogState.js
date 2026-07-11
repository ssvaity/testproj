import { useEffect, useRef, useState } from 'react'

// Adapts the transitions.dev modal "close-then-cleanup" pattern to React.
// Keeps a dialog in the DOM through its exit animation so the scale-down /
// fade-out can play before it unmounts.
//
//   const { mounted, visible } = useDialogState(open)
//   if (!mounted) return null
//   <div className={`t-modal ${visible ? 'is-open' : 'is-closing'}`}>…</div>
export function useDialogState(open, closeMs = 150) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)
  const timer = useRef()

  useEffect(() => {
    clearTimeout(timer.current)
    if (open) {
      setMounted(true)
      // Two frames: mount in the pre-open state, then flip to `is-open` so the
      // enter transition actually runs instead of snapping to the end state.
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      )
      return () => cancelAnimationFrame(raf)
    }
    setVisible(false)
    timer.current = setTimeout(() => setMounted(false), closeMs)
    return () => clearTimeout(timer.current)
  }, [open, closeMs])

  return { mounted, visible }
}
