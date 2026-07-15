import CountUp from '../components/CountUp.jsx'
import { blobB, blobC } from '../data/blobs.js'

const gurudevBlobs = [blobB, blobC]

const heroStats = [
  { to: 80000, from: 79000, label: 'Books & E-Books' },
  { to: 25, label: 'Published granths' },
  { to: 4, label: 'Published books' },
  { to: 8, label: 'Languages' },
]

const searchSteps = [
  { title: 'Search the catalogue', text: 'Look across languages, authors, bhandars and topics to find the exact text you need.' },
  { title: 'Add to your request list', text: 'Collect the manuscripts you want and keep them together as you browse.' },
  { title: 'Send your request', text: 'Share the list with the kendra in one tap over WhatsApp or email.' },
]

const readSteps = [
  { title: 'Read a preview online', text: 'Open a portion of each digitized scripture right in your browser.' },
  { title: 'Download the full text', text: 'Take the complete PDF with you for study, offline and at your own pace.' },
  { title: 'Freely accessible', text: 'The library is open to every scholar, seeker and devotee — no barrier.' },
]

const gurudevs = [
  {
    image: '/images/gurudev-rajendrasuri.jpg',
    name: 'Shrimad Vijay Rajendrasurishwarji Maharaja',
    title: 'Prashantmurti Gachchhadhipati Pujyapad Acharyadev',
    bio: 'The serene Gachchhadhipati whose blessings guide the Ratnatrayee parivar. Carrying forward a lineage of scholarship and shraman discipline, Pujya Acharyadev inspires the preservation and study of shrut for generations to come.',
    facts: [],
  },
  {
    image: '/images/gurudev-ratnasundarsuri.jpg',
    name: 'Shrimad Vijay Ratnasundarsurishwarji Maharaja',
    title: 'Saraswatilabdhaprasad Pujyapad Gurudev',
    bio: 'One of the most prolific authors in the tradition, Pujya Gurudev has devoted seven decades to morality, spirituality and personality development — “watering the roots” of a generation through discourses and inspiring literature that reaches seekers in Gujarati, Hindi, English and Marathi.',
    facts: [
      { value: '500+', label: 'Books authored' },
      { value: 'Padma Bhushan', label: 'Conferred 2017' },
      { value: 'Guinness', label: 'World record holder' },
    ],
  },
]

// Partner list + logos mirrored from vk.jyot.in.
const partners = [
  { name: 'Jyot', role: 'Host', logo: '/images/partners/jyot.jpg' },
  { name: 'Vivekananda International Foundation', role: 'Knowledge Partner', logo: '/images/partners/vif.jpg' },
  { name: 'India Foundation', role: 'Knowledge Partner', logo: '/images/partners/india-foundation.jpg' },
  { name: 'Gitarth Ganga', role: 'Research Partner', logo: '/images/partners/gitarth-ganga.jpg' },
  { name: 'MNLU', role: 'Education Partner', logo: '/images/partners/mnlu.jpg' },
  { name: 'Jain University', role: 'Education Partner', logo: '/images/partners/jain-university.png' },
  { name: 'Nirma University', role: 'Education Partner', logo: '/images/partners/nirma-university.png' },
  { name: 'Surana & Surana College of Law', role: 'Education Partner', logo: '/images/partners/surana.png' },
  { name: 'JJ College of Law', role: 'Education Partner', logo: '/images/partners/jj.png' },
  { name: 'NIMCJ', role: 'Media Education Partner', logo: '/images/partners/nimcj.jpg' },
  { name: 'Geostrata', role: 'Support Partner', logo: '/images/partners/geostrata.jpg' },
  { name: 'BMK Foundation', role: 'Supporters', logo: '/images/partners/bmk-foundation.jpg' },
  { name: 'BCAS', role: 'Support Partner', logo: '/images/partners/bcas.png' },
  { name: 'Pravarsh', role: 'Support Partner', logo: '/images/partners/pravarsh.png' },
]

