// -----------------------------------------------------------------------------
// Script-bridging search keys (transliteration, done in-browser — no API).
//
// The catalogue mixes scripts: book names are romanised English ("Punyaprakashan
// Stavan", "Pooja"), while Type/Language are Devanagari ("स्तवन", "पूजा"). A
// visitor may type either script (the Archive page has a Hindi keyboard).
//
// To match across scripts we project everything to a single normalised Latin
// "search key": Devanagari is transliterated to rough Latin, then both sides are
// folded (diacritics stripped, common romanisation variants collapsed, spaces
// removed). Typing "स्तवन" and typing "stavan" both become "stavan", so either
// one finds both the English names and the Devanagari fields.
//
// This is deliberately phonetic-and-loose, not a scholarly transliteration —
// the goal is that a human's guess at spelling matches the record.
// -----------------------------------------------------------------------------

const INDEPENDENT_VOWEL = {
  अ: 'a', आ: 'aa', इ: 'i', ई: 'ii', उ: 'u', ऊ: 'uu', ऋ: 'ri', ॠ: 'ri',
  ऌ: 'li', ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au', ॐ: 'om',
}
const MATRA = {
  'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'ृ': 'ri', 'ॄ': 'ri',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
}
const CONSONANT = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'n',
  च: 'ch', छ: 'chh', ज: 'j', झ: 'jh', ञ: 'ny',
  ट: 't', ठ: 'th', ड: 'd', ढ: 'dh', ण: 'n',
  त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n',
  प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm',
  य: 'y', र: 'r', ल: 'l', व: 'v', ळ: 'l',
  श: 'sh', ष: 'sh', स: 's', ह: 'h',
  क़: 'k', ख़: 'kh', ग़: 'g', ज़: 'z', ड़: 'r', ढ़: 'rh', फ़: 'f', य़: 'y',
}
const VIRAMA = '्' // ्  — suppresses the inherent 'a'
const ANUSVARA = 'ं' // ं
const CHANDRABINDU = 'ँ' // ँ
const VISARGA = 'ः' // ः
const NUKTA = '़' // ़

const isBoundary = (ch) => ch === undefined || /[\s।॥.,;:/()\-–—]/.test(ch)

// Devanagari -> rough Latin, with word-final schwa (inherent 'a') deletion.
export function devToLatin(input) {
  const s = [...String(input)]
  let out = ''
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i]
    const cons = CONSONANT[c]
    if (cons) {
      out += cons
      const next = s[i + 1]
      if (next === VIRAMA) {
        i += 1 // half consonant: no vowel
        continue
      }
      if (MATRA[next]) {
        out += MATRA[next]
        i += 1
        continue
      }
      // Inherent 'a', unless this is the final syllable of the word (Hindi
      // drops the trailing schwa: स्तवन -> "stavan", not "stavana").
      if (!isBoundary(next)) out += 'a'
      continue
    }
    if (INDEPENDENT_VOWEL[c]) {
      out += INDEPENDENT_VOWEL[c]
      continue
    }
    if (c === ANUSVARA) out += 'n'
    else if (c === VISARGA || c === CHANDRABINDU || c === NUKTA) continue
    else out += c // digits, spaces, Latin, punctuation pass through
  }
  return out
}

// Collapse romanisation variants so different spellings of the same sound match.
export function foldLatin(input) {
  return String(input)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics (ā, ṣ, …)
    .replace(/w/g, 'v')
    .replace(/oo/g, 'u')
    .replace(/ee/g, 'i')
    .replace(/aa/g, 'a')
    .replace(/ii/g, 'i')
    .replace(/uu/g, 'u')
    .replace(/[^a-z0-9ऀ-ॿ]/g, '') // keep Latin, digits & any stray Devanagari
}

// The comparable key used for both records and queries.
export function searchKey(input) {
  return foldLatin(devToLatin(input))
}
