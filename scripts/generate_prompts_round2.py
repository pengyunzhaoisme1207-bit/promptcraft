#!/usr/bin/env python3
"""Second round: add more prompts to reach ~1000."""
import json
import sys

DATA_PATH = "/Users/jacky.peng/prompt-site/data/prompts.json"

with open(DATA_PATH) as f:
    data = json.load(f)

existing = data["prompts"]
existing_slugs = set(p["slug"] for p in existing)

new_entries = []

def add(scenario, category, title, slug, diff, tags, prompt_tmpl, when, bad, good, how, adv, related, collection):
    if slug in existing_slugs:
        return
    existing_slugs.add(slug)
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": category,
        "scenario": scenario,
        "tools": ["chatgpt", "claude", "gemini"] if scenario != "image-generation" else ["midjourney", "dall-e", "stable-diffusion"],
        "difficulty": diff,
        "tags": tags,
        "prompt": prompt_tmpl,
        "when_to_use": when,
        "bad_example": bad,
        "good_example": good,
        "how_to_customize": how,
        "advanced_version": adv,
        "related": related,
        "featured": False,
        "collection": [collection]
    })

# WRITING-EMAILS (need ~59 more)
emails2 = [
    ("Urgent Action Required Email", "urgent-action-email", "intermediate", ["email", "urgent", "business"]),
    ("Client Escalation Email", "client-escalation-email", "advanced", ["email", "escalation", "management"]),
    ("Vendor Negotiation Email", "vendor-negotiation-email", "intermediate", ["email", "negotiation", "vendor"]),
    ("Employee Recognition Email", "employee-recognition-email", "beginner", ["email", "recognition", "internal"]),
    ("Policy Change Notification Email", "policy-change-email", "intermediate", ["email", "policy", "announcement"]),
    ("Budget Request Email", "budget-request-email", "intermediate", ["email", "budget", "approval"]),
    ("Cross-Team Collaboration Email", "cross-team-collab-email", "beginner", ["email", "collaboration", "teams"]),
    ("Client Offboarding Email", "client-offboarding-email", "intermediate", ["email", "offboarding", "closure"]),
    ("Post-Project Review Email", "post-project-review-email", "beginner", ["email", "review", "feedback"]),
    ("Training Announcement Email", "training-announcement-email", "beginner", ["email", "training", "internal"]),
    ("Compliance Reminder Email", "compliance-reminder-email", "beginner", ["email", "compliance", "reminder"]),
    ("Security Incident Notification", "security-incident-email", "advanced", ["email", "security", "incident"]),
    ("Customer Satisfaction Survey Email", "csat-survey-email", "beginner", ["email", "survey", "feedback"]),
    ("Subscription Renewal Reminder", "subscription-renewal-email", "beginner", ["email", "subscription", "retention"]),
    ("Free Trial Expiration Email", "trial-expiration-email", "beginner", ["email", "trial", "conversion"]),
    ("Upgrade Recommendation Email", "upgrade-recommendation-email", "intermediate", ["email", "upsell", "growth"]),
    ("Event Follow-Up Email", "event-followup-email", "beginner", ["email", "events", "follow-up"]),
    ("Conference Networking Email", "conference-networking-email", "beginner", ["email", "networking", "events"]),
    ("Investor Update Email", "investor-update-email", "advanced", ["email", "investor", "reporting"]),
    ("Board Meeting Invitation Email", "board-meeting-invite-email", "intermediate", ["email", "board", "governance"]),
    ("Crisis Communication Email", "crisis-comm-email", "advanced", ["email", "crisis", "communication"]),
    ("Merger Announcement Email", "merger-announcement-email", "advanced", ["email", "merger", "announcement"]),
    ("Layoff Notification Email", "layoff-notification-email", "advanced", ["email", "layoff", "sensitive"]),
    ("Remote Work Policy Email", "remote-work-policy-email", "beginner", ["email", "remote", "policy"]),
    ("Office Closure Notification Email", "office-closure-email", "beginner", ["email", "closure", "notification"]),
    ("New Hire Welcome Email", "new-hire-welcome-email", "beginner", ["email", "onboarding", "welcome"]),
    ("Work Anniversary Recognition Email", "work-anniversary-email", "beginner", ["email", "recognition", "milestone"]),
    ("Promotion Announcement Email", "promotion-announcement-email", "beginner", ["email", "promotion", "announcement"]),
    ("Team Building Event Email", "team-building-email", "beginner", ["email", "team-building", "events"]),
    ("Holiday Schedule Email", "holiday-schedule-email", "beginner", ["email", "holiday", "scheduling"]),
]

