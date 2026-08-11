-- =============================================================================
-- Shrutsanjeevan archive — Supabase schema for server-side search.
-- Run this ONCE in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: everything uses "if not exists" / "create or replace".
-- =============================================================================

-- Trigram matching powers the typo-tolerant fuzzy search.
create extension if not exists pg_trgm;

-- The catalogue. The GitHub Action fills this from the Google Sheet every 2h.
-- *_key columns are transliteration-folded (Devanagari <-> Latin) so a query in
-- either script matches; langs/genres are the canonical dropdown facet sets.
create table if not exists public.books (
  id            text primary key,
  name          text not null,
  type          text default '',
  language      text default '',
  author        text default '',
  tikakaar      text default '',
  speciality    text default '',
  search_key    text default '',   -- space-less folded key (exact-substring matches)
  search_text   text default '',   -- space-separated folded tokens (word-level fuzzy)
  author_key    text default '',
  tik_key       text default '',
  langs         text[] default '{}',
  genres        text[] default '{}',
  has_tikakaar  boolean default false,
  synced_at     timestamptz default now()  -- stamped each sync; stale rows are pruned
);
-- Add columns if an older version of this table already exists.
alter table public.books add column if not exists synced_at   timestamptz default now();
alter table public.books add column if not exists search_text text default '';

create index if not exists books_search_key_trgm  on public.books using gin (search_key  gin_trgm_ops);
create index if not exists books_search_text_trgm on public.books using gin (search_text gin_trgm_ops);
create index if not exists books_author_key_trgm on public.books using gin (author_key gin_trgm_ops);
create index if not exists books_tik_key_trgm    on public.books using gin (tik_key    gin_trgm_ops);
create index if not exists books_langs_gin       on public.books using gin (langs);
create index if not exists books_genres_gin      on public.books using gin (genres);

-- The catalogue is public and read-only for site visitors (anon key).
-- The sync job uses the service_role key, which bypasses RLS to write.
alter table public.books enable row level security;
drop policy if exists "books are publicly readable" on public.books;
create policy "books are publicly readable"
  on public.books for select to anon using (true);

-- Explicit grants, so this works even when the project's "Automatically expose
-- new tables" setting is turned OFF (which otherwise auto-grants these).
--   anon (public site): read-only.
--   service_role (the sync job's secret key): full write access.
grant usage on schema public to anon;
grant select on public.books to anon;
grant all on public.books to service_role;

-- -----------------------------------------------------------------------------
-- search_books: word-level fuzzy keyword search + exact facet filters, paginated.
--
-- A row matches when the query is an exact substring OR fuzzily matches a word
-- (pg_trgm word_similarity — so "stvan" finds "stavan"). Ranking: exact
-- substring first (score 1), then by how close the fuzzy word match is.
-- An empty query with no filters returns nothing (no full-catalogue dump).
-- FUZZINESS DIAL: `word_similarity_threshold` below — lower = more typo-tolerant
-- (more matches, more noise), higher = stricter. 0.30 ≈ generous, ~1–2 typos.
-- -----------------------------------------------------------------------------
-- Drop the older 8-arg version so adding the defaulted `fuzz` arg below doesn't
-- create an ambiguous overload for PostgREST.
drop function if exists public.search_books(text, text, text, text, text, boolean, int, int);

create or replace function public.search_books(
  q                 text,
  f_language        text,
  f_topic           text,
  f_author          text,
  f_tikakaar        text,
  f_only_commentary boolean,
  lim               int,
  off               int,
  fuzz              real default 0.35   -- word-similarity threshold; frontend passes 0.35
)
returns table (
  id text, name text, type text, language text, author text,
  tikakaar text, speciality text, total_count bigint
)
language plpgsql
stable
as $$
#variable_conflict use_column
begin
  -- How close a word must be to count as a fuzzy match (0..1). Lower = more
  -- typo-tolerant (more results), higher = stricter. Comes from the `fuzz` arg
  -- (default 0.30); the site uses the default, we can pass others to tune.
  perform set_config('pg_trgm.word_similarity_threshold', fuzz::text, true);
  return query
  with matched as (
    select
      b.*,
      case
        when q = '' then 0.0
        when b.search_key ilike '%' || q || '%' then 1.0        -- exact substring wins
        else word_similarity(q, b.search_text)                  -- fuzzy, typo-tolerant
      end as score
    from public.books b
    where
      -- Nothing typed and no filter chosen -> return nothing (no full-catalogue dump).
      (q <> '' or f_language <> '' or f_topic <> '' or f_author <> ''
        or f_tikakaar <> '' or f_only_commentary)
      and (q = '' or b.search_key ilike '%' || q || '%' or b.search_text %> q)
      and (f_language = '' or f_language = any(b.langs))
      and (f_topic    = '' or f_topic    = any(b.genres))
      and (f_author   = '' or b.author_key ilike '%' || f_author   || '%')
      and (f_tikakaar = '' or b.tik_key    ilike '%' || f_tikakaar || '%')
      and (not f_only_commentary or b.has_tikakaar)
  )
  select
    m.id, m.name, m.type, m.language, m.author, m.tikakaar, m.speciality,
    count(*) over () as total_count
  from matched m
  order by m.score desc, m.name asc
  limit greatest(lim, 1) offset greatest(off, 0);
end;
$$;

grant execute on function
  public.search_books(text, text, text, text, text, boolean, int, int, real)
  to anon;
