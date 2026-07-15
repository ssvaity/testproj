import { useEffect, useRef, useState } from 'react'
import { subscribeDownloadCount, downloadCounterEnabled } from '../lib/downloadCounter.js'

// Eases a displayed number toward a target so the total counts up smoothly
// instead of snapping.
function useCountUp(target) {
  const [display, setDisplay] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    if (from === target) return
    const duration = 900
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const value = Math.round(from + (target - from) * eased)
      setDisplay(value)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target])

  return display
}

// Shows the live, all-visitors total of manuscripts downloaded. Renders nothing
// until the counter is configured (config.js) and the first value has loaded.
export default function DownloadCounter({ className = '', label = 'manuscripts downloaded' }) {
  const [total, setTotal] = useState(null)
  const display = useCountUp(total ?? 0)

  useEffect(() => {
    if (!downloadCounterEnabled) return
    return subscribeDownloadCount((value) => setTotal(value))
  }, [])

  if (!downloadCounterEnabled || total === null) return null

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-headline-lg text-headline-lg-mobile text-oxblood tabular-nums">
        {display.toLocaleString('en-IN')}
      </span>
      <span className="font-label-md text-label-md text-text-muted">{label}</span>
    </div>
  )
}