for title, slug, diff, tags in emails2:
    add("writing-emails", "writing", title, slug, diff, tags,
        f"You are a professional communication expert. Write a compelling {title.lower()} that achieves its specific business objective. Include appropriate greeting, well-structured body, clear call-to-action, and professional closing. Context: [provide recipient, situation, key points, and desired outcome].",
        f"Write a professional {title.lower().replace(' email', '').replace(' notification', '')} email with the right tone and structure",
        "Write me an email about this.",
        "A well-structured email with clear purpose, appropriate tone, specific call-to-action, and professional formatting.",
        "Replace placeholders with specific details. Adjust tone based on relationship and urgency.",
        f"Write using proven communication frameworks with strategic persuasion, anticipatory answers to likely concerns, carefully crafted subject line for maximum open rate, and a compelling CTA tailored to {title.lower()}.",
        ["professional-business-email-writer", "client-follow-up-email"],
        "email-communication-pros")

# CREATIVE-WRITING (need ~20 more)
creative2 = [
    ("First Person Narrative Prompt", "first-person-narrative", "intermediate", ["creative", "narrative", "voice"]),
    ("Third Person Limited Prompt", "third-person-limited", "intermediate", ["creative", "perspective", "fiction"]),
    ("Unreliable Narrator Story", "unreliable-narrator", "advanced", ["creative", "narrative", "twist"]),
    ("Epistolary Story Prompt", "epistolary-story", "advanced", ["creative", "letters", "format"]),
    ("Stream of Consciousness Prompt", "stream-consciousness", "advanced", ["creative", "experimental", "style"]),
    ("Micro Fiction 100 Words", "micro-fiction-100", "beginner", ["creative", "short", "constraint"]),
    ("Drabble Writing Prompt (50 words)", "drabble-writing", "beginner", ["creative", "ultra-short", "constraint"]),
    ("Two-Minute Story Prompt", "two-minute-story", "beginner", ["creative", "timed", "exercise"]),
    ("Prompt Chain Story Builder", "prompt-chain-story", "intermediate", ["creative", "collaborative", "chain"]),
    ("Genre Mashup Prompt", "genre-mashup", "intermediate", ["creative", "hybrid", "innovation"]),
    ("Plot Twist Generator", "plot-twist-generator", "intermediate", ["creative", "surprise", "plot"]),
    ("Villain Origin Story", "villain-origin-story", "intermediate", ["creative", "antagonist", "backstory"]),
    ("Hero's Journey Template", "heros-journey-template", "intermediate", ["creative", "structure", "mythology"]),
    ("Save the Cat Beat Sheet", "save-the-cat-beats", "intermediate", ["creative", "screenplay", "structure"]),
    ("Worldbuilding Prompt", "worldbuilding-prompt", "intermediate", ["creative", "setting", "fantasy"]),
    ("Magic System Designer", "magic-system-designer", "advanced", ["creative", "fantasy", "rules"]),
    ("Dialogue-Only Scene Prompt", "dialogue-only-scene", "advanced", ["creative", "dialogue", "constraint"]),
    ("Silent Scene Prompt", "silent-scene", "advanced", ["creative", "show-dont-tell", "action"]),
    ("Multi-POV Story Prompt", "multi-pov-story", "advanced", ["creative", "perspectives", "narrative"]),
    ("Time Loop Story Prompt", "time-loop-story", "intermediate", ["creative", "time", "sci-fi"]),
]

