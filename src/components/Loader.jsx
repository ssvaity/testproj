import { motion, useReducedMotion } from 'motion/react'

// Three bouncing dots (an Aceternity-style "LoaderOne"), built on motion/react
// which is already a project dependency. Uses the brand accent so it reads in
// both light and dark themes. Respects reduced-motion.
export function LoaderOne({ className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`flex items-center gap-1.5 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-oxblood"
          animate={reduce ? { opacity: 0.6 } : { y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
          transition={
            reduce
              ? undefined
              : { duration: 0.9, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: i * 0.18 }
          }
        />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default LoaderOne
