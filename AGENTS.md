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

## Prompt Quality Review Checklist

Before adding a new prompt to `data/prompts.json`, verify ALL of the following:

1. **Clear target** — The prompt has a specific use case and audience. Vague "Help me with X" prompts are rejected.
2. **No placeholders** — Prompt text must not contain `[SPECIFIC TASK based on prompt title]` or similar template markers.
3. **Complete fields** — All required fields are filled: `prompt`, `when_to_use`, `good_example`, `bad_example`, `how_to_customize`.
4. **Specific examples** — `good_example` and `bad_example` show concrete, realistic content, not generic placeholders.
5. **RTF structure (preferred)** — When adding high-quality prompts, include `role`, `task`, and `format` fields for the structured view.
6. **No duplicates** — Check existing prompts by scenario to avoid redundancy.
7. **Scenario cap respected** — Each scenario is limited to 25 published prompts. If at cap, improve existing prompts rather than adding new ones.
8. **Language consistency** — All public-facing text in English. Use `{{variable}}` syntax for user input placeholders, not `[VARIABLE]`.
