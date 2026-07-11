import { useEffect, useRef, useState } from 'react'

function Sources() {
  return (
    <>
      <source src="/intro.webm" type="video/webm" />
      <source src="/intro.mov" type="video/quicktime" />
    </>
  )
}

const cardClass =
  'bg-surface-container-lowest border border-warm rounded-xl shadow-sm p-stack-sm flex flex-col'
const videoClass = 'w-full h-[380px] object-contain bg-cream-surface rounded-lg'

/* Option 1 — play once, hold on final frame */
function PlayOnceHold() {
  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-base">
        <h3 className="font-headline-md text-headline-md text-primary">1 · Play once, hold end</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">
          Recommended
        </span>
      </div>
      <video className={videoClass} autoPlay muted playsInline>
        <Sources />
      </video>
      <p className="text-sm text-text-muted mt-stack-sm">
        Plays the settling motion once on load, then freezes on the final frame. Reload the
        page to replay.
      </p>
    </div>
  )
}

/* Option 2 — autoplay + loop */
function AutoLoop() {
  return (
    <div className={cardClass}>
      <h3 className="font-headline-md text-headline-md text-primary mb-base">2 · Autoplay + loop</h3>
      <video className={videoClass} autoPlay muted loop playsInline>
        <Sources />
      </video>
      <p className="text-sm text-text-muted mt-stack-sm">
        Repeats forever. Notice the &ldquo;jump&rdquo; back to the top each cycle, since the
        motion only goes one direction.
      </p>
    </div>
  )
}

/* Option 3 — loop with pause */
function LoopWithPause() {
  const ref = useRef(null)
  const onEnded = () => {
    const v = ref.current
    if (!v) return
    setTimeout(() => {
      v.currentTime = 0
      v.play()
    }, 3000)
  }
  return (
    <div className={cardClass}>
      <h3 className="font-headline-md text-headline-md text-primary mb-base">3 · Loop with pause</h3>
      <video className={videoClass} ref={ref} autoPlay muted playsInline onEnded={onEnded}>
        <Sources />
      </video>
      <p className="text-sm text-text-muted mt-stack-sm">
        Plays, holds on the final frame for ~3 seconds, then restarts. A gentler, less busy
        loop.
      </p>
    </div>
  )
}

/* Option 4 — scroll-scrubbed */
function ScrollScrub() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const section = sectionRef.current
        const video = videoRef.current
        if (!section || !video || !video.duration) return
        const rect = section.getBoundingClientRect()
        const scrollable = rect.height - window.innerHeight
        // how far we've scrolled through this section, 0..1
        const p = Math.min(1, Math.max(0, -rect.top / scrollable))
        setProgress(p)
        video.currentTime = p * (video.duration - 0.05)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          <h3 className="font-headline-md text-headline-md text-primary mb-base">
            4 · Scroll-scrubbed
          </h3>
          <video
            ref={videoRef}
            className="w-full h-[420px] object-contain bg-cream-surface rounded-lg"
            muted
            playsInline
            preload="auto"
          >
            <Sources />
          </video>
          <div className="mt-stack-sm h-2 w-full rounded-full bg-cream-surface border border-warm overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="text-sm text-text-muted mt-stack-sm">
            Scroll up and down — the pages settle into the hands as you scroll. Currently{' '}
            {Math.round(progress * 100)}% through the motion.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function IntroDemo() {
  return (
    <>
      <div className="mb-stack-md text-center">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-base">
          Intro Animation — Options
        </h1>
        <p className="font-body-lg text-body-lg text-text-muted">
          Compare the four behaviors, then tell me which to use on the Home hero.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
        <PlayOnceHold />
        <AutoLoop />
        <LoopWithPause />
      </div>

      <div className="bg-surface-container-lowest border border-warm rounded-xl shadow-sm p-stack-sm">
        <ScrollScrub />
      </div>
    </>
  )
}