for title, slug, diff, tags in creative2:
    add("creative-writing", "writing", title, slug, diff, tags,
        f"You are a creative writing coach. Help me write using {title.lower()}. [Provide genre, tone, and story elements]. Focus on strong voice, vivid imagery, and engaging narrative.",
        f"Practice {title.lower()} techniques for creative writing",
        "Write something creative.",
        "A compelling piece with strong voice, specific details, and narrative momentum.",
        "Add your genre, characters, setting, and desired emotional impact.",
        f"Write using advanced literary techniques appropriate for {title.lower()}. Include layered conflict, thematic resonance, subtext, and prose that reveals character through word choice.",
        ["story-starter-generator", "character-creator"],
        "creative-writing-toolkit")

# WRITING-BLOG-POST (need ~20 more)
blog2 = [
    ("Expert Roundup Blog Post", "expert-roundup-post", "intermediate", ["blog", "expert", "roundup"]),
    ("List Post SEO Optimized", "list-post-seo", "intermediate", ["blog", "list", "seo"]),
    ("Beginner vs Advanced Post", "beginner-vs-advanced-post", "intermediate", ["blog", "comparison", "levels"]),
    ("Tutorial with Screenshots", "tutorial-screenshots", "beginner", ["blog", "tutorial", "visual"]),
    ("Opinion Piece with Data", "opinion-with-data", "intermediate", ["blog", "opinion", "evidence"]),
    ("Contrarian Blog Post", "contrarian-post", "intermediate", ["blog", "controversial", "engagement"]),
    ("Skyscraper Content Post", "skyscraper-post", "advanced", ["blog", "comprehensive", "link-building"]),
    ("Hub Page Content", "hub-page-content", "advanced", ["blog", "pillar", "SEO"]),
    ("Seasonal Content Post", "seasonal-content-post", "beginner", ["blog", "seasonal", "timely"]),
    ("Evergreen Blog Post", "evergreen-blog-post", "beginner", ["blog", "timeless", "SEO"]),
    ("Personal Brand Blog Post", "personal-brand-post", "beginner", ["blog", "branding", "story"]),
    ("Industry Deep Dive Post", "industry-deep-dive", "advanced", ["blog", "industry", "analysis"]),
    ("Beginner Mistakes Post", "beginner-mistakes-post", "beginner", ["blog", "mistakes", "helpful"]),
    ("Tools and Resources Post", "tools-resources-post", "beginner", ["blog", "tools", "curation"]),
    ("Step-by-Step Guide Post", "step-by-step-guide-post", "intermediate", ["blog", "guide", "tutorial"]),
    ("Opinion Poll Blog Post", "opinion-poll-post", "beginner", ["blog", "engagement", "poll"]),
    ("User-Generated Content Post", "ugc-blog-post", "intermediate", ["blog", "community", "UGC"]),
    ("Behind-the-Scenes Post", "behind-scenes-blog-post", "beginner", ["blog", "transparency", "story"]),
    ("Annual Review Blog Post", "annual-review-post", "beginner", ["blog", "review", "reflection"]),
    ("Goal Setting Blog Post", "goal-setting-blog-post", "beginner", ["blog", "goals", "motivation"]),
]

for title, slug, diff, tags in blog2:
    add("writing-blog-post", "writing", title, slug, diff, tags,
        f"You are an experienced content writer and SEO expert. Write a {title.lower()} for [TARGET AUDIENCE] about [TOPIC]. Include: compelling headline, structured headings, specific examples, actionable advice, and engaging conclusion.",
        f"Create a high-quality {title.lower()} with SEO optimization",
        "Write a blog post about this.",
        "A well-structured blog post with engaging hook, clear sections, specific examples, and strong call-to-action.",
        "Fill in topic, audience, and target keywords. Add your own examples for authenticity.",
        f"Write a comprehensive {title.lower()} targeting primary and secondary keywords. Include data-backed claims, original insights, internal linking suggestions, schema markup, and a content upgrade for lead generation.",
        ["seo-blog-post-structure", "blog-post-outlines-that-rank"],
        "content-creation-essentials")

