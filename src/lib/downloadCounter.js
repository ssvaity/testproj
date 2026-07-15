// -----------------------------------------------------------------------------
// Live "total downloads" counter, backed by Firebase Firestore.
//
// One shared document (counters/downloads) holds a single number `total`.
// Every visitor reads it live; each download bumps it by 1 atomically, so the
// count is correct even when many people download at the same time.
//
// Firestore security rules to paste in the Firebase console (allows the world
// to read the counter and to increment it, but nothing else):
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /counters/downloads {
//         allow read: if true;
//         allow write: if request.resource.data.keys().hasOnly(['total'])
//                      && request.resource.data.total is int;
//       }
//     }
//   }
//
// If FIREBASE.apiKey is empty in config.js, everything here is a no-op and the
// UI simply hides the counter.
// -----------------------------------------------------------------------------
import { FIREBASE } from '../config.js'

const enabled = Boolean(FIREBASE.apiKey && FIREBASE.projectId)

let docRefPromise = null

// Lazily load Firebase and resolve the counter document reference. We import
// the SDK dynamically so the ~100KB of Firebase code is only fetched when the
// counter is actually used (i.e. on the Library page), not on every page.
async function getDocRef() {
  if (!enabled) return null
  if (!docRefPromise) {
    docRefPromise = (async () => {
      const { initializeApp, getApps } = await import('firebase/app')
      const { getFirestore, doc } = await import('firebase/firestore')
      const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE)
      const db = getFirestore(app)
      return doc(db, 'counters', 'downloads')
    })()
  }
  return docRefPromise
}

// Subscribe to the live total. Calls `onValue(number)` immediately with the
// current value and again whenever it changes. Returns an unsubscribe function.
export function subscribeDownloadCount(onValue) {
  if (!enabled) return () => {}
  let unsub = () => {}
  let cancelled = false
  ;(async () => {
    const ref = await getDocRef()
    if (!ref || cancelled) return
    const { onSnapshot } = await import('firebase/firestore')
    unsub = onSnapshot(
      ref,
      (snap) => onValue(snap.exists() ? snap.data().total || 0 : 0),
      () => {} // ignore transient read errors; keep last known value
    )
  })()
  return () => {
    cancelled = true
    unsub()
  }
}

// Record one download by atomically incrementing the shared total. Safe to call
// repeatedly; failures (offline, counter off) are swallowed so downloads never
// break because of analytics.
export async function incrementDownloadCount(by = 1) {
  if (!enabled) return
  try {
    const ref = await getDocRef()
    if (!ref) return
    const { setDoc, increment } = await import('firebase/firestore')
    await setDoc(ref, { total: increment(by) }, { merge: true })
  } catch {
    // Non-fatal: the download itself has already been triggered.
  }
}

export const downloadCounterEnabled = enabled
