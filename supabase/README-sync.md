# Archive search on Supabase — setup

The Google Sheet stays your editing surface. A GitHub Action syncs it into a
Supabase database every 2 hours, and the Search page queries the database
(server-side, only matching rows are returned).

Until you finish step 3, the site keeps using the in-browser Google Sheet search —
nothing breaks.

## 1. Create the database
1. Create a free project at <https://supabase.com>.
2. Open **SQL Editor → New query**, paste all of [`schema.sql`](./schema.sql),
   and **Run**. This creates the `books` table, the search indexes, and the
   `search_books` function.

## 2. Point the website at Supabase
In `src/config.js`, fill in the `SUPABASE` block:
```js
export const SUPABASE = {
  url: 'https://YOURPROJECT.supabase.co',   // Settings → API → Project URL
  anonKey: 'eyJhbGciOi...',                 // Settings → API → "anon public" key
}
```
Both values are **public and safe** to commit. Leaving `url` blank reverts to the
in-browser sheet search.

## 3. Turn on the sync (GitHub Actions)
The workflow is already in `.github/workflows/sync-catalogue.yml`. Add two repo
**secrets** (GitHub → repo → Settings → Secrets and variables → Actions → *New
repository secret*):

| Secret | Where to find it |
|---|---|
| `SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → **service_role** key (SECRET) |

> The **service_role** key can write to the database and bypasses security rules.
> Keep it only in GitHub secrets — never in `src/config.js` or the frontend.

Optional: add `BOOKS_SHEET_CSV_URL` as a secret only if the sheet URL differs
from the one in `src/config.js`.

Then run it once manually: **Actions → “Sync catalogue to Supabase” → Run
workflow**. After that it runs automatically every 2 hours.

## Editing the catalogue
Keep editing the **Google Sheet** exactly as before. Changes appear on the site
after the next sync (≤ 2 hours). To publish sooner, trigger the workflow manually,
or run it locally:

```bash
SUPABASE_URL='https://YOURPROJECT.supabase.co' \
SUPABASE_SERVICE_ROLE_KEY='service_role_key_here' \
npm run sync
```

## How search stays identical
The sync reuses the site's own `translit.js` to compute each row's folded
`search_key` (Devanagari ⇄ Latin). The Search page folds the query the same way
and the `search_books` function matches with `pg_trgm` (substring **or** fuzzy
trigram) — so typo-tolerant, cross-script search works exactly like the
in-browser version, just in the database.