# MARKETING-COPY (need ~10 more)
marketing2 = [
    ("Black Friday Campaign Copy", "black-friday-copy", "intermediate", ["marketing", "seasonal", "sales"]),
    ("Launch Email Sequence", "launch-email-sequence", "intermediate", ["marketing", "launch", "email"]),
    ("Customer Onboarding Copy", "customer-onboarding-copy", "intermediate", ["marketing", "onboarding", "UX"]),
    ("Social Proof Page Copy", "social-proof-copy", "beginner", ["marketing", "testimonials", "trust"]),
    ("Comparison Page Copy", "comparison-page-copy", "intermediate", ["marketing", "comparison", "sales"]),
    ("Feature Launch Copy", "feature-launch-copy", "intermediate", ["marketing", "product", "announcement"]),
    ("Referral Landing Page", "referral-landing-copy", "intermediate", ["marketing", "referral", "growth"]),
    ("Waitlist Landing Page", "waitlist-landing-copy", "beginner", ["marketing", "pre-launch", "waitlist"]),
    ("Community Guidelines Copy", "community-guidelines-copy", "beginner", ["marketing", "community", "rules"]),
    ("Terms of Service Summary", "tos-summary-copy", "intermediate", ["marketing", "legal", "plain-english"]),
]

for title, slug, diff, tags in marketing2:
    add("marketing-copy", "writing", title, slug, diff, tags,
        f"You are a marketing copywriter. Write compelling {title.lower()} for [PRODUCT/SERVICE]. Target audience: [DESCRIBE]. Focus on benefits over features, use emotional triggers, and include a clear CTA.",
        f"Create conversion-focused copy for {title.lower()}",
        "Write some marketing copy.",
        "Persuasive, benefit-driven copy with clear value proposition and specific call-to-action.",
        "Replace placeholders with product details. Specify tone and target audience.",
        f"Write conversion-optimized {title.lower()} using AIDA or PAS framework with psychological triggers, social proof, objection handling, urgency element, and A/B test variation.",
        ["ad-copy-generator", "landing-page-copywriter"],
        "marketing-team-essentials")

# DATA-ANALYSIS (need ~20 more)
analysis2 = [
    ("Survey Design Helper", "survey-design-helper", "beginner", ["data", "survey", "design"]),
    ("Sample Size Calculator Helper", "sample-size-helper", "intermediate", ["data", "statistics", "planning"]),
    ("Data Visualization Code", "data-viz-code", "intermediate", ["data", "visualization", "coding"]),
    ("Report Automation Helper", "report-automation", "advanced", ["data", "automation", "reporting"]),
    ("Dashboard SQL Builder", "dashboard-sql", "intermediate", ["data", "SQL", "dashboard"]),
    ("Google Analytics Analyzer", "ga-analyzer", "intermediate", ["data", "web-analytics", "GA"]),
    ("Social Media Analytics", "social-media-analytics", "intermediate", ["data", "social", "metrics"]),
    ("Email Campaign Analyzer", "email-campaign-analyzer", "intermediate", ["data", "email", "performance"]),
    ("Website Traffic Analyzer", "traffic-analyzer", "intermediate", ["data", "web", "traffic"]),
    ("Conversion Rate Optimizer", "cro-helper", "intermediate", ["data", "CRO", "optimization"]),
    ("Customer Lifetime Value", "clv-calculator", "intermediate", ["data", "CLV", "metrics"]),
    ("CAC Analysis Helper", "cac-analysis", "intermediate", ["data", "CAC", "marketing"]),
    ("Retention Rate Analyzer", "retention-analyzer", "intermediate", ["data", "retention", "metrics"]),
    ("NPS Analysis Helper", "nps-analysis", "beginner", ["data", "NPS", "satisfaction"]),
    ("Cohort Retention Chart", "cohort-retention-chart", "intermediate", ["data", "cohort", "visualization"]),
    ("RFM Analysis Helper", "rfm-analysis", "advanced", ["data", "segmentation", "RFM"]),
    ("Attribution Model Helper", "attribution-model", "advanced", ["data", "attribution", "marketing"]),
    ("Lifetime Revenue Forecast", "revenue-forecast", "advanced", ["data", "forecasting", "revenue"]),
    ("Inventory Analysis Helper", "inventory-analysis", "intermediate", ["data", "inventory", "operations"]),
    ("Supply Chain Analysis", "supply-chain-analysis", "advanced", ["data", "supply-chain", "logistics"]),
]

