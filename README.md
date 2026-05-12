# PromptCraft

PromptCraft is a curated AI prompt library for ordinary users who want better results from ChatGPT, Claude, Gemini, Midjourney, DALL-E, and Stable Diffusion.

## Product Direction

- Prioritize prompt quality over prompt count.
- Do not position the site as a bulk "1000+ prompts" directory unless every indexed prompt has been reviewed.
- Public prompt pages should include useful context: when to use the prompt, bad/good examples, customization notes, and an advanced version.
- Keep thin, generic, or duplicate prompts out of sitemap and public navigation.

## Current Quality Gate

`src/lib/data.ts` reads `data/prompts.json`, then publishes only prompts that pass the current quality filter:

- Excludes generic placeholder prompts containing `[SPECIFIC TASK based on prompt title]`.
- Excludes "Help me with..." filler prompts.
- Requires core guidance fields to exist.
- Caps each scenario to avoid over-indexing one topic before review.

The raw data file can still contain backlog prompts. Treat `readPrompts()` as the public curated layer.

## Development

```bash
npm install
npm run dev
npm run build
```

The app uses system fonts instead of `next/font/google` so production builds do not depend on fetching Google Fonts.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` on Vercel when the final domain is ready. The default canonical base is:

```text
https://prompt.next-happy.com
```
