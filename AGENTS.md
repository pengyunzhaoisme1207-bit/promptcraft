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

## Mandatory Agent Startup Protocol

Claude Code, Codex, or any other Agent must do this before changing code:

1. Read this `AGENTS.md` fully.
2. Read `README.md`.
3. Read the Product Factory guidance:
   - `/Users/jacky.peng/Obsidian/产品制造工厂/仓库最高指导思想指南/README.md`
   - `/Users/jacky.peng/Obsidian/产品制造工厂/仓库最高指导思想指南/05-独立站矩阵建站标准.md`
   - `/Users/jacky.peng/Obsidian/产品制造工厂/仓库最高指导思想指南/06-SEO-AdSense-变现标准.md`
4. State back which files were read before starting implementation.
5. Check current git status before editing.

Recommended user startup prompt for Claude Code:

```text
You are working in /Users/jacky.peng/prompt-site.
Before editing, read AGENTS.md, README.md, and the Product Factory guidance under:
/Users/jacky.peng/Obsidian/产品制造工厂/仓库最高指导思想指南/

You must follow the mandatory startup protocol, then complete the task.
Before commit or push, output a self-check report covering:
SEO, AdSense, content quality, performance, build/lint, sitemap/robots, and remaining risks.
Do not push if lint/build fail or if the self-check finds unresolved blocking issues.
```

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

## Pre-Push Self-Check Gate

An Agent must not commit or push until it has checked and reported all items below.

### Product and Content

- The site is still positioned as a curated prompt library, not a bulk directory.
- No public copy claims "1000+ prompts" unless every indexed prompt is reviewed.
- New or changed prompts pass the Prompt Quality Review Checklist.
- Sitemap does not include low-quality, placeholder, duplicate, or thin prompt pages.

### SEO

- Important pages have one clear H1.
- Metadata includes title, description, and canonical URL.
- Open Graph and Twitter metadata are present for indexable pages.
- JSON-LD is present where appropriate:
  - `WebSite` for the site.
  - `CreativeWork` and `BreadcrumbList` for prompt detail pages.
  - `Article` for guide pages.
- `robots.txt` points to the correct production sitemap.
- `sitemap.xml` uses `https://prompt.next-happy.com`.

### AdSense

- The global AdSense script remains present:
  `ca-pub-7338826858147459`.
- Do not render fake dashed advertisement boxes.
- Do not create manual `<ins class="adsbygoogle">` units unless real numeric `data-ad-slot` IDs are available.
- If using Auto Ads only, the `AdSlot` component should not show visible placeholder UI.

### Performance

- Homepage must not serialize full prompt records to the client.
- Search should use a light index or an API, not full prompt bodies, advanced versions, RTF fields, or related arrays.
- Avoid remote build dependencies such as `next/font/google`.
- If homepage HTML or RSC payload becomes unusually large, explain why and reduce it before pushing.

### Verification Commands

Run these before finishing:

```bash
npm run lint
npm run build
git diff --stat
git status --short
```

If a command cannot be run, the final report must say why.

## Required Final Report Format

Every Agent must finish with this report:

```text
Read first:
- [files read]

Changed:
- [files changed and why]

Self-check:
- SEO: pass/fail + notes
- AdSense: pass/fail + notes
- Content quality: pass/fail + notes
- Performance: pass/fail + notes
- Build/lint: pass/fail + command results

Remaining risks:
- [risks or "none known"]

Ready to push:
- yes/no
```