for title, slug, diff, tags in analysis2:
    add("data-analysis", "analysis", title, slug, diff, tags,
        f"You are an expert data analyst. Help me with {title.lower()}. [Provide data and context]. Analyze carefully and present clear, actionable insights with supporting numbers.",
        f"Get professional analysis for {title.lower()}",
        "Look at this data.",
        "Structured analysis with findings, metrics, trends, and recommendations.",
        "Provide dataset details and what question you're answering.",
        f"Perform comprehensive {title.lower()} with statistical rigor, significance testing, visual recommendations, and stakeholder summary.",
        ["sales-data-analyzer", "monthly-report-writer"],
        "data-analysis-essentials")

# IMAGE-GENERATION (need ~10 more)
image2 = [
    ("NFT Art Generator", "nft-art-generator", "intermediate", ["image", "NFT", "crypto-art"]),
    ("UI Mockup Generator", "ui-mockup-image", "intermediate", ["image", "UI", "mockup"]),
    ("Email Template Design", "email-template-design", "beginner", ["image", "email", "design"]),
    ("Social Media Banner", "social-media-banner", "beginner", ["image", "social", "banner"]),
    ("Presentation Slide Design", "slide-design", "beginner", ["image", "presentation", "slide"]),
    ("Resume Design Template", "resume-design-image", "beginner", ["image", "resume", "design"]),
    ("Certificate Design", "certificate-design", "beginner", ["image", "certificate", "print"]),
    ("Meme Generator Prompt", "meme-generator-prompt", "beginner", ["image", "meme", "humor"]),
    ("GIF Frame Generator", "gif-frame-generator", "intermediate", ["image", "animation", "GIF"]),
    ("Thumbnails A/B Set", "thumbnails-ab-set", "intermediate", ["image", "thumbnails", "testing"]),
]

for title, slug, diff, tags in image2:
    add("image-generation", "image", title, slug, diff, tags,
        f"Generate a professional {title.lower()}. Style: [SPECIFY]. Subject: [DESCRIBE]. Composition: [DESCRIBE]. Lighting and color: [SPECIFY]. --ar 16:9 --v 6",
        f"Create AI-generated imagery for {title.lower()}",
        "Make a nice image.",
        "Detailed visual description with style, composition, lighting, and technical parameters.",
        "Add specific visual requirements and reference styles.",
        f"Create highly detailed {title.lower()} with professional composition, specified lighting, color grading, and platform-specific parameters.",
        ["midjourney-photography-prompt", "dall-e-illustration-prompt"],
        "midjourney-photography")

# CODING-HELP (need ~10 more)
coding2 = [
    ("Lambda Function Helper", "lambda-function-helper", "intermediate", ["coding", "serverless", "cloud"]),
    ("Event-Driven Architecture", "event-driven-arch", "advanced", ["coding", "architecture", "events"]),
    ("Message Queue Setup", "message-queue-setup", "intermediate", ["coding", "messaging", "async"]),
    ("Cron Job Scheduler", "cron-scheduler", "intermediate", ["coding", "scheduling", "automation"]),
    ("Health Check Endpoint", "health-check-endpoint", "intermediate", ["coding", "monitoring", "API"]),
    ("Graceful Shutdown Handler", "graceful-shutdown", "advanced", ["coding", "reliability", "shutdown"]),
    ("Input Sanitizer", "input-sanitizer", "intermediate", ["coding", "security", "validation"]),
    ("API Versioning Helper", "api-versioning", "intermediate", ["coding", "API", "versioning"]),
    ("Feature Flag System", "feature-flag-system", "intermediate", ["coding", "features", "deployment"]),
    ("Dark Mode Implementation", "dark-mode-impl", "intermediate", ["coding", "UI", "theme"]),
]

for title, slug, diff, tags in coding2:
    add("coding-help", "coding", title, slug, diff, tags,
        f"You are a senior engineer. Help me implement {title.lower()}. [Provide language, framework, and requirements]. Write production-ready code with error handling, tests, and documentation.",
        f"Get expert coding help for {title.lower()}",
        "Write code for this.",
        "Clean, well-documented code with error handling, type safety, and comments.",
        "Specify language, framework, and exact requirements.",
        f"Implement {title.lower()} with production quality: error handling, input validation, type safety, unit tests, performance considerations, edge cases, and inline docs.",
        ["code-bug-fixer", "code-review-helper"],
        "developer-productivity-pack")

