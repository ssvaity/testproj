// -----------------------------------------------------------------------------
// Site configuration — safe for a non-developer to edit.
// Change the values below and save; no other code needs to change.
// -----------------------------------------------------------------------------

// Where book requests (from the Search page cart) are delivered.
// WhatsApp number: country code + number, DIGITS ONLY (no +, spaces or dashes).
// Example: +91 75750 01083  ->  '917575001083'
export const REQUEST_WHATSAPP = '917575001083'

// Email address that should receive book requests.
export const REQUEST_EMAIL = 'kendra@kobatirth.org'

// Google Analytics 4 Measurement ID, e.g. 'G-XXXXXXXXXX'.
// Leave it as '' to turn analytics off. When set, every "Download" click is
// recorded as a `book_download` event you can total up in the GA dashboard
// (Reports -> Engagement -> Events). GA is free and needs no credit card.
export const GA_MEASUREMENT_ID = ''

// -----------------------------------------------------------------------------
// Live "total downloads" counter (Firebase / Firestore — free, no server).
// -----------------------------------------------------------------------------
// This powers the running total of manuscripts downloaded that is shown on the
// Library page. It uses one shared number that every visitor reads and that
// goes up by 1 on each download.
//
// SETUP (one time, ~5 minutes, no credit card):
//   1. Go to https://console.firebase.google.com and create a project.
//   2. In the project, open  Build -> Firestore Database  and click
//      "Create database" (Production mode is fine).
//   3. In  Firestore -> Rules , paste the rules shown in
//      src/lib/downloadCounter.js (top comment) and Publish.
//   4. Open  Project settings (gear icon) -> "Your apps" -> Web app (</>),
//      register an app, and copy the "firebaseConfig" values into the object
//      below. Only the four fields here are needed.
//
// Leave apiKey as '' to turn the live counter off (nothing else breaks — the
// Library simply won't show the total).
export const FIREBASE = {
  apiKey: 'AIzaSyCQIlPcuF5SgUNZRc6MTjnxeQ-W_VHhXJs',
  projectId: 'internproj3-bf45a',
  appId: '1:668679564957:web:fc2464193ab6c1473b6e74',
  // Usually "<projectId>.firebaseapp.com" — copy the value Firebase gives you.
  authDomain: 'internproj3-bf45a.firebaseapp.com',
}
