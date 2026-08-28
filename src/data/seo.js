// -----------------------------------------------------------------------------
// Search-engine and social-preview text, one entry per page.
//
// Safe for a non-developer to edit — these are the words people read in Google
// results and in WhatsApp/X link previews, so they are worth getting right:
//   title        ~60 characters. Longer titles get cut off with an ellipsis.
//   description  ~155 characters. Write it as a sentence that would make
//                someone click; it does not affect ranking, only clicks.
//   image        Optional. The picture shown when the page is shared.
//   noindex      true = keep this page out of search results entirely.
//
// The text is English only for now. The Hindi and Gujarati translations live at
// the same web addresses (the language is remembered in the browser, not in the
// URL), so search engines only ever see the English version of each page.
// -----------------------------------------------------------------------------

export const seo = {
  home: {
    title: 'Shrutsanjeevan — Reviving Ancient Jain Manuscripts',
    description:
      'An initiative of the Ratnatrayee Trust transcribing, researching, editing and digitizing rare Jain manuscripts, so knowledge once locked in bhandars can be read by anyone.',
    image: '/images/manuscript-cover.jpg',
  },

  about: {
    title: 'About Us — Our Story, Vision & Values | Shrutsanjeevan',
    description:
      'Shrutsanjeevan gathers, researches, edits, preserves and publishes ancient granths — the Granthank and Granthratna collections — opening India’s scriptural heritage to the world.',
    image: '/images/about-garden-mural.jpg',
  },

  search: {
    title: 'Search the Manuscript Archive | Shrutsanjeevan',
    description:
      'Search a catalogue of Jain manuscripts by title, author (karta), tikakaar, language and subject — then request the granths you need from the kendra.',
    image: '/images/manuscript-texture-2.jpg',
  },

  library: {
    title: 'Digital Library — Read & Download Manuscripts | Shrutsanjeevan',
    description:
      'Read a preview of each digitized scripture online, or download the full text as a PDF. A growing reading room of Jain granths, free for every seeker.',
    image: '/images/manuscript-cover.jpg',
  },

  contact: {
    title: 'Contact the Kendra | Shrutsanjeevan',
    description:
      'Get in touch with Shrutsanjeevan about manuscript requests, research collaboration or supporting the work of preserving Jain scriptural heritage.',
    image: '/images/garden-strip.jpg',
  },

  // Kept out of search: a visitor's own request list is different for everyone
  // and has nothing useful to show someone arriving from Google.
  requests: {
    title: 'Your Request List | Shrutsanjeevan',
    description: 'Review the manuscripts you would like to request, then send the list to the kendra.',
    noindex: true,
  },

  // An internal demo of the intro animation — not part of the public site.
  introDemo: {
    title: 'Intro Demo | Shrutsanjeevan',
    description: 'Internal preview of the site intro animation.',
    noindex: true,
  },

  notFound: {
    title: 'Page Not Found | Shrutsanjeevan',
    description: 'This page does not exist. Browse the archive or the digital library instead.',
    noindex: true,
  },
}