# LEARNING-NEW-TOPIC (need ~10 more)
learning2 = [
    ("Spaced Repetition Scheduler", "spaced-repetition", "beginner", ["learning", "memory", "retention"]),
    ("Active Recall Generator", "active-recall", "intermediate", ["learning", "testing", "memory"]),
    ("Feynman Technique Helper", "feynman-technique", "intermediate", ["learning", "simplification", "understanding"]),
    ("Pomodoro Study Planner", "pomodoro-planner", "beginner", ["learning", "time", "focus"]),
    ("Bloom's Taxonomy Helper", "blooms-taxonomy", "intermediate", ["learning", "cognitive", "levels"]),
    ("Learning Style Advisor", "learning-style", "beginner", ["learning", "styles", "personalization"]),
    ("Knowledge Gap Analyzer", "knowledge-gap", "intermediate", ["learning", "assessment", "gaps"]),
    ("Certification Exam Prep", "certification-prep", "intermediate", ["learning", "certification", "exam"]),
    ("Study Group Facilitator", "study-group", "beginner", ["learning", "collaboration", "group"]),
    ("Learning Journal Prompt", "learning-journal", "beginner", ["learning", "reflection", "journaling"]),
]

for title, slug, diff, tags in learning2:
    add("learning-new-topic", "guide", title, slug, diff, tags,
        f"You are a patient educator. Help me with {title.lower()}. Topic: [SPECIFY]. Level: [LEVEL]. Explain clearly with examples and build from foundations.",
        f"Learn with {title.lower()}",
        "Teach me this.",
        "Clear, structured explanation with examples appropriate for the learner's level.",
        "Specify topic, level, and learning goal.",
        f"Comprehensive learning experience for {title.lower()} with foundations, progression, examples, exercises, solutions, and next topics.",
        ["topic-study-plan", "concept-explainer"],
        "learning-accelerator-kit")

# PRODUCTIVITY-TASKS (need ~10 more)
productivity2 = [
    ("Email Template Library Builder", "email-template-library", "beginner", ["productivity", "email", "templates"]),
    ("Knowledge Base Organizer", "knowledge-base-org", "intermediate", ["productivity", "organization", "KB"]),
    ("Document Template Creator", "doc-template-creator", "beginner", ["productivity", "templates", "docs"]),
    ("Weekly Planning Session", "weekly-planning-session", "beginner", ["productivity", "planning", "weekly"]),
    ("Monthly Goal Review", "monthly-goal-review", "beginner", ["productivity", "review", "goals"]),
    ("Energy Level Tracker", "energy-tracker", "beginner", ["productivity", "energy", "wellness"]),
    ("Distraction Blocker Plan", "distraction-blocker-plan", "beginner", ["productivity", "focus", "habits"]),
    ("Batch Processing Planner", "batch-processing-planner", "intermediate", ["productivity", "efficiency", "batching"]),
    ("Meeting Cost Calculator", "meeting-cost-calculator", "intermediate", ["productivity", "meetings", "cost"]),
    ("Decision Fatigue Reducer", "decision-fatigue-reducer", "intermediate", ["productivity", "decisions", "routines"]),
]

for title, slug, diff, tags in productivity2:
    add("productivity-tasks", "productivity", title, slug, diff, tags,
        f"You are a productivity coach. Help me with {title.lower()}. [Provide context and goals]. Create actionable, practical framework I can implement immediately.",
        f"Improve productivity with {title.lower()}",
        "Help me be productive.",
        "Specific, actionable framework with clear steps and measurable outcomes.",
        "Provide your situation, goals, and constraints.",
        f"Comprehensive {title.lower()} system with current state analysis, action steps, timelines, success criteria, and review cadence.",
        ["meeting-summarizer", "task-prioritizer"],
        "productivity-power-pack")

