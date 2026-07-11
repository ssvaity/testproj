// Signature element: a palm-leaf binding divider — a hairline "leaf edge" run
// through a set of punched binding holes. Recurs across the site as a section
// break so the whole archive reads as one bound manuscript.
export default function StringDivider({ holes = 3, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-warm" />
      <span className="flex items-center gap-2">
        {Array.from({ length: holes }).map((_, i) => (
          <span key={i} className="hole" />
        ))}
      </span>
      <span className="h-px flex-1 bg-warm" />
    </div>
  )
}
