// -----------------------------------------------------------------------------
// Typo-tolerant (fuzzy) matching for the archive search.
//
// The primary match is still a fast exact substring test on the folded key.
// On top of that, this adds word-level fuzzy matching: each word the visitor
// typed must match SOME word of the record either as a substring or within a
// small edit (Levenshtein) distance, so "kalpsutra"/"yogshastr" still find
// "Kalpa Sutra" / "Yogashastra".
// -----------------------------------------------------------------------------

// Levenshtein edit distance with an early-exit ceiling: if the distance is
// guaranteed to exceed `max`, it returns max + 1 without finishing. Keeps the
// per-token cost tiny even across tens of thousands of records.
export function boundedLev(a, b, max) {
  const al = a.length
  const bl = b.length
  if (Math.abs(al - bl) > max) return max + 1
  if (al === 0) return bl
  if (bl === 0) return al
  let prev = new Array(bl + 1)
  let curr = new Array(bl + 1)
  for (let j = 0; j <= bl; j += 1) prev[j] = j
  for (let i = 1; i <= al; i += 1) {
    curr[0] = i
    let rowMin = i
    const ai = a.charCodeAt(i - 1)
    for (let j = 1; j <= bl; j += 1) {
      const cost = ai === b.charCodeAt(j - 1) ? 0 : 1
      const v = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
      curr[j] = v
      if (v < rowMin) rowMin = v
    }
    if (rowMin > max) return max + 1 // whole row already over budget
    const tmp = prev
    prev = curr
    curr = tmp
  }
  return prev[bl]
}

// How many typos to tolerate for a query word of a given length. Short words
// must match exactly (a 1-edit slip on a 3-letter word matches almost anything).
function allowedDistance(len) {
  if (len <= 3) return 0
  if (len <= 6) return 1
  return 2
}

// True when a single query token matches any of a record's tokens.
function tokenMatches(recordTokens, needle) {
  const max = allowedDistance(needle.length)
  for (let i = 0; i < recordTokens.length; i += 1) {
    const rt = recordTokens[i]
    if (rt.includes(needle)) return true
    if (max > 0 && boundedLev(rt, needle, max) <= max) return true
  }
  return false
}

// True when EVERY query token fuzzily matches some record token (a fuzzy AND).
export function fuzzyMatch(recordTokens, needleTokens) {
  if (!needleTokens.length) return false
  for (let i = 0; i < needleTokens.length; i += 1) {
    if (!tokenMatches(recordTokens, needleTokens[i])) return false
  }
  return true
}