# BUSINESS-PLANNING (need ~10 more)
business2 = [
    ("Unit Economics Analyzer", "unit-economics", "intermediate", ["business", "finance", "unit-economics"]),
    ("Burn Rate Calculator", "burn-rate-calculator", "intermediate", ["business", "startup", "finance"]),
    ("Runway Planner", "runway-planner", "intermediate", ["business", "startup", "cash"]),
    ("Cap Table Helper", "cap-table-helper", "advanced", ["business", "equity", "startup"]),
    ("Term Sheet Analyzer", "term-sheet-analyzer", "advanced", ["business", "investment", "legal"]),
    ("Due Diligence Checklist", "due-diligence-checklist", "advanced", ["business", "M&A", "legal"]),
    ("Franchise Model Planner", "franchise-model", "advanced", ["business", "franchise", "scaling"]),
    ("Subscription Model Planner", "subscription-model-planner", "intermediate", ["business", "SaaS", "recurring"]),
    ("Freemium Strategy Helper", "freemium-strategy", "intermediate", ["business", "pricing", "growth"]),
    ("Channel Partner Strategy", "channel-partner-strategy", "advanced", ["business", "partnerships", "distribution"]),
]

for title, slug, diff, tags in business2:
    add("business-planning", "business", title, slug, diff, tags,
        f"You are a business strategist. Help me with {title.lower()}. [Provide context]. Create structured, actionable analysis with specific recommendations.",
        f"Get strategic analysis for {title.lower()}",
        "Analyze this business.",
        "Structured analysis with data-driven insights and actionable recommendations.",
        "Provide industry, company details, and specific questions.",
        f"Comprehensive {title.lower()} using established frameworks with detailed analysis, prioritized recommendations, implementation roadmap, risk assessment, and KPIs.",
        ["startup-business-plan", "business-model-canvas-template"],
        "business-strategy-toolkit")

# RESUME-COVER-LETTER (need ~10 more)
resume2 = [
    ("Resume Volunteer Experience", "resume-volunteer", "beginner", ["resume", "volunteer", "experience"]),
    ("Resume Side Projects", "resume-side-projects", "beginner", ["resume", "projects", "portfolio"]),
    ("Resume Publications Section", "resume-publications", "intermediate", ["resume", "academic", "publications"]),
    ("Resume Certifications", "resume-certifications", "beginner", ["resume", "certifications", "credentials"]),
    ("Resume Awards Section", "resume-awards", "beginner", ["resume", "achievements", "recognition"]),
    ("Resume Languages Section", "resume-languages", "beginner", ["resume", "languages", "skills"]),
    ("Career Transition Resume", "career-transition-resume", "intermediate", ["resume", "transition", "pivot"]),
    ("Return-to-Work Resume", "return-to-work-resume", "intermediate", ["resume", "gap", "return"]),
    ("Dual-Career Resume", "dual-career-resume", "intermediate", ["resume", "multiple", "careers"]),
    ("Executive Resume Writer", "executive-resume-writer", "advanced", ["resume", "executive", "leadership"]),
]

for title, slug, diff, tags in resume2:
    add("resume-cover-letter", "writing", title, slug, diff, tags,
        f"You are a career coach. Help me with {title.lower()}. [Provide background and target role]. Write professionally with quantified achievements.",
        f"Create career documents for {title.lower()}",
        "Write my resume.",
        "Tailored, achievement-focused document with quantified results and strong action verbs.",
        "Provide background, achievements with metrics, and target role.",
        f"As a career coach, create compelling {title.lower()} optimized for target role with achievement-oriented language, industry keywords, and differentiation points.",
        ["resume-optimizer", "cover-letter-writer"],
        "career-boost-bundle")

print(f"Total new entries: {len(new_entries)}")
print(f"Total after merge: {len(existing) + len(new_entries)}")

data["prompts"].extend(new_entries)

# Verify
all_slugs = [p["slug"] for p in data["prompts"]]
if len(all_slugs) != len(set(all_slugs)):
    dupes = [s for s in all_slugs if all_slugs.count(s) > 1]
    print(f"WARNING: Duplicate slugs: {set(dupes)}")
    sys.exit(1)

with open(DATA_PATH, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

from collections import Counter
scenarios = Counter(p["scenario"] for p in data["prompts"])
print(f"\nDone! {len(data['prompts'])} total prompts.")
print("\nDistribution:")
for s, c in scenarios.most_common():
    print(f"  {s}: {c}")
