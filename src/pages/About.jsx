import StringDivider from '../components/StringDivider.jsx'

const activities = [
  {
    icon: 'draw',
    term: 'Shrutlekhanam',
    title: 'Sacred transcription',
    text: 'Ancient manuscripts are studied and faithfully re-copied by hand — a living foundation for preservation and publication.',
    image: '/images/mural-peacock.jpg',
  },
  {
    icon: 'manage_search',
    term: 'Shrutsanshodhanam',
    title: 'Scriptural research',
    text: 'Original texts are collected, researched and critically edited to restore each scripture to its authentic form.',
    image: '/images/mural-birds.jpg',
  },
  {
    icon: 'edit_note',
    term: 'Shrutsampadanam',
    title: 'Scholarly editing',
    text: 'Edited manuscripts are refined and prepared for print, balancing accuracy with readability.',
    image: '/images/mural-leopard.jpg',
  },
  {
    icon: 'shield',
    term: 'Shrutsanrakshanam',
    title: 'Sacred preservation',
    text: 'Rare and fragile handwritten works are digitally archived so they endure for generations.',
    image: '/images/mural-peacock.jpg',
  },
  {
    icon: 'library_books',
    term: 'Shrutsamvardhanam',
    title: 'Archival collection',
    text: 'Scriptures are systematically acquired and classified as Granthank and Granthratna collections.',
    image: '/images/mural-birds.jpg',
  },
]

const gurudevs = [
  {
    image: '/images/gurudev-rajendrasuri.jpg',
    name: 'Shrimad Vijay Rajendrasurishwarji Maharaja',
    title: 'Prashantmurti Gachchhadhipati Pujyapad Acharyadev',
    bio: 'The serene Gachchhadhipati whose blessings guide the Ratnatrayee parivar. Carrying forward a lineage of scholarship and shraman discipline, Pujya Acharyadev inspires the preservation and study of Jain shrut for generations to come.',
    facts: [],
  },
  {
    image: '/images/gurudev-ratnasundarsuri.jpg',
    name: 'Shrimad Vijay Ratnasundarsurishwarji Maharaja',
    title: 'Saraswatilabdhaprasad Pujyapad Gurudev',
    bio: 'One of the most prolific authors in the Jain tradition, Pujya Gurudev has devoted seven decades to morality, spirituality and personality development — “watering the roots” of a generation through discourses and inspiring literature that reaches seekers in Gujarati, Hindi, English and Marathi.',
    facts: [
      { value: '500+', label: 'Books authored' },
      { value: 'Padma Bhushan', label: 'Conferred 2017' },
      { value: 'Guinness', label: 'World record holder' },
    ],
  },
]

