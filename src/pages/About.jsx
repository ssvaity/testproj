import { useLanguage } from '../context/LanguageContext.jsx'

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  const visionMission = [
    { ...a.vision, flip: false }, // title left, statement right
    { ...a.mission, flip: true }, // title right, statement left
  ]

  return (
    <>
      {/* Hero */}
      <section className="mb-stack-lg">
        <p className="eyebrow mb-4">{a.eyebrow}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-2xl font-headline-xl text-[38px] leading-[1.05] text-sepia md:text-[56px]">
            {a.title}
          </h1>
          <p className="max-w-sm font-body-lg text-body-lg text-text-muted">{a.lede}</p>
        </div>
      </section>

      {/* Image card */}
      <section className="mb-stack-lg">
        <div className="overflow-hidden rounded-[24px]">
          <img
            src="/images/about-garden-mural.jpg"
            alt="Illustrated Indian palace garden with peacocks and cranes"
            className="h-[240px] w-full object-cover object-center md:h-[420px]"
          />
        </div>
      </section>

      {/* About us — statement + card */}
      <section className="mb-stack-lg grid grid-cols-1 gap-stack-md lg:grid-cols-2 lg:items-start">
        <div>
          <span className="material-symbols-outlined text-4xl text-warm">format_quote</span>
          <p className="mt-2 max-w-lg font-headline-md text-[24px] leading-snug text-ink md:text-[28px]">
            {a.quote}
          </p>
        </div>
        <div className="rounded-[24px] bg-oxblood p-stack-md text-[#f3e9d6]">
          <p className="eyebrow mb-4 text-brass">{a.aboutLabel}</p>
          <p className="mb-4 text-base leading-relaxed text-[#f3e9d6]/85">{a.aboutPara1}</p>
          <p className="text-base leading-relaxed text-[#f3e9d6]/85">{a.aboutPara2}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-stack-lg">
        <div className="grid grid-cols-1 divide-y divide-warm rounded-[24px] border border-warm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {a.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3 p-stack-md">
              <span className="font-headline-xl text-[38px] leading-none text-oxblood">{s.value}</span>
              <span className="font-label-md text-label-md text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Scrolling words band — full-bleed to both page edges */}
      <section className="mb-stack-lg ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-hidden border-y border-warm py-6 md:py-10">
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div
              key={g}
              aria-hidden={g === 1}
              className="flex shrink-0 items-center gap-8 pr-8 font-headline-xl text-[40px] leading-none text-ink/10 md:text-[64px]"
            >
              {['Our Vision', 'Our Mission', 'Our Story'].map((w) => (
                <span key={w} className="flex items-center gap-8 whitespace-nowrap">
                  {w}
                  <span aria-hidden="true">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission — title on one side, statement on the other */}
      <section className="flex flex-col gap-stack-lg pb-stack-lg md:gap-[9rem]">
        {visionMission.map((v) => (
          <div
            key={v.title}
            className="grid grid-cols-1 gap-stack-md md:grid-cols-2 md:items-center md:gap-x-20"
          >
            {/* Title */}
            <div className={v.flip ? 'md:order-2 md:text-right' : ''}>
              <span className="material-symbols-outlined text-4xl text-warm">format_quote</span>
              <h2 className="mt-1 font-headline-xl text-[40px] leading-none text-sepia md:text-[52px]">
                {v.title}
              </h2>
            </div>
            {/* Statement */}
            <div className={v.flip ? 'md:order-1' : ''}>
              <p className="font-headline-md text-[22px] leading-snug text-ink md:text-[24px]">
                {v.statement}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
