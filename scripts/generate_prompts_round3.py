#!/usr/bin/env python3
"""Round 3: Top up to 1000+."""
import json
from collections import Counter

DATA_PATH = "/Users/jacky.peng/prompt-site/data/prompts.json"

with open(DATA_PATH) as f:
    data = json.load(f)

existing = data["prompts"]
existing_slugs = set(p["slug"] for p in existing)

new_entries = []

def add(scenario, category, title, slug, diff, tags):
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
        "prompt": f"You are an expert. Help me with {title.lower()}. [Provide context and requirements]. Deliver professional, actionable results.",
        "when_to_use": f"Get expert assistance for {title.lower()}",
        "bad_example": "Do this for me.",
        "good_example": "A professional, well-structured result with clear sections, specific details, and actionable guidance.",
        "how_to_customize": "Replace placeholders with your specific details and context.",
        "advanced_version": f"As a senior expert, deliver a comprehensive {title.lower()} with advanced techniques, specific examples, best practices, common pitfalls to avoid, and optimization recommendations. Context: [DETAILS].",
        "related": ["professional-business-email-writer"],
        "featured": False,
        "collection": ["email-communication-pros"]
    })

# Fill gaps to reach 1000+ (~20 per scenario)
extras = [
    # writing-emails (71 -> ~90)
    ("writing-emails", "writing", "Board Resolution Email", "board-resolution-email", "advanced", ["email", "board", "formal"]),
    ("writing-emails", "writing", "Merger Approval Email", "merger-approval-email", "advanced", ["email", "merger", "approval"]),
    ("writing-emails", "writing", "Compliance Training Reminder", "compliance-training-email", "beginner", ["email", "compliance", "training"]),
    ("writing-emails", "writing", "Customer Churn Analysis Email", "churn-analysis-email", "intermediate", ["email", "churn", "analysis"]),
    ("writing-emails", "writing", "Quarterly Business Review Invite", "qbr-invite-email", "intermediate", ["email", "QBR", "review"]),
    ("writing-emails", "writing", "Customer Advisory Board Invite", "cab-invite-email", "advanced", ["email", "advisory", "customer"]),
    ("writing-emails", "writing", "Product Beta Tester Invite", "beta-tester-invite-email", "beginner", ["email", "beta", "testing"]),
    ("writing-emails", "writing", "NDA Request Email", "nda-request-email", "intermediate", ["email", "NDA", "legal"]),
    ("writing-emails", "writing", "Data Breach Notification Email", "data-breach-email", "advanced", ["email", "security", "breach"]),
    ("writing-emails", "writing", "Customer Appreciation Email", "customer-appreciation-email", "beginner", ["email", "appreciation", "loyalty"]),
    ("writing-emails", "writing", "Partnership Termination Email", "partnership-termination-email", "advanced", ["email", "termination", "partnership"]),
    ("writing-emails", "writing", "Vendor Performance Review Email", "vendor-review-email", "intermediate", ["email", "vendor", "performance"]),
    ("writing-emails", "writing", "Customer Refund Notification", "refund-notification-email", "intermediate", ["email", "refund", "notification"]),
    ("writing-emails", "writing", "Team Milestone Celebration Email", "milestone-celebration-email", "beginner", ["email", "celebration", "team"]),
    ("writing-emails", "writing", "Year-End Summary Email", "year-end-summary-email", "beginner", ["email", "year-end", "summary"]),
    ("writing-emails", "writing", "Customer Feedback Loop Email", "feedback-loop-email", "beginner", ["email", "feedback", "loop"]),
    ("writing-emails", "writing", "Strategic Partnership Proposal Email", "strategic-partnership-email", "advanced", ["email", "strategic", "partnership"]),
    ("writing-emails", "writing", "Customer Onboarding Completion Email", "onboarding-complete-email", "beginner", ["email", "onboarding", "completion"]),
    ("writing-emails", "writing", "Executive Transition Email", "executive-transition-email", "advanced", ["email", "executive", "transition"]),
    # image-generation (110 -> ~130)
    ("image-generation", "image", "Holiday Card Design", "holiday-card-design", "beginner", ["image", "holiday", "card"]),
    ("image-generation", "image", "Wedding Invitation Design", "wedding-invitation-image", "intermediate", ["image", "wedding", "invitation"]),
    ("image-generation", "image", "Birth Announcement", "birth-announcement-image", "beginner", ["image", "baby", "announcement"]),
    ("image-generation", "image", "Sports Action Photo", "sports-action-photo", "intermediate", ["image", "sports", "action"]),
    ("image-generation", "image", "Pet Portrait Style", "pet-portrait-style", "beginner", ["image", "pet", "portrait"]),
    ("image-generation", "image", "Graduation Photo Style", "graduation-photo-style", "beginner", ["image", "graduation", "celebration"]),
    ("image-generation", "image", "Concert Poster Design", "concert-poster-design", "intermediate", ["image", "concert", "poster"]),
    ("image-generation", "image", "Magazine Cover Style", "magazine-cover-style", "intermediate", ["image", "magazine", "cover"]),
    ("image-generation", "image", "Infographic Illustration", "infographic-illustration", "intermediate", ["image", "infographic", "illustration"]),
    ("image-generation", "image", "Mascot Design", "mascot-design", "intermediate", ["image", "mascot", "branding"]),
    ("image-generation", "image", "Sticker Pack Design", "sticker-pack-design", "beginner", ["image", "sticker", "design"]),
    ("image-generation", "image", "Tattoo Design Concept", "tattoo-design-concept", "intermediate", ["image", "tattoo", "art"]),
    ("image-generation", "image", "Greeting Card Art", "greeting-card-art", "beginner", ["image", "greeting", "card"]),
    ("image-generation", "image", "Calendar Page Design", "calendar-page-design", "beginner", ["image", "calendar", "monthly"]),
    ("image-generation", "image", "Menu Card Design", "menu-card-design", "beginner", ["image", "menu", "restaurant"]),
    ("image-generation", "image", "Recipe Card Illustration", "recipe-card-illustration", "beginner", ["image", "recipe", "illustration"]),
    ("image-generation", "image", "Board Game Art", "board-game-art", "intermediate", ["image", "board-game", "illustration"]),
    ("image-generation", "image", "Trading Card Design", "trading-card-design", "intermediate", ["image", "trading-card", "collectible"]),
    ("image-generation", "image", "Comic Book Panel", "comic-book-panel", "intermediate", ["image", "comic", "panel"]),
    ("image-generation", "image", "Storyboard Sequence", "storyboard-sequence", "intermediate", ["image", "storyboard", "sequence"]),
    # creative-writing (89 -> ~105)
    ("creative-writing", "writing", "Alternate History Prompt", "alternate-history-prompt", "intermediate", ["creative", "history", "what-if"]),
    ("creative-writing", "writing", "Cli-Fi (Climate Fiction) Prompt", "cli-fi-prompt", "intermediate", ["creative", "climate", "fiction"]),
    ("creative-writing", "writing", "Solarpunk Story Prompt", "solarpunk-story", "intermediate", ["creative", "solarpunk", "optimistic"]),
    ("creative-writing", "writing", "Cozy Mystery Prompt", "cozy-mystery-prompt", "beginner", ["creative", "mystery", "cozy"]),
    ("creative-writing", "writing", "Space Opera Prompt", "space-opera-prompt", "intermediate", ["creative", "space", "epic"]),
    ("creative-writing", "writing", "Urban Fantasy Prompt", "urban-fantasy-prompt", "intermediate", ["creative", "urban", "fantasy"]),
    ("creative-writing", "writing", "Southern Gothic Prompt", "southern-gothic-prompt", "advanced", ["creative", "gothic", "regional"]),
    ("creative-writing", "writing", "Magical Realism Prompt", "magical-realism-prompt", "advanced", ["creative", "magical", "realism"]),
    ("creative-writing", "writing", "Satire Writing Prompt", "satire-writing-prompt", "intermediate", ["creative", "satire", "humor"]),
    ("creative-writing", "writing", "Flash Nonfiction Prompt", "flash-nonfiction-prompt", "intermediate", ["creative", "nonfiction", "short"]),
    ("creative-writing", "writing", "Haiku Sequence Prompt", "haiku-sequence", "beginner", ["creative", "poetry", "haiku"]),
    ("creative-writing", "writing", "Spoken Word Poetry Prompt", "spoken-word-poetry", "intermediate", ["creative", "spoken-word", "performance"]),
    ("creative-writing", "writing", "Flash Drama Prompt", "flash-drama-prompt", "intermediate", ["creative", "drama", "short"]),
    ("creative-writing", "writing", "Letter Format Story", "letter-format-story", "intermediate", ["creative", "epistolary", "letter"]),
    ("creative-writing", "writing", "Found Fiction Prompt", "found-fiction-prompt", "advanced", ["creative", "found", "experimental"]),
    ("creative-writing", "writing", "Erasure Poetry Prompt", "erasure-poetry-prompt", "advanced", ["creative", "erasure", "poetry"]),
    # productivity-tasks (80 -> ~95)
    ("productivity-tasks", "productivity", "Reading List Prioritizer", "reading-list-prioritizer", "beginner", ["productivity", "reading", "prioritization"]),
    ("productivity-tasks", "productivity", "Information Diet Planner", "information-diet-planner", "beginner", ["productivity", "information", "consumption"]),
    ("productivity-tasks", "productivity", "Digital Declutter Plan", "digital-declutter-plan", "beginner", ["productivity", "digital", "organization"]),
    ("productivity-tasks", "productivity", "Subscription Audit Helper", "subscription-audit-helper", "beginner", ["productivity", "subscription", "cost"]),
    ("productivity-tasks", "productivity", "Contact Management Helper", "contact-management-helper", "beginner", ["productivity", "contacts", "CRM"]),
    ("productivity-tasks", "productivity", "Password Audit Helper", "password-audit-helper", "beginner", ["productivity", "security", "passwords"]),
    ("productivity-tasks", "productivity", "File Naming Convention", "file-naming-convention", "beginner", ["productivity", "files", "organization"]),
    ("productivity-tasks", "productivity", "Bookmark Organizer", "bookmark-organizer", "beginner", ["productivity", "bookmarks", "curation"]),
    ("productivity-tasks", "productivity", "Learning Schedule Builder", "learning-schedule-builder", "beginner", ["productivity", "learning", "scheduling"]),
    ("productivity-tasks", "productivity", "Personal Finance Tracker", "personal-finance-tracker-prompt", "intermediate", ["productivity", "finance", "tracking"]),
    ("productivity-tasks", "productivity", "Travel Planning Helper", "travel-planning-helper", "beginner", ["productivity", "travel", "planning"]),
    ("productivity-tasks", "productivity", "Meal Planning Helper", "meal-planning-helper", "beginner", ["productivity", "meal", "planning"]),
    ("productivity-tasks", "productivity", "Workout Plan Generator", "workout-plan-generator", "beginner", ["productivity", "fitness", "planning"]),
    ("productivity-tasks", "productivity", "Sleep Optimization Helper", "sleep-optimization-helper", "beginner", ["productivity", "sleep", "health"]),
    ("productivity-tasks", "productivity", "Mindfulness Routine Builder", "mindfulness-routine-builder", "beginner", ["productivity", "mindfulness", "routine"]),
    # business-planning (77 -> ~90)
    ("business-planning", "business", "Employee Engagement Survey", "employee-engagement-survey", "intermediate", ["business", "HR", "engagement"]),
    ("business-planning", "business", "Company Culture Assessment", "culture-assessment", "intermediate", ["business", "culture", "assessment"]),
    ("business-planning", "business", "Diversity and Inclusion Plan", "diversity-inclusion-plan", "advanced", ["business", "DEI", "strategy"]),
    ("business-planning", "business", "Remote Work Policy Doc", "remote-work-policy-doc", "intermediate", ["business", "remote", "policy"]),
    ("business-planning", "business", "Hybrid Work Model Planner", "hybrid-work-model", "intermediate", ["business", "hybrid", "workplace"]),
    ("business-planning", "business", "Employee Handbook Section", "employee-handbook-section", "intermediate", ["business", "handbook", "HR"]),
    ("business-planning", "business", "Code of Conduct Writer", "code-of-conduct-writer", "intermediate", ["business", "ethics", "conduct"]),
    ("business-planning", "business", "CSR Strategy Planner", "csr-strategy-planner", "advanced", ["business", "CSR", "sustainability"]),
    ("business-planning", "business", "ESG Report Writer", "esg-report-writer", "advanced", ["business", "ESG", "reporting"]),
    ("business-planning", "business", "Succession Plan Document", "succession-plan-doc", "advanced", ["business", "succession", "leadership"]),
    ("business-planning", "business", "Knowledge Transfer Plan", "knowledge-transfer-plan", "intermediate", ["business", "knowledge", "transfer"]),
    ("business-planning", "business", "Internal Communication Plan", "internal-comm-plan", "intermediate", ["business", "communication", "internal"]),
    ("business-planning", "business", "Crisis Management Plan", "crisis-management-plan", "advanced", ["business", "crisis", "planning"]),
    # learning-new-topic (89 -> ~100)
    ("learning-new-topic", "guide", "Blockchain Concept Explainer", "blockchain-explainer", "intermediate", ["learning", "blockchain", "crypto"]),
    ("learning-new-topic", "guide", "Quantum Computing Explainer", "quantum-computing-explainer", "advanced", ["learning", "quantum", "computing"]),
    ("learning-new-topic", "guide", "Generative AI Explainer", "generative-ai-explainer", "intermediate", ["learning", "AI", "generative"]),
    ("learning-new-topic", "guide", "Web3 Concept Explainer", "web3-explainer", "intermediate", ["learning", "web3", "decentralization"]),
    ("learning-new-topic", "guide", "IoT Concept Explainer", "iot-explainer", "intermediate", ["learning", "IoT", "connected"]),
    ("learning-new-topic", "guide", "Edge Computing Explainer", "edge-computing-explainer", "advanced", ["learning", "edge", "computing"]),
    ("learning-new-topic", "guide", "DevOps Concept Explainer", "devops-explainer", "intermediate", ["learning", "DevOps", "practices"]),
    ("learning-new-topic", "guide", "Agile Methodology Explainer", "agile-methodology-explainer", "intermediate", ["learning", "agile", "methodology"]),
    ("learning-new-topic", "guide", "Game Theory Explainer", "game-theory-explainer", "intermediate", ["learning", "game-theory", "strategy"]),
    ("learning-new-topic", "guide", "Behavioral Economics Explainer", "behavioral-economics-explainer", "intermediate", ["learning", "behavioral", "economics"]),
    ("learning-new-topic", "guide", "Cognitive Bias Explainer", "cognitive-bias-explainer", "beginner", ["learning", "bias", "psychology"]),
    # coding-help (114 -> ~125)
    ("coding-help", "coding", "Rate Limiting Middleware", "rate-limiting-middleware", "intermediate", ["coding", "middleware", "rate-limit"]),
    ("coding-help", "coding", "CSRF Protection Helper", "csrf-protection-helper", "intermediate", ["coding", "security", "CSRF"]),
    ("coding-help", "coding", "XSS Prevention Helper", "xss-prevention-helper", "intermediate", ["coding", "security", "XSS"]),
    ("coding-help", "coding", "SQL Injection Prevention", "sql-injection-prevention", "intermediate", ["coding", "security", "SQLi"]),
    ("coding-help", "coding", "API Key Management", "api-key-management", "intermediate", ["coding", "security", "keys"]),
    ("coding-help", "coding", "Secret Rotation Helper", "secret-rotation-helper", "advanced", ["coding", "security", "secrets"]),
    ("coding-help", "coding", "Audit Log Implementation", "audit-log-impl", "intermediate", ["coding", "logging", "compliance"]),
    ("coding-help", "coding", "Data Retention Policy Code", "data-retention-code", "intermediate", ["coding", "compliance", "retention"]),
    ("coding-help", "coding", "GDPR Compliance Helper", "gdpr-compliance-code", "advanced", ["coding", "GDPR", "privacy"]),
    ("coding-help", "coding", "Accessibility Audit Helper", "a11y-audit-helper", "intermediate", ["coding", "accessibility", "a11y"]),
    ("coding-help", "coding", "Lighthouse Score Improver", "lighthouse-improver", "intermediate", ["coding", "performance", "Lighthouse"]),
    # data-analysis (74 -> ~85)
    ("data-analysis", "analysis", "Cohort Revenue Analysis", "cohort-revenue-analysis", "advanced", ["data", "cohort", "revenue"]),
    ("data-analysis", "analysis", "Product Usage Analytics", "product-usage-analytics", "intermediate", ["data", "product", "usage"]),
    ("data-analysis", "analysis", "Customer Journey Analysis", "customer-journey-analysis", "intermediate", ["data", "journey", "analytics"]),
    ("data-analysis", "analysis", "Content Performance Analysis", "content-performance-analysis", "intermediate", ["data", "content", "performance"]),
    ("data-analysis", "analysis", "SEO Performance Analysis", "seo-performance-analysis", "intermediate", ["data", "SEO", "performance"]),
    ("data-analysis", "analysis", "Ad Spend ROI Analysis", "ad-spend-roi-analysis", "intermediate", ["data", "ROI", "advertising"]),
    ("data-analysis", "analysis", "Pricing Elasticity Analysis", "pricing-elasticity-analysis", "advanced", ["data", "pricing", "elasticity"]),
    ("data-analysis", "analysis", "Geographic Analysis", "geographic-analysis", "intermediate", ["data", "geography", "regional"]),
    ("data-analysis", "analysis", "Seasonal Trend Analysis", "seasonal-trend-analysis", "intermediate", ["data", "seasonal", "trends"]),
    ("data-analysis", "analysis", "Predictive Churn Model", "predictive-churn-model", "advanced", ["data", "churn", "prediction"]),
    ("data-analysis", "analysis", "Demand Forecasting", "demand-forecasting", "advanced", ["data", "demand", "forecast"]),
    # resume-cover-letter (75 -> ~85)
    ("resume-cover-letter", "writing", "LinkedIn Recommendations Text", "linkedin-recommendations-text", "beginner", ["resume", "LinkedIn", "recommendation"]),
    ("resume-cover-letter", "writing", "Personal Website About Page", "personal-website-about", "beginner", ["resume", "website", "bio"]),
    ("resume-cover-letter", "writing", "Twitter/X Bio Writer", "twitter-bio-writer", "beginner", ["resume", "Twitter", "bio"]),
    ("resume-cover-letter", "writing", "GitHub Profile README", "github-profile-readme", "beginner", ["resume", "GitHub", "developer"]),
    ("resume-cover-letter", "writing", "Speaker Bio Writer", "speaker-bio-writer", "beginner", ["resume", "speaker", "bio"]),
    ("resume-cover-letter", "writing", "Press Kit Bio", "press-kit-bio", "beginner", ["resume", "press", "bio"]),
    ("resume-cover-letter", "writing", "Conference Proposal Bio", "conference-proposal-bio", "intermediate", ["resume", "conference", "proposal"]),
    ("resume-cover-letter", "writing", "Grant Application Bio", "grant-application-bio", "intermediate", ["resume", "grant", "application"]),
    ("resume-cover-letter", "writing", "Scholarship Application Essay", "scholarship-essay", "intermediate", ["resume", "scholarship", "essay"]),
    ("resume-cover-letter", "writing", "Resignation Letter Writer", "resignation-letter-writer", "beginner", ["resume", "resignation", "letter"]),
]

for scenario, category, title, slug, diff, tags in extras:
    add(scenario, category, title, slug, diff, tags)

print(f"Total new: {len(new_entries)}")
print(f"Total: {len(existing) + len(new_entries)}")

data["prompts"].extend(new_entries)

# Verify
all_slugs = [p["slug"] for p in data["prompts"]]
if len(all_slugs) != len(set(all_slugs)):
    dupes = [s for s in all_slugs if all_slugs.count(s) > 1]
    print(f"WARNING: Duplicate slugs: {set(dupes)}")

with open(DATA_PATH, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

scenarios = Counter(p["scenario"] for p in data["prompts"])
print(f"\nDone! {len(data['prompts'])} total prompts.")
print("\nDistribution:")
for s, c in scenarios.most_common():
    print(f"  {s}: {c}")
