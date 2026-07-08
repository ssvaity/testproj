# DESIGN.md — Shrutsanjeevan

## Product
Shrutsanjeevan is a digital library and search portal for Jain scriptures and
ancient manuscripts — a catalog of ~80,000 books that can be searched, read
online, and downloaded. The audience is scholars, monks, and devotees. The
experience should feel **serene, scholarly, and reverent, yet clean and modern** —
a well-designed cultural and academic institution, not a dated archive.

## Brand
The identity comes from a traditional Jain manuscript logo: two golden hands
cradling illustrated palm-leaf manuscripts, with the name "श्रुतसंजीवन"
(Shrutsanjeevan) in deep red at the top. The design language should echo this —
sacred texts, warmth, preservation, and light.

## Theme
Light theme, warm and calm. White and cream surfaces, never stark or cold.
High readability. Generous white space. Content-first and uncluttered.

## Color palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep maroon / crimson | `#b02a26` |
| Primary (dark) | Darker maroon (hover) | `#8a1f1c` |
| Accent | Saffron gold | `#d99a3e` |
| Accent (light) | Soft gold | `#edd4a0` |
| Footer / warm | Terracotta | `#c98a79` |
| Surface | White | `#ffffff` |
| Surface (warm) | Cream | `#faf6f0` |
| Text | Warm near-black | `#26201d` |
| Muted text | Warm gray | `#6b6058` |
| Border | Warm light gray | `#e7e1da` |

- **Maroon** = primary actions, table headers, links, active states.
- **Gold** = accents, focus rings, secondary action buttons.
- **Terracotta** = footer background.
- Backgrounds stay white/cream.

## Typography
- **Headings:** a refined serif — scholarly, literary, warm.
- **Body & UI:** a clean, legible sans-serif.
- Must render **Latin, Devanagari (Hindi), and Gujarati** scripts beautifully;
  the site is trilingual (English, Hindi, Gujarati). Prefer Noto Serif / Noto Sans
  Devanagari / Noto Sans Gujarati for full script coverage.

## Components & style
- Rounded corners (~8–10px), soft subtle shadows, thin warm-gray borders.
- Gold focus states (`box-shadow` glow) on inputs.
- **Primary button:** solid maroon, white text.
- **Secondary button:** outlined maroon, or solid gold with dark text.
- Cards: white/cream, soft shadow, subtle border.
- Tables: maroon header row, zebra striping on cream, gold hover highlight.
- Language switcher (EN / हिं / ગુ) in the top navigation.

## Layout
- **Top nav bar:** manuscript logo on the left; nav links (Home, About, Search,
  Library, Contact) and language switcher on the right.
- **Footer:** warm terracotta band with Contact Us (address, phones, email),
  centered logo, social icons, and a Location/map block; a registration-info bar
  and copyright row beneath.
- Max content width ~1200px, centered, responsive; collapses gracefully to a
  single column on mobile.

## Tone & references
Calm, sacred, editorial, trustworthy — clarity over decoration. The polished,
uncluttered, content-first feel of a modern scriptural-library UI: prominent
search, clear filters, readable book cards. When in doubt, choose more white
space and simpler layouts.
```