function RevealList({ items }) {
  return (
    <div className="space-y-2 mt-auto">
      {items.map((it, i) => (
        <div key={it.title} className="group cursor-pointer">
          <div className="relative overflow-hidden border-t border-warm pt-6 pb-4">
            <div
              className={`absolute left-0 top-0 h-[2px] bg-oxblood transition-all duration-500 group-hover:w-full ${
                i === 0 ? 'w-1/3' : 'w-0'
              }`}
            />
            <h3
              className={`mb-2 text-lg font-normal transition-colors ${
                i === 0 ? 'text-ink' : 'text-ink/55 group-hover:text-ink'
              }`}
            >
              {it.title}
            </h3>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-hover:grid-rows-[1fr]">
              <p className="overflow-hidden pr-4 text-sm leading-relaxed text-text-muted">{it.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeatureSection({ icon, eyebrow, title, intro, items, image, reverse, card }) {
  return (
    <section className="w-full border-y border-warm bg-white">
      <div
        className={`mx-auto flex w-full max-w-container-max flex-col lg:min-h-[560px] lg:flex-row ${
          reverse ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Text side */}
        <div className="flex w-full flex-col justify-between px-margin-mobile py-10 lg:w-2/5">
          <div>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <div className="mb-5 flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-oxblood">{icon}</span>
              <h2 className="font-headline-lg text-headline-lg text-sepia">{title}</h2>
            </div>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-text-muted">{intro}</p>
          </div>
          <RevealList items={items} />
        </div>

        {/* Visual side */}
        <div className="group relative flex w-full items-center justify-center overflow-hidden p-5 lg:w-3/5">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full rounded-[20px] object-cover opacity-[0.45] transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/45 to-white/15" />
          {card}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero — white background + painterly peacock video (opaque MP4 on white, so it
          reads as transparent and works in every browser). Plays once, then holds its
          final frame (no loop). */}
      <section className="w-full px-4 pt-4 pb-stack-lg sm:px-6">
        <div className="relative flex min-h-[70vh] w-full items-center overflow-hidden rounded-[24px] border border-warm bg-white shadow-sm md:min-h-[78vh]">
          <video
            className="pointer-events-none absolute bottom-0 left-0 z-0 h-[82%] w-auto max-w-none object-contain object-bottom opacity-90 md:z-[5] md:h-[96%] md:opacity-100"
            poster="/images/peacock-poster.jpg"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/videos/peacock.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 max-w-3xl px-margin-mobile py-stack-lg md:ml-[36%] md:pr-8">
            <p className="eyebrow mb-5">
              <span className="indic">श्रुतसंजीवन</span> · Ratnatrayee Trust
            </p>
            <p className="font-headline-md text-[26px] leading-snug text-ink md:text-[34px]">
              Shrutsanjeevan, an initiative of the Ratnatrayee Trust, is devoted to rejuvenating
              our ancient manuscript treasure — transcribing, researching, editing and digitizing
              the scriptural heritage so that knowledge once locked in bhandars can be read
              by anyone, anywhere.
            </p>
          </div>
        </div>
      </section>


      {/* Partner marquee */}
      <section className="w-full overflow-hidden border-y border-warm bg-white py-10">
        <p className="eyebrow mb-8 text-center">With the support of</p>
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="flex items-end gap-16 pr-16">
              {partners.map((p) => (
                <div key={p.name} className="flex w-44 shrink-0 flex-col items-center gap-4 text-center">
                  <div className="flex h-20 items-center justify-center">
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="max-h-20 w-auto max-w-[10rem] object-contain"
                      />
                    ) : (
                      <span className="font-headline-md text-[15px] leading-snug text-sepia line-clamp-3">
                        {p.name}
                      </span>
                    )}
                  </div>
                  <span className="font-label-md text-label-md text-text-muted">{p.role}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Feature 1 — Search & request */}
      <FeatureSection
        icon="travel_explore"
        eyebrow="Find what you need"
        title="Search &amp; request"
        intro="Browse tens of thousands of catalogued manuscripts, collect the ones you want, and send your request to the kendra in a single step."
        items={searchSteps}
        image="/images/manuscript-texture.png"
        card={
          <div className="relative z-10 mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-warm bg-white/95 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-warm p-4">
              <span className="font-label-md text-label-md text-sepia">Request list</span>
              <span className="material-symbols-outlined text-oxblood">menu_book</span>
            </div>
            <div className="divide-y divide-warm">
              {['Tattvartha Sutra', 'Kalpa Sutra', 'Yogashastra'].map((t) => (
                <div key={t} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-normal text-ink">{t}</p>
                    <p className="text-xs text-text-muted">Koba Gyanmandir</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Toggle ${t}`}
                    className="text-olive transition-colors hover:text-oxblood"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-oxblood py-2.5 font-label-md text-label-md text-white transition-colors hover:bg-maroon-dark"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
                Request via WhatsApp
              </button>
            </div>
          </div>
        }
      />

      {/* Collection stats — between the two feature sections */}
      <section className="mx-auto w-full max-w-container-max px-margin-mobile py-stack-lg">
        <p className="eyebrow mb-3">By the numbers</p>
        <h2 className="mb-stack-md font-headline-lg text-headline-lg text-sepia">Our digital collection</h2>
        <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="border-t border-oxblood/70 pt-5">
              <CountUp
                to={s.to}
                from={s.from ?? 0}
                separator=","
                duration={1.4}
                ease="linear"
                className="block font-headline-xl text-[40px] leading-none text-ink"
              />
              <p className="mt-2 font-label-md text-label-md text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature 2 — Read & download (swapped) */}
      <FeatureSection
        reverse
        icon="auto_stories"
        eyebrow="Study at your pace"
        title="Read &amp; download"
        intro="Preview each digitized scripture online, then download the full text to keep — freely, with no barrier to access."
        items={readSteps}
        image="/images/manuscript-texture-2.jpg"
        card={
          <div className="relative z-10 mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-warm bg-white/95 shadow-2xl backdrop-blur-xl">
            <div
              className="relative flex h-56 flex-col items-center justify-center border-b border-warm px-6 pb-7 text-center"
              style={{ background: 'linear-gradient(150deg,#22323b,#2f4a54 55%,#1c2b31)' }}
            >
              <div className="pointer-events-none absolute inset-3 rounded-sm border" style={{ borderColor: '#cfa15a55' }} />
              <span className="mb-2 text-lg leading-none" style={{ color: '#cfa15a' }}>॥</span>
              <p className="font-headline-md text-[20px] leading-tight" style={{ color: '#eef3f1' }}>Tattvartha Sutra</p>
              <span className="my-2.5 block h-px w-8" style={{ background: '#cfa15a' }} />
              <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: '#eef3f1', opacity: 0.75 }}>Umaswati</p>
              <span
                className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.18em]"
                style={{ color: '#eef3f1', opacity: 0.6 }}
              >
                Sanskrit · 412 pp
              </span>
            </div>
            <div className="p-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-oxblood py-2 font-label-md text-label-md text-white transition-colors hover:bg-maroon-dark"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>auto_stories</span>
                  Read
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-oxblood py-2 font-label-md text-label-md text-oxblood transition-colors hover:bg-cream-surface"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                  PDF
                </button>
              </div>
            </div>
          </div>
        }
      />

      {/* Blessings of the Gurudevs — just before the footer */}
      <section className="mx-auto w-full max-w-container-max px-margin-mobile pb-stack-lg pt-stack-md">
        <div className="mb-stack-md text-center">
          <p className="eyebrow mb-3">With reverence</p>
          <h2 className="font-headline-lg text-headline-lg text-sepia">Blessings of the Gurudevs</h2>
        </div>
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            {gurudevBlobs.map((d, i) => (
              <clipPath key={i} id={`gurudev-blob-${i}`} clipPathUnits="objectBoundingBox">
                <path d={d} />
              </clipPath>
            ))}
          </defs>
        </svg>
        <div className="mx-auto flex max-w-5xl flex-col gap-stack-lg">
          {gurudevs.map((g, i) => (
            <div
              key={g.name}
              className={`flex flex-col gap-6 sm:min-h-[420px] sm:items-center ${
                i % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'
              }`}
            >
              {/* Portrait — organic blob frame */}
              <div className="relative mx-auto w-full max-w-[380px] self-center sm:mx-0 sm:w-[400px] sm:shrink-0">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[-10%]"
                  style={{
                    background:
                      'radial-gradient(58% 58% at 50% 42%, rgba(217,164,65,0.26) 0%, rgba(217,164,65,0.08) 46%, rgba(217,164,65,0) 70%)',
                  }}
                />
                <img
                  src={g.image}
                  alt={g.name}
                  className="relative aspect-[4/4.4] w-full object-cover object-top"
                  style={{ clipPath: `url(#gurudev-blob-${i})` }}
                />
              </div>
              {/* Text — no container */}
              <div
                className={`flex flex-1 flex-col justify-center gap-4 ${
                  i % 2 === 1 ? 'sm:pr-4' : 'sm:pl-4'
                }`}
              >
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
