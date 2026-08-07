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

// -----------------------------------------------------------------------------
// Archive catalogue — a published Google Sheet (CSV).
// File -> Share -> Publish to web -> pick the sheet -> "Comma-separated values
// (.csv)" -> Publish, then paste that URL here. Columns (any order):
//   Granth Name | Type | Language | Karta | Tikakaar | Speciality
// -----------------------------------------------------------------------------
export const BOOKS_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkn2CmRShypf5J5p0-kwWsdCiwrz58Ndo30e4wFyWnlwIRa7aAFxMYUCyV1UP5r9cwoKLs4dU4Uty4/pub?output=csv'

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

// -----------------------------------------------------------------------------
// Sanity CMS — powers the Library (books + chapters + PDFs), edited by non-devs.
// -----------------------------------------------------------------------------
// Staff add/edit books in the hosted Sanity Studio (no code); the Library page
// reads from here. The projectId is PUBLIC and safe to expose. Leave projectId
// as '' to use the built-in sample library in src/data/sampleLibrary.js.
//
// SETUP (one time, ~15 minutes — see studio/README.md for the full walkthrough):
//   1. In a NEW folder run:  npm create sanity@latest
//      Sign in, create a project (e.g. "shrutsanjeevan-library"), dataset
//      "production". This scaffolds a Studio app.
//   2. Copy studio/schemas/book.js from this repo into the Studio's schema
//      folder and register it (see studio/README.md).
//   3. Run  npx sanity deploy  to publish the Studio at <name>.sanity.studio.
//   4. Studio -> Settings -> API -> CORS origins: add your website URL (and
//      http://localhost:3000 for local dev).
//   5. Paste the projectId below. Add books in the Studio and reload the site.
export const SANITY = {
  projectId: '2x48hirj',
  dataset: 'production',
}
