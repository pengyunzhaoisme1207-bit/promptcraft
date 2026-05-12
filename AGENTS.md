<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## PromptCraft Product Rules

- This site is a curated prompt library, not a bulk prompt dump.
- Do not restore "1000+ prompts" marketing copy unless the public indexed set is genuinely reviewed.
- Use `readPrompts()` as the public prompt layer. It filters `data/prompts.json` through quality gates before prompts appear in search, navigation counts, static params, and sitemap.
- Keep generic placeholder prompts, duplicate examples, and thin prompt pages out of public indexing.
- When adding prompts, prefer fewer prompts with specific use cases, examples, and customization notes over large generated batches.
- Production builds must not depend on remote font fetching. The app intentionally uses system fonts.
