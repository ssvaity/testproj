const visionMission = [
  {
    title: 'Vision',
    flip: false,
    paras: [
      'To celebrate the antiquity and wisdom of India’s invaluable knowledge heritage, and — by presenting it in a modern, thoughtful form — to make it accessible and preserved for the whole world.',
      'Every rare manuscript we digitize and every scripture we publish is a step toward a future where India’s spiritual and scholarly inheritance is never lost — but studied, cherished and carried forward by generations to come.',
      'By opening the treasures once locked in bhandars to anyone, anywhere, we hope to rekindle a living relationship between the seeker of today and the wisdom of the ages.',
    ],
  },
  {
    title: 'Mission',
    flip: true,
    paras: [
      'The ancient tradition of knowledge is a divine heritage of India — capable of guiding us spiritually, socially, culturally, scientifically, educationally and historically. To present this treasure in a modern, refined form and thereby offer guidance to society.',
      'Through transcription, research, editing, preservation and archival collection, Shrutsanjeevan brings ancient granths to life in print and online — classified as Granthank and Granthratna collections and freely accessible to scholars, seekers and devotees.',
      'Guided by the blessings of our Gurudevs, we pair meticulous scholarship with modern technology so that this sacred wisdom continues to inform and uplift generations to come.',
    ],
  },
]

const stats = [
  { value: '80,000+', label: 'Books & e-books' },
  { value: '25', label: 'Published granths' },
  { value: '8', label: 'Languages' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="mb-stack-lg">
        <p className="eyebrow mb-4">
          <span className="indic">परिचय</span> · About us
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-2xl font-headline-xl text-[38px] leading-[1.05] text-sepia md:text-[56px]">
            Our story, vision &amp; values
          </h1>
          <p className="max-w-sm font-body-lg text-body-lg text-text-muted">
            Learn about our commitment to preserving India&rsquo;s ancient knowledge heritage — and
            opening it to the world.
          </p>
        </div>
        <div className="mt-stack-md overflow-hidden rounded-[24px] border border-warm">
          <img
            src="/images/hero-garden.jpg"
            alt="Illustrated Jain palace garden with peacocks"
            className="h-[260px] w-full object-cover md:h-[380px]"
          />
        </div>
      </section>

      {/* About us — statement + card */}
      <section className="mb-stack-lg grid grid-cols-1 gap-stack-md lg:grid-cols-2 lg:items-start">
        <div>
          <span className="material-symbols-outlined text-4xl text-warm">format_quote</span>
          <p className="mt-2 max-w-lg font-headline-md text-[24px] leading-snug text-ink md:text-[28px]">
            Shrutsanjeevan works tirelessly to research, preserve and upgrade the Jain scriptural
            heritage — transcribing, editing and digitizing rare manuscripts so that timeless wisdom
            reaches every seeker, anywhere.
          </p>
        </div>
        <div className="rounded-[24px] bg-oxblood p-stack-md text-[#f3e9d6]">
          <p className="eyebrow mb-4 text-brass">About us</p>
          <p className="mb-4 text-base leading-relaxed text-[#f3e9d6]/85">
            An initiative of the Ratnatrayee Trust, Shrutsanjeevan gathers, researches, edits,
            preserves and publishes ancient Jain granths — classified into the Granthank and
            Granthratna collections. By pairing meticulous scholarship with modern technology, it
            opens knowledge once locked in bhandars to anyone, anywhere.
          </p>
          <p className="text-base leading-relaxed text-[#f3e9d6]/85">
            The work flourishes under the blessings of Prashantmurti Gachchhadhipati Pujyapad
            Acharyadev Shrimad Vijay Rajendrasurishwarji Maharaja and Padma Bhushan awardee Pujyapad
            Acharyadev Shrimad Vijay Ratnasundarsurishwarji Maharaja.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-stack-lg">
        <div className="grid grid-cols-1 divide-y divide-warm rounded-[24px] border border-warm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3 p-stack-md">
              <span className="font-headline-xl text-[38px] leading-none text-oxblood">{s.value}</span>
              <span className="font-label-md text-label-md text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission — statement + red block, alternating sides */}
      <section className="flex flex-col gap-stack-lg">
        {visionMission.map((v) => (
          <div key={v.title} className="flex flex-col gap-stack-md">
            <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2 md:items-center">
              <div className={v.flip ? 'md:order-2' : ''}>
                <span className="material-symbols-outlined text-4xl text-warm">format_quote</span>
                <h2 className="mt-1 font-headline-xl text-[40px] leading-none text-sepia md:text-[52px]">
                  {v.title}
                </h2>
              </div>
              <div
                className={`rounded-[24px] bg-oxblood p-stack-md text-[#f3e9d6] ${
                  v.flip ? 'md:order-1' : ''
                }`}
              >
                <p className="text-lg leading-relaxed text-[#f3e9d6]/90">{v.paras[0]}</p>
              </div>
            </div>
            {v.paras.length > 1 && (
              <div className="flex flex-col gap-4">
                {v.paras.slice(1).map((p, i) => (
                  <p key={i} className="max-w-3xl text-base leading-relaxed text-text-muted">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  )
}
