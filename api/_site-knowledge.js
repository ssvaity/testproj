// -----------------------------------------------------------------------------
// What the assistant is allowed to know about this site.
//
// This lives server-side on purpose: it is pasted into the system prompt, and
// the system prompt must never be something the browser can rewrite. Edit this
// file when pages are added or the request flow changes.
// -----------------------------------------------------------------------------

// Kept in step with src/config.js by hand — these two are shown to visitors who
// ask how to reach the kendra.
export const CONTACT = {
  email: 'kendra@kobatirth.org',
  whatsapp: '+91 93215 77048',
}

export const PAGES = [
  {
    path: '/',
    name: 'Home',
    covers:
      'Introduction to Shrutsanjeevan, an initiative of the Ratnatrayee Trust devoted to rejuvenating ancient manuscripts — transcribing, researching, editing and digitizing scriptural heritage. Shows the partners who support the work and a three-step summary of how searching and requesting works.',
  },
  {
    path: '/about',
    name: 'About',
    covers:
      'The background of the project, its mission of making knowledge once locked in bhandars readable by anyone, and the people and institutions behind it.',
  },
  {
    path: '/search',
    name: 'Search / Archive',
    covers:
      'The searchable catalogue of tens of thousands of catalogued manuscripts. Visitors can search across granth name, type, language, karta (author), tikakaar (commentator) and speciality, filter the results, and add manuscripts to a request list as they browse. This is the page for "find a manuscript" or "search the catalogue".',
  },
  {
    path: '/library',
    name: 'Library',
    covers:
      'Digitized books that can be read or downloaded directly in the browser, organised into chapters, with a built-in PDF reader. Also shows a running total of manuscripts downloaded. This is the page for "read online" or "download a PDF".',
  },
  {
    path: '/requests',
    name: 'Request list',
    covers:
      'The list of manuscripts a visitor has collected from the Archive page. From here the whole list is sent to the kendra in one step over WhatsApp or email. This is the page for "my cart", "my list" or "send my request".',
  },
  {
    path: '/contact',
    name: 'Contact',
    covers:
      'How to reach the kendra — address and contact details for questions the site cannot answer.',
  },
]

// Short answers to the things visitors actually ask. Anything not grounded here
// or in PAGES should be answered with "I am not sure" rather than invented.
export const HOW_TO = [
  'To find a manuscript: open the Archive (/search), type part of the granth name, author or topic, and use the filters to narrow it down. A Hindi/Gujarati on-screen keyboard is available for typing in Indic scripts.',
  'To request manuscripts: add them to the request list from the Archive page, then open the Request list (/requests) and send it to the kendra over WhatsApp or email in a single step. There is no payment step — this is a request to the kendra, not a shop.',
  'To read or download a book: open the Library (/library). Books open in a reader in the browser and can be downloaded as PDFs.',
  'To change language: use the language switcher in the navigation bar. The site is available in English, Hindi and Gujarati.',
  'To switch between light and dark appearance: use the theme toggle in the navigation bar.',
  `To reach a person: contact the kendra by email at ${CONTACT.email} or on WhatsApp at ${CONTACT.whatsapp}.`,
]
