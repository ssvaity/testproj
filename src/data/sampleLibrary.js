// Library items shown on the /library page.
//
// To publish a book, add two links per item:
//   previewUrl  — a SHORT PDF (e.g. first few pages) users can read online
//   downloadUrl — the FULL PDF users download
// Host the files for free on the Internet Archive (archive.org) and paste the
// direct links here. Leave a URL as '' to disable that button for the book.
//
// The first two items below use a public sample PDF so you can see the
// preview + download flow working out of the box — replace them with real links.
//
// Books are often split into several PDFs (chapters / adhyayas / verse groups).
// Add an optional `chapters` array — each with its own previewUrl + downloadUrl —
// and keep the book-level `downloadUrl` as the whole-book PDF.
const SAMPLE = 'https://pdfobject.com/pdf/sample.pdf'

export const sampleLibrary = [
  {
    id: 'L-1024',
    title: 'Tattvartha Sutra',
    author: 'Umaswati',
    language: 'Sanskrit',
    topic: 'Philosophy',
    year: 1995,
    pages: 412,
    summary:
      'The foundational text of Jain philosophy, presenting the seven tattvas (fundamental truths) and the path to liberation in concise aphoristic form. Revered across all Jain traditions as the first Sanskrit compendium of Jain metaphysics, epistemology, and ethics.',
    previewUrl: 'https://pdfobject.com/pdf/sample.pdf',
    downloadUrl: 'https://pdfobject.com/pdf/sample.pdf',
    chapters: [
      { title: 'Adhyaya 1 — Right Faith & Knowledge', pages: 42, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 2 — The Category of the Living', pages: 48, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 3 — The Lower & Middle Worlds', pages: 39, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 4 — The Celestial Beings', pages: 44, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 5 — The Non-Living Substances', pages: 51, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 6 — Influx of Karma', pages: 33, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 7 — The Five Vows', pages: 46, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 8 — Bondage of Karma', pages: 29, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 9 — Stoppage & Shedding', pages: 24, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Adhyaya 10 — Liberation', pages: 16, previewUrl: SAMPLE, downloadUrl: SAMPLE },
    ],
  },
  {
    id: 'L-1025',
    title: 'Samayasara',
    author: 'Kundakunda',
    language: 'Prakrit',
    topic: 'Spirituality',
    year: 2001,
    pages: 286,
    summary:
      'A profound treatise on the nature of the pure soul (atman) and its distinction from karmic matter. Kundakunda expounds the doctrine of the self from the transcendental viewpoint, making it a cornerstone of Digambara spiritual literature.',
    previewUrl: 'https://pdfobject.com/pdf/sample.pdf',
    downloadUrl: 'https://pdfobject.com/pdf/sample.pdf',
    chapters: [
      { title: '1 — Jiva–Ajiva (Soul & Non-Soul)', pages: 38, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '2 — Karta–Karma (Doer & Deed)', pages: 34, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '3 — Punya–Papa (Merit & Demerit)', pages: 27, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '4 — Asrava (Influx)', pages: 22, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '5 — Samvara (Stoppage)', pages: 25, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '6 — Nirjara (Shedding)', pages: 20, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '7 — Bandha (Bondage)', pages: 28, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: '8 — Moksha (Liberation)', pages: 21, previewUrl: SAMPLE, downloadUrl: SAMPLE },
    ],
  },
  {
    id: 'L-1026',
    title: 'Kalpa Sutra',
    author: 'Bhadrabahu',
    language: 'Prakrit',
    topic: 'History',
    year: 1988,
    pages: 198,
    summary:
      'A canonical text recounting the lives of the Tirthankaras, especially Mahavira, along with rules for monastic conduct during the Paryushana festival. Famous for its richly illustrated manuscript tradition.',
    previewUrl: '',
    downloadUrl: '',
  },
  {
    id: 'L-1027',
    title: 'Yogashastra',
    author: 'Hemachandra',
    language: 'Sanskrit',
    topic: 'Yoga',
    year: 1992,
    pages: 524,
    summary:
      'A comprehensive manual on Jain yoga and ethical discipline composed by the polymath Acharya Hemachandra, covering the conduct of both ascetics and lay followers on the path to spiritual purification.',
    previewUrl: '',
    downloadUrl: '',
  },
  {
    id: 'L-1028',
    title: 'Uttaradhyayana Sutra',
    author: 'Various',
    language: 'Prakrit',
    topic: 'Agam',
    year: 2007,
    pages: 350,
    summary:
      'One of the most important Agamic texts, a collection of the final teachings of Mahavira presented as parables, dialogues, and verses on renunciation, karma, and the discipline of the monastic life.',
    previewUrl: '',
    downloadUrl: '',
  },
  {
    id: 'L-1029',
    title: 'Bhaktamar Stotra',
    author: 'Manatunga',
    language: 'Sanskrit',
    topic: 'Devotional',
    year: 2001,
    pages: 96,
    summary:
      'A celebrated devotional hymn of 48 verses in praise of the first Tirthankara, Rishabhanatha. Cherished for its poetic beauty and recited daily by devotees across Jain communities.',
    previewUrl: SAMPLE,
    downloadUrl: SAMPLE,
    chapters: [
      { title: 'Mangalacharan & Verses 1–8', pages: 16, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Verses 9–20', pages: 20, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Verses 21–32', pages: 22, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Verses 33–44', pages: 22, previewUrl: SAMPLE, downloadUrl: SAMPLE },
      { title: 'Verses 45–48 & Phalashruti', pages: 16, previewUrl: SAMPLE, downloadUrl: SAMPLE },
    ],
  },
  {
    id: 'L-1030',
    title: 'Navtattva Prakaran',
    author: 'Various',
    language: 'Gujarati',
    topic: 'Doctrine',
    year: 2019,
    pages: 164,
    summary:
      'An accessible exposition of the nine fundamental principles (nava tattva) of Jainism in Gujarati, intended for lay students beginning their study of Jain doctrine.',
    previewUrl: '',
    downloadUrl: '',
  },
  {
    id: 'L-1031',
    title: 'Jnanarnava',
    author: 'Shubhachandra',
    language: 'Sanskrit',
    topic: 'Meditation',
    year: 1988,
    pages: 468,
    summary:
      'An ocean of knowledge on Jain meditation (dhyana), detailing contemplative practices, the stages of concentration, and the psychology of the passions to be conquered on the path to liberation.',
    previewUrl: '',
    downloadUrl: '',
  },
  {
    id: 'L-1032',
    title: 'Pravachanasara',
    author: 'Kundakunda',
    language: 'Prakrit',
    topic: 'Philosophy',
    year: 2012,
    pages: 240,
    summary:
      'A key doctrinal work presenting the essence of Jain teachings on knowledge, conduct, and the nature of substances (dravya), widely studied alongside Samayasara.',
    previewUrl: '',
    downloadUrl: '',
  },
]
