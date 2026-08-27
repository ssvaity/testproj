# Site guide chatbot — setup

The chat bubble in the bottom-right corner answers questions about this website.
It talks to `/api/chat`, a Vercel serverless function that calls OpenRouter.

## Why a serverless function and not just fetch from React

An API key that the browser can read is a key anyone can steal. Vite compiles
every `VITE_*` variable into the JavaScript bundle, so the key has to live on a
server the visitor cannot see. `api/chat.js` is that server. It also builds the
system prompt, so the assistant's brief cannot be rewritten from devtools.

## One-time setup

1. Create a key at <https://openrouter.ai/keys>.
2. In Vercel: **Project → Settings → Environment Variables**, add

   | Name | Value | Environments |
   |---|---|---|
   | `OPENROUTER_API_KEY` | your key | Production, Preview, Development |

   **Do not** name it `VITE_OPENROUTER_API_KEY` — that would publish it.
3. Redeploy. That's all — no other code changes.

## Running it locally

The Vite dev server does not run Vercel functions, so `vite.config.js` mounts the
same handler as dev middleware. Provide the key in the shell:

```bash
OPENROUTER_API_KEY=sk-or-... npm run dev
```

Without the key the widget still renders and says the guide is unavailable.

## Choosing the model

`api/chat.js` reads `OPENROUTER_MODEL`, defaulting to `google/gemma-4-31b-it:free`.
Any OpenRouter model id works — set the variable in Vercel to switch without
touching code.

- **Free** ids end in `:free`. They cost nothing, but OpenRouter caps how many
  requests each one serves and the free roster changes over time. The current
  free list is at <https://openrouter.ai/models?max_price=0>.
- **Paid** ids remove the cap and answer better. `anthropic/claude-haiku-4-5` is
  a good fit for short guidance answers.

## Fallback models

When a model is rate-limited, down, or filters the request, OpenRouter moves to
the next id in the `models` array — inside the same request, so the visitor waits
once, not twice. The chain is primary first, then:

```
z-ai/glm-5.2:free
minimax/minimax-m2.7:free
nvidia/nemotron-3-super-120b-a12b:free
openrouter/free
```

This works because OpenRouter [rate-limits per model](https://openrouter.ai/docs/api-reference/limits),
so a different free model is real extra headroom rather than the same wall again.
`openrouter/free` sits last as a router over whatever free model is currently up,
which survives any single one being retired.

Override the chain with `OPENROUTER_FALLBACK_MODELS` (comma-separated). Duplicates
are removed, so it is safe to repeat the primary.

**One limit worth knowing.** Two failures hit every free model at once and no
free fallback can rescue them:

- an account-wide free-tier request cap, and
- a negative credit balance, which OpenRouter says blocks free models too.

Only a paid id survives those. If the guide must never go down, end the chain
with one — it is used only after every free option has failed, so it stays
unbilled in normal running:

```
OPENROUTER_FALLBACK_MODELS=z-ai/glm-5.2:free,openrouter/free,anthropic/claude-haiku-4-5
```

When the whole chain is exhausted the visitor sees "a lot of questions just now"
and the function logs which models were tried. A fallback that answers is logged
too (`Primary model unavailable; X answered instead`), so a silent change in the
assistant's tone is traceable.

## Changing what the bot knows

`api/_site-knowledge.js` holds the page map and the common tasks that go into the
system prompt. Add a page there when you add a page to the site. The assistant is
told not to invent anything outside it — for "do you have manuscript X" it sends
the visitor to the Archive search rather than guessing, because it cannot see the
catalogue.

The contact details in that file are copied from `src/config.js`; update both if
they change.

## Guardrails

Enforced in `api/chat.js`, not in the browser:

- The system prompt is built server-side; `system` messages from the client are
  discarded, so "ignore your instructions" injected as a system turn does nothing.
- Only `user` and `assistant` roles pass through; at most 16 turns, 1000
  characters each, and replies are capped at 400 tokens.
- Roughly 12 requests per minute per IP. This is best-effort — serverless
  instances are recycled, so treat OpenRouter's own limits as the real backstop.
- The prompt scopes answers to this site and its collection, and tells the model
  to decline anything else in one sentence without explaining its rules.

Guardrails in the prompt are guidance, not a guarantee — a determined visitor can
still coax an off-topic answer out of any model. The layers above bound the
damage (short replies, no tools, no data access, rate limits) rather than making
it impossible.
