// -----------------------------------------------------------------------------
// Facet normalisation for the archive's messy Language / Type columns.
//
// The Google Sheet holds ~259 distinct "language" and ~335 distinct "type"
// values — abbreviations, spelling variants, blanks and combinations
// ("प्रा., मा. गु.", "स्तवन/सज्झाय", …). Raw, they make useless dropdowns.
//
// Here we classify each raw value into a SET of canonical facets. A record that
// is "Prakrit + Sanskrit" is filed under BOTH Prakrit and Sanskrit, so picking
// either finds it. The dropdowns then show a short, clean, curated list while
// still matching every underlying variant.
//
// IMPORTANT: this only affects what the website shows/filters. The Google Sheet
// is never modified — classification happens in the browser at load time.
// -----------------------------------------------------------------------------

// Curated language options (display order). `value` is the canonical key stored
// on each record; `label` is what the dropdown shows.
export const LANGUAGES = [
  { value: 'Sanskrit', label: 'संस्कृत · Sanskrit' },
  { value: 'Prakrit', label: 'प्राकृत · Prakrit' },
  { value: 'Gujarati', label: 'गुजराती · Gujarati' },
  { value: 'Maru-Gurjar', label: 'मारुगुर्जर · Maru-Gurjar' },
  { value: 'Hindi', label: 'हिंदी · Hindi' },
]

// Curated genre ("type") options, ordered by how common they are in the data.
// `tokens` are the substrings that map a raw type value to this genre.
export const GENRES = [
  { value: 'Agam', label: 'आगम · Āgam', tokens: ['आगम'] },
  { value: 'Stavan', label: 'स्तवन · Stavan', tokens: ['स्तवन', 'स्तवना'] },
  { value: 'Prakaran', label: 'प्रकरण · Prakaraṇ', tokens: ['प्रकरण'] },
  { value: 'Katha', label: 'कथा · Kathā', tokens: ['कथा'] },
  { value: 'Sajjhay', label: 'सज्झाय · Sajjhāy', tokens: ['सज्झाय'] },
  { value: 'Ras', label: 'रास · Rās', tokens: ['रास'] },
  { value: 'Kavya', label: 'काव्य/पद्य · Kāvya', tokens: ['काव्य', 'पद्य', 'दोहा', 'छंद', 'गीत'] },
  { value: 'Sangrah', label: 'संग्रह · Saṅgrah', tokens: ['संग्रह'] },
  { value: 'Stotra', label: 'स्तोत्र · Stotra', tokens: ['स्तोत्र'] },
  { value: 'Stuti', label: 'स्तुति · Stuti', tokens: ['स्तुति'] },
  { value: 'Karma', label: 'कर्म · Karma', tokens: ['कर्म'] },
  { value: 'Vyakaran', label: 'व्याकरण · Vyākaraṇ', tokens: ['व्याकरण'] },
  { value: 'Jyotish', label: 'ज्योतिष · Jyotiṣ', tokens: ['ज्योतिष'] },
  { value: 'Kulak', label: 'कुलक · Kulak', tokens: ['कुलक'] },
  { value: 'Charitra', label: 'चरित्र · Charitra', tokens: ['चरित्र'] },
  { value: 'Puja', label: 'पूजा · Pūjā', tokens: ['पूजा', 'स्नात्र'] },
  { value: 'Dharma', label: 'धर्म · Dharma', tokens: ['धर्म'] },
  { value: 'Mantra', label: 'मंत्र/तंत्र · Mantra', tokens: ['मंत्र', 'तंत्र'] },
  { value: 'Vidhi', label: 'विधि · Vidhi', tokens: ['विधि'] },
  { value: 'Kalp', label: 'कल्प · Kalp', tokens: ['कल्प'] },
  { value: 'Nyaya', label: 'न्याय · Nyāya', tokens: ['न्याय'] },
  { value: 'Achar', label: 'आचार · Āchār', tokens: ['आचार'] },
  { value: 'Pratikraman', label: 'प्रतिक्रमण · Pratikramaṇ', tokens: ['प्रतिक्रमण', 'आवश्यक'] },
  { value: 'Ganit', label: 'गणित · Gaṇit', tokens: ['गणित'] },
  { value: 'Itihas', label: 'इतिहास · Itihās', tokens: ['इतिहास'] },
]

// Fast lookup: display label for a canonical value (used for filter chips).
const LABEL = {}
for (const o of [...LANGUAGES, ...GENRES]) LABEL[o.value] = o.label
export const facetLabel = (value) => LABEL[value] || value

// Latin short-codes used in the Language column, e.g. "S", "MG", "P/S/MG".
const LANG_CODE = {
  s: 'Sanskrit', sanskrit: 'Sanskrit',
  p: 'Prakrit', prakrit: 'Prakrit',
  g: 'Gujarati', guj: 'Gujarati', gujarati: 'Gujarati',
  mg: 'Maru-Gurjar', magu: 'Maru-Gurjar', mgu: 'Maru-Gurjar',
  h: 'Hindi', hindi: 'Hindi',
}

// Classify a raw language string into canonical languages. Handles both the
// Devanagari/Gujarati-script values and the Latin short-codes. Maru-Gurjar is
// detected first (script path) so its "गु" isn't mistaken for Gujarati.
export function languagesOf(raw) {
  const str = String(raw || '').trim()
  if (!str) return []

  // Latin-code path (e.g. "S/MG", "P/S/MG", "MG"). Split on any non-letter.
  if (/[A-Za-z]/.test(str)) {
    const out = []
    for (const tok of str.toLowerCase().split(/[^a-z]+/)) {
      const lang = LANG_CODE[tok]
      if (lang && !out.includes(lang)) out.push(lang)
    }
    return out
  }

  // Devanagari / Gujarati script path.
  const s = str.toLowerCase().replace(/[\s.]/g, '')
  const out = []
  let t = s
  if (/मारुगुर्जर|मारूगुर्जर|मागु|मारु/.test(t)) {
    out.push('Maru-Gurjar')
    t = t.replace(/मारुगुर्जर|मारूगुर्जर|मागु|मारु|गुर्जर/g, '')
  }
  if (/संस्कृत|સંસ્કૃત|सं/.test(s)) out.push('Sanskrit')
  if (/प्राकृत|પ્રાકૃત|પ્રકૃત|प्रा/.test(s)) out.push('Prakrit')
  if (/गुजराती|ગુજરાતી|ગુજ|गुज|गु/.test(t)) out.push('Gujarati')
  if (/हिंदी|हिन्दी|હિન્દી|હીન્દી/.test(s)) out.push('Hindi')
  return out
}

// Classify a raw type string into canonical genres (a value may match several).
export function genresOf(raw) {
  const s = String(raw || '')
  if (!s.trim()) return []
  const out = []
  for (const g of GENRES) {
    if (g.tokens.some((tok) => s.includes(tok))) out.push(g.value)
  }
  return out
}