export default function About() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-stack-lg text-center">
        <p className="eyebrow mb-3">
          <span className="indic">परिचय</span> · Our purpose
        </p>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-sepia mb-base">
          About Shrutsanjeevan
        </h1>
        <p className="font-body-lg text-body-lg text-text-muted">
          Preserving India&rsquo;s ancient knowledge heritage — and making it accessible to the world.
        </p>
        <StringDivider className="mt-stack-md max-w-xl mx-auto" />
      </div>

      {/* Parichay / Introduction */}
      <section className="bg-surface-container-lowest border border-warm rounded-xl shadow-sm p-stack-md mb-stack-lg">
        <h2 className="font-headline-md text-headline-md text-sepia mb-stack-sm">
          परिचय &middot; Introduction
        </h2>
        <p className="font-body-md text-body-md text-text-muted mb-stack-sm">
          Shrutsanjeevan is a digital initiative dedicated to preserving, digitizing, and
          sharing the vast heritage of ancient Jain scriptures and manuscripts
          (prāchīn granth). Our aim is to make this invaluable treasure of knowledge
          searchable, readable, and freely available to scholars, seekers, and devotees
          across the world.
        </p>
        <p className="font-body-md text-body-md text-text-muted">
          Through a growing collection of thousands of books, manuscripts, and articles in
          Gujarati, Hindi, and English, Shrutsanjeevan bridges timeless wisdom with modern
          technology.
        </p>
        <p className="mt-stack-sm text-sm text-outline italic">
          (Placeholder introduction — replace with the official Parichay Patra text.)
        </p>
      </section>

      {/* Vision & Mission */}
      <div className="flex flex-col gap-stack-md">
        {/* Vision */}
        <section className="bg-surface-container-lowest border border-warm rounded-xl shadow-sm p-stack-md flex flex-col">
          <div className="flex items-center gap-3 mb-stack-sm">
            <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontSize: '32px' }}>
              visibility
            </span>
            <h2 className="font-headline-md text-headline-md text-sepia">Vision</h2>
          </div>
          <p className="font-body-md text-body-md text-text-muted">
            To celebrate the antiquity and wisdom of India&rsquo;s invaluable knowledge
            heritage, and — by presenting it in a modern, thoughtful form — to make it
            accessible and preserved for the whole world.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-surface-container-lowest border border-warm rounded-xl shadow-sm p-stack-md flex flex-col">
          <div className="flex items-center gap-3 mb-stack-sm">
            <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontSize: '32px' }}>
              flag
            </span>
            <h2 className="font-headline-md text-headline-md text-sepia">Mission</h2>
          </div>
          <p className="font-body-md text-body-md text-text-muted">
            The ancient tradition of knowledge is a divine heritage of India — capable of
            guiding us spiritually, socially, culturally, scientifically, educationally,
            and historically. To present this treasure in a modern, refined form and
            thereby offer guidance to society.
          </p>
        </section>
      </div>

      {/* The work of Shrutsanjeevan — five disciplines */}
      <section className="mt-stack-lg">
        <p className="eyebrow mb-3">The work of Shrutsanjeevan</p>
        <h2 className="mb-stack-lg font-headline-lg text-headline-lg text-sepia">Five sacred disciplines</h2>
        <div className="flex flex-col gap-stack-md">
          {activities.map((a, i) => (
            <div key={a.title} className="flex flex-col gap-6 sm:min-h-[340px] sm:flex-row sm:items-stretch">
              {/* Image — alternates left / right */}
              <div
                className={`overflow-hidden rounded-2xl border border-warm shadow-sm sm:w-[320px] sm:shrink-0 ${
                  i % 2 === 1 ? 'sm:order-2' : ''
                }`}
              >
                <img src={a.image} alt="" aria-hidden="true" className="h-56 w-full object-cover sm:h-full" />
              </div>
              {/* Text — no container, fills the remaining width */}
              <div
                className={`flex flex-1 flex-col justify-center gap-3 ${
                  i % 2 === 1 ? 'sm:order-1 sm:pr-10' : 'sm:pl-10'
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">{a.term}</p>
                <h3 className="font-headline-md text-[22px] text-ink">{a.title}</h3>
                <p className="max-w-lg text-sm leading-relaxed text-text-muted">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blessings of the Gurudevs */}
      <section className="mt-stack-lg">
        <div className="mb-stack-md text-center">
          <p className="eyebrow mb-3">With reverence</p>
          <h2 className="font-headline-lg text-headline-lg text-sepia">Blessings of the Gurudevs</h2>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-stack-lg">
          {gurudevs.map((g) => (
            <div key={g.name} className="flex flex-col gap-6 sm:min-h-[420px] sm:flex-row sm:items-stretch">
              {/* Portrait — its own card */}
              <div className="overflow-hidden rounded-lg border border-warm shadow-sm sm:w-[300px] sm:shrink-0">
                <img
                  src={g.image}
                  alt={g.name}
                  className="aspect-[3/4] h-full w-full object-cover object-top sm:aspect-auto"
                />
              </div>
              {/* Text — no container */}
              <div className="flex flex-1 flex-col justify-center gap-4 sm:pl-4">
                <div>
                  <p className="eyebrow mb-2 text-brass">{g.title}</p>
                  <h3 className="font-headline-md text-[24px] leading-snug text-sepia">{g.name}</h3>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-text-muted">{g.bio}</p>
                {g.facts.length > 0 && (
                  <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-warm pt-4">
                    {g.facts.map((f) => (
                      <div key={f.label}>
                        <p className="font-headline-md text-[19px] leading-none text-oxblood">{f.value}</p>
                        <p className="mt-1 font-label-md text-label-md text-text-muted">{f.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
