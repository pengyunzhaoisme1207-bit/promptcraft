#!/usr/bin/env python3
"""Generate additional prompts to reach 1000 total, based on existing templates."""
import json
import random
import re
import sys

DATA_PATH = "/Users/jacky.peng/prompt-site/data/prompts.json"

with open(DATA_PATH) as f:
    data = json.load(f)

existing = data["prompts"]
existing_slugs = set(p["slug"] for p in existing)

print(f"Existing prompts: {len(existing)}")

# Scenario templates to generate from
# Each entry: (scenario, category, topic_title, prompt_template, when_to_use, bad, good, how_to, advanced, difficulty, tools, tags)
new_entries = []

# ===== WRITING-EMAILS (target: ~100, currently 18, need ~82) =====
email_topics = [
    ("Cold Outreach Email", "cold-outreach-email", "sales prospecting", "beginner"),
    ("Sales Pitch Email", "sales-pitch-email", "persuasive sales messaging", "intermediate"),
    ("Partnership Proposal Email", "partnership-proposal-email", "business partnerships", "intermediate"),
    ("Job Application Email", "job-application-email", "job seeking", "beginner"),
    ("Resignation Email", "resignation-email", "professional exit", "beginner"),
    ("Complaint Response Email", "complaint-response-email", "customer service", "intermediate"),
    ("Invoice Follow-Up Email", "invoice-follow-up-email", "payment collection", "beginner"),
    ("Event Invitation Email", "event-invitation-email", "event marketing", "beginner"),
    ("Product Launch Announcement Email", "product-launch-email", "product announcements", "intermediate"),
    ("Team Introduction Email", "team-intro-email", "onboarding", "beginner"),
    ("Meeting Request Email", "meeting-request-email", "scheduling", "beginner"),
    ("Salary Negotiation Email", "salary-negotiation-email", "career growth", "intermediate"),
    ("Referral Request Email", "referral-request-email", "networking", "beginner"),
    ("Customer Win-Back Email", "customer-winback-email", "retention", "intermediate"),
    ("Newsletter Welcome Email", "newsletter-welcome-email", "email marketing", "beginner"),
    ("Feedback Request Email", "feedback-request-email", "customer insight", "beginner"),
    ("Project Update Email", "project-update-email", "status reporting", "beginner"),
    ("Thank You Email After Interview", "thank-you-interview-email", "interview follow-up", "beginner"),
    ("Apology Email to Client", "apology-client-email", "crisis management", "intermediate"),
    ("Upsell Email to Existing Customer", "upsell-email", "revenue growth", "intermediate"),
    ("Re-engagement Campaign Email", "reengagement-email", "email marketing", "intermediate"),
    ("Price Increase Notification Email", "price-increase-email", "billing communication", "intermediate"),
    ("Webinar Invitation Email", "webinar-invitation-email", "event marketing", "beginner"),
    ("Contract Renewal Reminder Email", "contract-renewal-email", "account management", "beginner"),
    ("Welcome New Client Email", "welcome-client-email", "client onboarding", "beginner"),
    ("Introduction to New Manager Email", "intro-new-manager-email", "internal communication", "beginner"),
    ("Request for Testimonial Email", "testimonial-request-email", "social proof", "beginner"),
    ("Holiday Greeting Email to Clients", "holiday-greeting-email", "relationship building", "beginner"),
    ("Termination of Service Email", "termination-service-email", "difficult communication", "advanced"),
    ("Performance Review Request Email", "performance-review-request-email", "career development", "beginner"),
]

for title, slug, topic, diff in email_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "writing",
        "scenario": "writing-emails",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["email", "professional", "business", "writing"],
        "prompt": f"You are an expert email copywriter. Write a compelling {title.lower()} that achieves a specific business goal. The email should have a clear subject line, engaging opening, well-structured body, and strong call-to-action. Context and details: [provide recipient, purpose, key points, and desired outcome].",
        "when_to_use": f"Write a professional {topic} email that gets results",
        "bad_example": "Write me an email about this topic.",
        "good_example": "A targeted, well-structured email with clear subject line, personalized opening, focused body, and specific call-to-action.",
        "how_to_customize": "Replace placeholders with your specific situation. Adjust tone based on your relationship with the recipient. Add specific data points or examples to make it more credible.",
        "advanced_version": f"Write using proven email frameworks (AIDA, PAS, or 4U) with psychological triggers, personalized data points, anticipation of reader objections, and a strategically crafted CTA that maximizes response rate for {topic}.",
        "related": ["professional-business-email-writer", "client-follow-up-email"],
        "featured": False,
        "collection": ["email-communication-pros"]
    })

# ===== WRITING-BLOG-POST (target: ~100, currently 21, need ~79) =====
blog_topics = [
    ("How-To Blog Post Template", "how-to-blog-post", "tutorial content", "beginner"),
    ("Listicle Blog Post", "listicle-blog-post", "list format content", "beginner"),
    ("Comparison Blog Post", "comparison-blog-post", "product comparison", "intermediate"),
    ("Opinion/Thought Leadership Post", "thought-leadership-post", "industry opinions", "intermediate"),
    ("Case Study Blog Post", "case-study-blog-post", "case study writing", "intermediate"),
    ("Product Review Blog Post", "product-review-post", "product reviews", "beginner"),
    ("Interview Blog Post", "interview-blog-post", "interview content", "intermediate"),
    ("Roundup Blog Post", "roundup-blog-post", "expert roundups", "beginner"),
    ("Beginner Guide Blog Post", "beginner-guide-post", "beginner tutorials", "beginner"),
    ("Advanced Tutorial Blog Post", "advanced-tutorial-post", "advanced guides", "advanced"),
    ("News Commentary Blog Post", "news-commentary-post", "industry news", "intermediate"),
    ("Personal Story Blog Post", "personal-story-post", "personal narratives", "beginner"),
    ("Data-Driven Blog Post", "data-driven-post", "data analysis content", "intermediate"),
    ("Myth-Busting Blog Post", "myth-busting-post", "debunking myths", "intermediate"),
    ("FAQ Blog Post", "faq-blog-post", "FAQ content", "beginner"),
    ("Infographic Accompanying Blog Post", "infographic-blog-post", "visual content", "intermediate"),
    ("Guest Post Template", "guest-post-template", "guest blogging", "beginner"),
    ("SEO-Optimized Blog Post", "seo-blog-post", "SEO content", "intermediate"),
    ("Pillar Page Blog Post", "pillar-page-post", "pillar content", "advanced"),
    ("Industry Trends Blog Post", "industry-trends-post", "trend analysis", "intermediate"),
    ("Mistakes to Avoid Blog Post", "mistakes-avoid-post", "warning content", "beginner"),
    ("Statistics and Data Blog Post", "statistics-blog-post", "data reporting", "intermediate"),
    ("Ultimate Guide Blog Post", "ultimate-guide-post", "comprehensive guides", "advanced"),
    ("Quick Tip Blog Post", "quick-tip-post", "short form tips", "beginner"),
    ("Behind the Scenes Blog Post", "behind-scenes-post", "company culture", "beginner"),
    ("Resource List Blog Post", "resource-list-post", "curated resources", "beginner"),
    ("Predictions Blog Post", "predictions-post", "future forecasting", "intermediate"),
    ("Step-by-Step Tutorial Post", "step-by-step-tutorial", "detailed tutorials", "intermediate"),
    ("Checklist Blog Post", "checklist-blog-post", "checklist content", "beginner"),
    ("Template Blog Post", "template-blog-post", "template sharing", "beginner"),
    ("FAQ Schema Blog Post", "faq-schema-post", "SEO FAQ content", "intermediate"),
    ("Local SEO Blog Post", "local-seo-post", "local business content", "intermediate"),
    ("Affiliate Review Blog Post", "affiliate-review-post", "affiliate content", "intermediate"),
    ("Storytelling Blog Post", "storytelling-blog-post", "narrative content", "intermediate"),
    ("Problem-Solution Blog Post", "problem-solution-post", "problem solving", "beginner"),
    ("Versus/Alternative Blog Post", "versus-blog-post", "alternatives content", "intermediate"),
    ("Glossary Blog Post", "glossary-blog-post", "terminology guides", "beginner"),
    ("Research Summary Blog Post", "research-summary-post", "research reporting", "intermediate"),
    ("Tool Comparison Blog Post", "tool-comparison-post", "software comparisons", "intermediate"),
]

for title, slug, topic, diff in blog_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "writing",
        "scenario": "writing-blog-post",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["blog", "content", "writing", "seo"],
        "prompt": f"You are an experienced content writer and SEO expert. Write a {title.lower()} for [TARGET AUDIENCE] about [TOPIC]. The post should be [WORD COUNT] words, well-structured with H2/H3 headings, include relevant examples, and be optimized for the keyword '[PRIMARY KEYWORD]'. Include: compelling introduction with hook, detailed body sections, actionable takeaways, and engaging conclusion with call-to-action.",
        "when_to_use": f"Create a high-quality {topic} blog post quickly with SEO best practices",
        "bad_example": "Write a blog post about this topic.",
        "good_example": "A well-structured blog post with engaging intro, clear headings, specific examples, actionable advice, and strong conclusion.",
        "how_to_customize": "Fill in bracketed placeholders. Adjust word count and tone for your audience. Add your own examples and data points for authenticity.",
        "advanced_version": f"Write a comprehensive {title.lower()} targeting [PRIMARY KEYWORD] and [SECONDARY KEYWORDS]. Include: data-backed claims with citations, original insights beyond common advice, expert quotes, internal linking suggestions, schema markup recommendations, and a content upgrade idea for lead generation.",
        "related": ["seo-blog-post-structure", "blog-post-outlines-that-rank"],
        "featured": False,
        "collection": ["content-creation-essentials"]
    })

# ===== CREATIVE-WRITING (target: ~90, currently 31, need ~59) =====
creative_topics = [
    ("Character Development Prompt", "character-development", "fiction characters", "intermediate"),
    ("Dialogue Writing Prompt", "dialogue-writing", "fiction dialogue", "intermediate"),
    ("Setting Description Prompt", "setting-description", "world building", "intermediate"),
    ("Plot Outline Generator", "plot-outline-generator", "story plotting", "intermediate"),
    ("Opening Scene Writer", "opening-scene-writer", "story hooks", "intermediate"),
    ("Climax Scene Writer", "climax-scene-writer", "story tension", "advanced"),
    ("Short Story Generator", "short-story-generator", "short fiction", "intermediate"),
    ("Poetry Writing Prompt", "poetry-writing", "poetry creation", "intermediate"),
    ("Flash Fiction Prompt", "flash-fiction", "micro fiction", "beginner"),
    ("Scene Transition Writer", "scene-transition", "story flow", "intermediate"),
    ("Backstory Development Prompt", "backstory-development", "character history", "intermediate"),
    ("Conflict Creation Prompt", "conflict-creation", "story tension", "advanced"),
    ("Theme Exploration Prompt", "theme-exploration", "literary themes", "advanced"),
    ("Point of View Switching Prompt", "pov-switching", "narrative perspective", "advanced"),
    ("Suspense Building Prompt", "suspense-building", "tension writing", "intermediate"),
    ("Emotional Scene Writer", "emotional-scene", "emotional writing", "intermediate"),
    ("Action Scene Writer", "action-scene", "action writing", "intermediate"),
    ("Romance Scene Writer", "romance-scene", "romance writing", "intermediate"),
    ("Fantasy World Builder", "fantasy-world-builder", "fantasy settings", "intermediate"),
    ("Sci-Fi Concept Developer", "scifi-concept", "science fiction", "intermediate"),
    ("Mystery Plot Developer", "mystery-plot", "mystery writing", "intermediate"),
    ("Comedy Writing Prompt", "comedy-writing", "humor writing", "intermediate"),
    ("Horror Writing Prompt", "horror-writing", "horror fiction", "intermediate"),
    ("Historical Fiction Prompt", "historical-fiction", "period writing", "intermediate"),
    ("Memoir Writing Prompt", "memoir-writing", "personal narrative", "intermediate"),
    ("Script/Screenplay Prompt", "screenplay-writing", "script writing", "advanced"),
    ("Children's Story Prompt", "childrens-story", "kids fiction", "beginner"),
    ("Fan Fiction Prompt", "fan-fiction", "fan writing", "beginner"),
    ("Writing Exercise Generator", "writing-exercise", "practice prompts", "beginner"),
    ("Writing Style Imitation", "style-imitation", "style practice", "intermediate"),
    ("Metaphor and Simile Generator", "metaphor-generator", "figurative language", "intermediate"),
    ("Chapter Outline Generator", "chapter-outline", "book planning", "intermediate"),
    ("Book Blurb Writer", "book-blurb", "book marketing", "beginner"),
    ("Query Letter Writer", "query-letter", "publishing", "intermediate"),
    ("Synopsis Writer", "synopsis-writer", "book summary", "intermediate"),
    ("Narrative Arc Planner", "narrative-arc", "story structure", "intermediate"),
    ("Subplot Developer", "subplot-developer", "story layers", "advanced"),
    ("Ending Writer", "ending-writer", "story conclusions", "intermediate"),
    ("Rewrite and Polish Prompt", "rewrite-polish", "editing", "intermediate"),
]

for title, slug, topic, diff in creative_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "writing",
        "scenario": "creative-writing",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["creative", "fiction", "writing", "storytelling"],
        "prompt": f"You are a creative writing coach and published author. Help me with {title.lower()}. [Provide your genre, tone, and any existing story elements]. Write with vivid descriptions, authentic voice, and strong narrative momentum. Show, don't tell. Use sensory details and specific language rather than abstract concepts.",
        "when_to_use": f"Generate creative content for {topic}",
        "bad_example": "Write a story about something interesting.",
        "good_example": "A vivid, specific scene with strong sensory details, authentic character voice, and clear narrative tension.",
        "how_to_customize": "Add your genre, setting, character details, and desired tone. Specify word count if needed. Reference specific authors whose style you want to emulate.",
        "advanced_version": f"Write {title.lower()} using advanced literary techniques: subtext, foreshadowing, varied sentence rhythm, and thematic resonance. Include: character arc progression, layered conflict, specific sensory details, and prose that reveals character through word choice. Target: [WORD COUNT] words in the style of [AUTHOR].",
        "related": ["story-starter-generator", "character-creator"],
        "featured": False,
        "collection": ["creative-writing-toolkit"]
    })

# ===== CODING-HELP (target: ~120, currently 53, need ~67) =====
coding_topics = [
    ("Debug Error Message", "debug-error-message", "error debugging", "intermediate"),
    ("Code Refactoring Helper", "code-refactoring", "code cleanup", "intermediate"),
    ("API Endpoint Generator", "api-endpoint-generator", "REST APIs", "intermediate"),
    ("Database Query Writer", "database-query-writer", "SQL queries", "intermediate"),
    ("Regular Expression Helper", "regex-helper", "pattern matching", "intermediate"),
    ("Code Comment Generator", "code-comments", "documentation", "beginner"),
    ("Unit Test Writer", "unit-test-writer", "testing", "intermediate"),
    ("Code Review Assistant", "code-review-assistant", "code quality", "intermediate"),
    ("Algorithm Explainer", "algorithm-explainer", "CS concepts", "beginner"),
    ("Git Command Helper", "git-command-helper", "version control", "beginner"),
    ("Shell Script Generator", "shell-script-generator", "automation", "intermediate"),
    ("JSON Parser/Builder", "json-helper", "data formats", "beginner"),
    ("CSS Layout Fixer", "css-layout-fixer", "styling issues", "intermediate"),
    ("React Component Builder", "react-component-builder", "React development", "intermediate"),
    ("Python Script Generator", "python-script-generator", "Python automation", "intermediate"),
    ("TypeScript Type Generator", "typescript-types", "type definitions", "intermediate"),
    ("Docker Configuration Helper", "docker-helper", "containerization", "intermediate"),
    ("CI/CD Pipeline Config", "cicd-config", "deployment", "intermediate"),
    ("Security Audit Assistant", "security-audit", "code security", "advanced"),
    ("Performance Optimization Helper", "performance-optimizer", "speed improvements", "advanced"),
    ("Code Migration Assistant", "code-migration", "language conversion", "intermediate"),
    ("Mock Data Generator", "mock-data-generator", "test data", "beginner"),
    ("Log Analysis Helper", "log-analysis", "debugging", "intermediate"),
    ("Microservice Design Helper", "microservice-design", "architecture", "advanced"),
    ("GraphQL Schema Builder", "graphql-schema", "API design", "intermediate"),
    ("WebSocket Implementation", "websocket-impl", "real-time communication", "advanced"),
    ("Authentication Flow Builder", "auth-flow", "user authentication", "advanced"),
    ("File Upload Handler", "file-upload-handler", "file handling", "intermediate"),
    ("Rate Limiter Implementation", "rate-limiter", "API protection", "intermediate"),
    ("Caching Strategy Helper", "caching-strategy", "performance", "intermediate"),
    ("Error Handling Template", "error-handling-template", "robust code", "intermediate"),
    ("Pagination Implementation", "pagination-impl", "UI patterns", "intermediate"),
    ("Search Functionality Builder", "search-builder", "search features", "intermediate"),
    ("Notification System Helper", "notification-system", "user alerts", "intermediate"),
    ("Email Template Coder", "email-template-coder", "HTML emails", "intermediate"),
    ("Responsive Design Helper", "responsive-design", "mobile-first", "intermediate"),
    ("Animation CSS/JS Helper", "animation-helper", "UI animations", "intermediate"),
    ("Form Validation Builder", "form-validation", "input handling", "intermediate"),
    ("State Management Helper", "state-management", "app architecture", "advanced"),
    ("CLI Tool Builder", "cli-tool-builder", "command line", "intermediate"),
    ("Web Scraper Generator", "web-scraper", "data extraction", "intermediate"),
    ("Data Visualization Coder", "data-viz-coder", "charts and graphs", "intermediate"),
    ("PDF Generator Helper", "pdf-generator", "document generation", "intermediate"),
    ("Payment Integration Helper", "payment-integration", "e-commerce", "advanced"),
    ("OAuth Implementation Guide", "oauth-impl", "authentication", "advanced"),
    ("CRUD API Builder", "crud-api-builder", "REST APIs", "intermediate"),
    ("Middleware Generator", "middleware-generator", "request processing", "intermediate"),
    ("Configuration Management", "config-management", "app settings", "intermediate"),
    ("Logging Setup Helper", "logging-setup", "observability", "intermediate"),
    ("Environment Setup Helper", "env-setup", "development setup", "beginner"),
    ("Dependency Update Assistant", "dependency-update", "package management", "intermediate"),
    ("Code Snippet Explainer", "snippet-explainer", "code understanding", "beginner"),
    ("Documentation Generator", "doc-generator", "auto docs", "intermediate"),
    ("API Documentation Writer", "api-docs-writer", "API references", "intermediate"),
]

for title, slug, topic, diff in coding_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "coding",
        "scenario": "coding-help",
        "tools": ["chatgpt", "claude"],
        "difficulty": diff,
        "tags": ["coding", "development", "programming", "debugging"],
        "prompt": f"You are a senior software engineer. Help me with {title.lower()}. [Provide your language, framework, and specific requirements]. Write clean, well-documented code following industry best practices. Include error handling, type safety, and comments explaining non-obvious logic.",
        "when_to_use": f"Get expert coding assistance for {topic}",
        "bad_example": "Fix my code. Make it work better.",
        "good_example": "Clean, well-structured code with proper error handling, type annotations, meaningful variable names, and explanatory comments for complex logic.",
        "how_to_customize": "Specify your programming language, framework version, and exact requirements. Include existing code context and any error messages.",
        "advanced_version": f"As a senior engineer, implement {title.lower()} with production-ready quality. Requirements: comprehensive error handling, input validation, type safety, unit tests, performance considerations, edge case coverage, and inline documentation. Language: [LANGUAGE]. Framework: [FRAMEWORK]. Follow [STYLE GUIDE] conventions.",
        "related": ["code-bug-fixer", "code-review-helper"],
        "featured": False,
        "collection": ["developer-productivity-pack"]
    })

# ===== DATA-ANALYSIS (target: ~90, currently 15, need ~75) =====
analysis_topics = [
    ("CSV Data Analyzer", "csv-data-analyzer", "CSV analysis", "beginner"),
    ("Trend Analysis Report", "trend-analysis-report", "trend identification", "intermediate"),
    ("Statistical Summary Generator", "statistical-summary", "descriptive stats", "beginner"),
    ("Data Visualization Recommender", "data-viz-recommender", "chart selection", "intermediate"),
    ("Correlation Analysis Helper", "correlation-analysis", "relationship detection", "intermediate"),
    ("Outlier Detection Helper", "outlier-detection", "anomaly finding", "intermediate"),
    ("Time Series Analysis", "time-series-analysis", "temporal data", "advanced"),
    ("A/B Test Analysis", "ab-test-analysis", "experiment results", "intermediate"),
    ("Survey Data Analyzer", "survey-analyzer", "survey results", "beginner"),
    ("Financial Data Analyzer", "financial-analyzer", "financial metrics", "intermediate"),
    ("Customer Segmentation Analysis", "customer-segmentation", "market segmentation", "intermediate"),
    ("Sales Forecast Helper", "sales-forecast", "predictive analysis", "advanced"),
    ("KPI Dashboard Planner", "kpi-dashboard", "metrics tracking", "intermediate"),
    ("Data Quality Checker", "data-quality-checker", "data validation", "beginner"),
    ("SQL Query Optimizer", "sql-optimizer", "query performance", "intermediate"),
    ("Excel Formula Helper", "excel-formula-helper", "spreadsheet formulas", "beginner"),
    ("Python Pandas Analysis", "pandas-analysis", "data manipulation", "intermediate"),
    ("Regression Analysis Helper", "regression-analysis", "predictive modeling", "advanced"),
    ("Cohort Analysis Builder", "cohort-analysis", "user behavior", "intermediate"),
    ("Funnel Analysis Helper", "funnel-analysis", "conversion tracking", "intermediate"),
    ("Churn Analysis Assistant", "churn-analysis", "retention insights", "intermediate"),
    ("Revenue Analysis Report", "revenue-analysis", "financial reporting", "intermediate"),
    ("Market Research Analyzer", "market-research", "market data", "intermediate"),
    ("Competitor Analysis Report", "competitor-analysis", "competitive intelligence", "intermediate"),
    ("Sentiment Analysis Helper", "sentiment-analysis", "text analytics", "intermediate"),
    ("Text Mining Assistant", "text-mining", "NLP analysis", "advanced"),
    ("Data Cleaning Assistant", "data-cleaning", "data preparation", "beginner"),
    ("Pivot Table Generator", "pivot-table-generator", "data summarization", "beginner"),
    ("Dashboard Design Advisor", "dashboard-advisor", "visualization design", "intermediate"),
    ("Report Writing Assistant", "report-writer", "business reports", "intermediate"),
    ("Metrics Definition Helper", "metrics-definition", "KPI setup", "beginner"),
    ("Benchmark Analysis Helper", "benchmark-analysis", "performance comparison", "intermediate"),
    ("Variance Analysis Report", "variance-analysis", "budget vs actual", "intermediate"),
    ("Executive Summary Writer", "executive-summary-writer", "report summarization", "intermediate"),
    ("Data Storytelling Helper", "data-storytelling", "narrative analytics", "intermediate"),
    ("Forecast Model Builder", "forecast-model", "predictive analytics", "advanced"),
    ("Monte Carlo Simulation", "monte-carlo", "risk analysis", "advanced"),
    ("Cluster Analysis Helper", "cluster-analysis", "pattern detection", "advanced"),
    ("Hypothesis Testing Guide", "hypothesis-testing", "statistical testing", "intermediate"),
]

for title, slug, topic, diff in analysis_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "analysis",
        "scenario": "data-analysis",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["data", "analysis", "insights", "reporting"],
        "prompt": f"You are an expert data analyst. Help me with {title.lower()}. [Provide your data, context, and specific questions]. Analyze the data carefully, identify key patterns and insights, and present findings in clear, non-technical language with supporting numbers. Include actionable recommendations based on the analysis.",
        "when_to_use": f"Get professional data analysis for {topic}",
        "bad_example": "Look at this data and tell me something interesting.",
        "good_example": "A structured analysis with clear findings, supporting metrics, identified trends, and actionable recommendations written in plain language.",
        "how_to_customize": "Paste your data or describe the dataset (size, columns, format). Specify what question you're trying to answer and who will read the analysis.",
        "advanced_version": f"Perform comprehensive {title.lower()} with statistical rigor. Include: exploratory data analysis, statistical significance testing, visual recommendations, confidence intervals, potential confounding variables, and a summary suitable for both technical and non-technical stakeholders. Data format: [FORMAT].",
        "related": ["sales-data-analyzer", "monthly-report-writer"],
        "featured": False,
        "collection": ["data-analysis-essentials"]
    })

# ===== MARKETING-COPY (target: ~100, currently 21, need ~79) =====
marketing_topics = [
    ("Facebook Ad Copy", "facebook-ad-copy", "social media ads", "intermediate"),
    ("Google Ads Copy", "google-ads-copy", "search ads", "intermediate"),
    ("LinkedIn Ad Copy", "linkedin-ad-copy", "professional ads", "intermediate"),
    ("Instagram Caption Writer", "instagram-caption", "social captions", "beginner"),
    ("Twitter/X Thread Writer", "twitter-thread", "social threads", "intermediate"),
    ("Landing Page Copy", "landing-page-copy", "conversion pages", "intermediate"),
    ("Product Description Writer", "product-description-writer", "e-commerce copy", "beginner"),
    ("Tagline Generator", "tagline-generator", "brand slogans", "beginner"),
    ("Value Proposition Writer", "value-prop-writer", "positioning", "intermediate"),
    ("Brand Voice Guide", "brand-voice-guide", "tone consistency", "intermediate"),
    ("Press Release Writer", "press-release-writer", "PR content", "intermediate"),
    ("Case Study Copy Writer", "case-study-copy", "social proof", "intermediate"),
    ("White Paper Outliner", "white-paper-outliner", "thought leadership", "advanced"),
    ("Ebook Chapter Writer", "ebook-chapter", "long-form content", "intermediate"),
    ("Webinar Script Writer", "webinar-script", "presentation scripts", "intermediate"),
    ("Video Script Writer", "video-script", "video content", "intermediate"),
    ("Podcast Episode Outliner", "podcast-outline", "audio content", "beginner"),
    ("Social Media Calendar", "social-calendar", "content planning", "intermediate"),
    ("Email Sequence Writer", "email-sequence", "drip campaigns", "intermediate"),
    ("Onboarding Email Series", "onboarding-emails", "user onboarding", "intermediate"),
    ("Abandoned Cart Email", "abandoned-cart-email", "e-commerce recovery", "intermediate"),
    ("Promotional Email Writer", "promotional-email", "sales campaigns", "beginner"),
    ("App Store Description", "app-store-description", "app marketing", "beginner"),
    ("Meta Ad Copy Variations", "meta-ad-variations", "ad testing", "intermediate"),
    ("Display Ad Copy", "display-ad-copy", "banner ads", "beginner"),
    ("Influencer Brief Template", "influencer-brief", "influencer marketing", "intermediate"),
    ("Campaign Brief Writer", "campaign-brief", "campaign planning", "intermediate"),
    ("Slogan Generator", "slogan-generator", "brand identity", "beginner"),
    ("Mission Statement Writer", "mission-statement", "company values", "beginner"),
    ("About Page Copy", "about-page-copy", "company story", "beginner"),
    ("Homepage Hero Copy", "homepage-hero", "first impression", "intermediate"),
    ("Feature Description Writer", "feature-description", "product features", "beginner"),
    ("Benefit Bullet Points", "benefit-bullets", "sales copy", "beginner"),
    ("Testimonial Request Copy", "testimonial-copy", "social proof", "beginner"),
    ("Referral Program Copy", "referral-copy", "growth marketing", "intermediate"),
    ("Pricing Page Copy", "pricing-page-copy", "pricing strategy", "intermediate"),
    ("FAQ Page Copy", "faq-page-copy", "customer support", "beginner"),
    ("Thank You Page Copy", "thank-you-page-copy", "post-conversion", "beginner"),
    ("404 Page Copy", "404-page-copy", "error page UX", "beginner"),
    ("Chatbot Script Writer", "chatbot-script", "conversational UX", "intermediate"),
    ("SMS Marketing Copy", "sms-marketing", "text messages", "beginner"),
    ("Push Notification Copy", "push-notification", "mobile engagement", "beginner"),
    ("Retargeting Ad Copy", "retargeting-ad", "remarketing", "intermediate"),
    ("Holiday Campaign Copy", "holiday-campaign", "seasonal marketing", "intermediate"),
    ("Product Launch Copy", "product-launch-copy", "launch campaigns", "intermediate"),
    ("Rebrand Announcement", "rebrand-announcement", "brand change", "intermediate"),
    ("Crisis Communication Copy", "crisis-communication", "PR management", "advanced"),
    ("CSR Report Copy", "csr-report", "sustainability", "intermediate"),
    ("Investor Pitch Copy", "investor-pitch", "fundraising", "advanced"),
]

for title, slug, topic, diff in marketing_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "writing",
        "scenario": "marketing-copy",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["marketing", "copywriting", "advertising", "content"],
        "prompt": f"You are an experienced marketing copywriter. Write compelling {title.lower()} for [PRODUCT/SERVICE]. Target audience: [DESCRIBE]. Key selling points: [LIST 2-3]. The copy should be persuasive, benefit-focused, and aligned with [BRAND TONE: casual/professional/bold/etc.]. Include a clear call-to-action.",
        "when_to_use": f"Create professional marketing copy for {topic}",
        "bad_example": "Write some marketing copy for my product.",
        "good_example": "Persuasive, benefit-driven copy with clear value proposition, emotional hooks, and a specific call-to-action tailored to the target audience.",
        "how_to_customize": "Replace bracketed placeholders with your product details. Specify brand tone, target audience demographics, and key differentiators.",
        "advanced_version": f"Write conversion-optimized {title.lower()} using proven copywriting frameworks (AIDA, PAS, or FAB). Include: attention-grabbing hook, emotional and rational appeals, social proof integration, objection handling, urgency/scarcity element, and a specific, action-oriented CTA. A/B test variation included. Product: [DETAILS]. Audience: [DEMOGRAPHICS].",
        "related": ["ad-copy-generator", "landing-page-copywriter"],
        "featured": False,
        "collection": ["marketing-team-essentials"]
    })

# ===== IMAGE-GENERATION (target: ~100, currently 50, need ~50) =====
image_topics = [
    ("Product Photography Style", "product-photo-style", "product imagery", "intermediate"),
    ("Lifestyle Branding Photo", "lifestyle-branding-photo", "brand imagery", "intermediate"),
    ("Social Media Graphic", "social-media-graphic", "social visuals", "beginner"),
    ("Blog Featured Image", "blog-featured-image", "content visuals", "beginner"),
    ("Email Header Image", "email-header-image", "email design", "beginner"),
    ("Presentation Background", "presentation-background", "slide design", "beginner"),
    ("Logo Concept Generator", "logo-concept", "brand identity", "intermediate"),
    ("Icon Set Generator", "icon-set", "UI icons", "intermediate"),
    ("Pattern/Texture Generator", "pattern-generator", "design assets", "beginner"),
    ("Infographic Background", "infographic-bg", "data visualization", "intermediate"),
    ("Book Cover Designer", "book-cover", "publishing", "intermediate"),
    ("Album Art Generator", "album-art", "music design", "intermediate"),
    ("Poster Designer", "poster-designer", "event posters", "intermediate"),
    ("Business Card Design", "business-card-design", "print design", "beginner"),
    ("T-Shirt Graphic Designer", "tshirt-design", "apparel graphics", "beginner"),
    ("Packaging Design Concept", "packaging-design", "product packaging", "intermediate"),
    ("Website Hero Image", "website-hero", "web design", "intermediate"),
    ("App Screenshot Generator", "app-screenshot", "app marketing", "intermediate"),
    ("YouTube Thumbnail Creator", "youtube-thumbnail", "video thumbnails", "beginner"),
    ("Podcast Cover Art", "podcast-cover", "podcast branding", "beginner"),
    ("Restaurant Menu Photo", "restaurant-photo", "food photography", "intermediate"),
    ("Real Estate Photo", "real-estate-photo", "property imagery", "intermediate"),
    ("Fashion Editorial Photo", "fashion-editorial", "fashion imagery", "intermediate"),
    ("Nature Landscape Photo", "nature-landscape", "scenic imagery", "beginner"),
    ("Architectural Rendering", "architectural-render", "building visualization", "advanced"),
    ("Interior Design Concept", "interior-design", "room visualization", "intermediate"),
    ("Character Concept Art", "character-concept", "character design", "intermediate"),
    ("Environment Concept Art", "environment-concept", "world design", "intermediate"),
    ("Storyboard Frame Generator", "storyboard-frame", "visual planning", "intermediate"),
    ("Mood Board Generator", "mood-board", "design inspiration", "beginner"),
    ("Color Palette Generator", "color-palette", "design systems", "beginner"),
    ("Abstract Art Generator", "abstract-art", "creative imagery", "beginner"),
    ("Minimalist Illustration", "minimalist-illustration", "clean visuals", "beginner"),
    ("Watercolor Illustration", "watercolor-illustration", "art style", "intermediate"),
    ("Pixel Art Generator", "pixel-art", "retro graphics", "beginner"),
    ("3D Render Helper", "3d-render", "3D visualization", "advanced"),
    ("Isometric Illustration", "isometric-illustration", "technical art", "intermediate"),
    ("Flat Design Illustration", "flat-design", "modern visuals", "beginner"),
    ("Vintage/Retro Style Photo", "retro-style", "vintage imagery", "beginner"),
    ("Cyberpunk Scene Generator", "cyberpunk-scene", "sci-fi art", "intermediate"),
    ("Fantasy Landscape", "fantasy-landscape", "imaginative scenery", "intermediate"),
    ("Portrait Photography Style", "portrait-style", "portrait imagery", "intermediate"),
    ("Food Photography Style", "food-photography", "culinary imagery", "intermediate"),
    ("Macro Photography Style", "macro-photography", "close-up imagery", "intermediate"),
    ("Drone Aerial View", "drone-aerial", "aerial imagery", "intermediate"),
    ("Night Photography Scene", "night-photography", "low-light imagery", "intermediate"),
    ("Golden Hour Photo", "golden-hour-photo", "warm lighting", "beginner"),
    ("Studio Product Shot", "studio-product-shot", "professional product", "intermediate"),
    ("Flatlay Composition", "flatlay-composition", "overhead photography", "beginner"),
    ("Collage Art Generator", "collage-art", "mixed media", "intermediate"),
]

for title, slug, topic, diff in image_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "image",
        "scenario": "image-generation",
        "tools": ["midjourney", "dall-e", "stable-diffusion"],
        "difficulty": diff,
        "tags": ["image", "design", "visual", "ai-art"],
        "prompt": f"Generate a professional {title.lower()}. Style: [photorealistic/illustration/artistic]. Subject: [describe the main element]. Composition: [describe framing and layout]. Lighting: [natural/studio/dramatic/etc.]. Color palette: [specify colors or mood]. Technical: [camera angle, lens, resolution details]. --ar 16:9 --v 6",
        "when_to_use": f"Create AI-generated imagery for {topic}",
        "bad_example": "A nice picture of something.",
        "good_example": "A detailed, specific visual description with style, composition, lighting, color palette, and technical camera/aspect ratio parameters.",
        "how_to_customize": "Replace bracketed values with your specific visual requirements. Add references to specific artists, photography styles, or brands for consistency.",
        "advanced_version": f"Create a highly detailed {title.lower()} with professional-grade composition. Specifications: subject [DESCRIBE], style reference [ARTIST/BRAND], lighting setup [SPECIFY], color grading [DESCRIBE], composition rule [thirds/golden ratio/etc.], mood [SPECIFY]. Technical parameters: lens type, depth of field, resolution. Platform: [Midjourney/DALL-E/Stable Diffusion]. Aspect ratio: [SPECIFY]. Quality: highest available.",
        "related": ["midjourney-photography-prompt", "dall-e-illustration-prompt"],
        "featured": False,
        "collection": ["midjourney-photography"]
    })

# ===== RESUME-COVER-LETTER (target: ~80, currently 15, need ~65) =====
resume_topics = [
    ("Resume Summary Writer", "resume-summary", "professional summary", "beginner"),
    ("Resume Bullet Points", "resume-bullets", "achievement writing", "beginner"),
    ("Cover Letter General", "cover-letter-general", "job applications", "beginner"),
    ("Cover Letter Career Change", "cover-letter-career-change", "career pivots", "intermediate"),
    ("Cover Letter Entry Level", "cover-letter-entry-level", "new graduates", "beginner"),
    ("Cover Letter Executive", "cover-letter-executive", "senior roles", "advanced"),
    ("LinkedIn Profile Optimizer", "linkedin-optimizer", "profile improvement", "beginner"),
    ("LinkedIn About Section", "linkedin-about", "professional bio", "beginner"),
    ("LinkedIn Headline Writer", "linkedin-headline", "profile branding", "beginner"),
    ("Resume Skills Section", "resume-skills", "skills listing", "beginner"),
    ("Resume Education Section", "resume-education", "education formatting", "beginner"),
    ("Resume Work Experience", "resume-experience", "job descriptions", "beginner"),
    ("Resume Objective Writer", "resume-objective", "career goals", "beginner"),
    ("Resume for Tech Roles", "resume-tech", "tech applications", "intermediate"),
    ("Resume for Creative Roles", "resume-creative", "creative portfolios", "intermediate"),
    ("Resume for Management Roles", "resume-management", "leadership roles", "intermediate"),
    ("Resume ATS Optimizer", "resume-ats", "ATS compliance", "intermediate"),
    ("Resume Keyword Optimizer", "resume-keywords", "job matching", "intermediate"),
    ("Resume Gap Explanation", "resume-gap", "employment gaps", "intermediate"),
    ("Resume Career Break", "resume-career-break", "return to work", "intermediate"),
    ("Resume Promotion Builder", "resume-promotion", "career advancement", "intermediate"),
    ("Freelance Resume", "freelance-resume", "independent work", "intermediate"),
    ("Academic CV Writer", "academic-cv", "academic applications", "advanced"),
    ("Resume for Internship", "resume-internship", "student applications", "beginner"),
    ("Resume for Government Jobs", "resume-government", "public sector", "intermediate"),
    ("Resume for Startup Jobs", "resume-startup", "startup culture", "intermediate"),
    ("Resume for Remote Jobs", "resume-remote", "remote work", "beginner"),
    ("Resume for International Jobs", "resume-international", "global applications", "intermediate"),
    ("Thank You After Interview", "thank-you-interview", "interview follow-up", "beginner"),
    ("Salary Negotiation Script", "salary-negotiation-script", "compensation talks", "intermediate"),
    ("Job Offer Acceptance Letter", "offer-acceptance", "formal acceptance", "beginner"),
    ("Job Offer Decline Letter", "offer-decline", "polite rejection", "beginner"),
    ("Networking Introduction", "networking-intro", "professional connections", "beginner"),
    ("Cold Networking Message", "cold-networking", "outreach", "intermediate"),
    ("Informational Interview Request", "info-interview-request", "learning conversations", "beginner"),
    ("Mentorship Request Letter", "mentorship-request", "mentor finding", "intermediate"),
    ("Reference Request Letter", "reference-request", "recommendations", "beginner"),
    ("Recommendation Letter Writer", "recommendation-letter", "professional endorsements", "intermediate"),
    ("Personal Brand Statement", "brand-statement", "professional identity", "beginner"),
    ("Elevator Pitch Writer", "elevator-pitch", "quick introductions", "beginner"),
    ("Portfolio Description Writer", "portfolio-description", "project showcasing", "intermediate"),
    ("Interview Preparation Guide", "interview-prep", "interview readiness", "intermediate"),
    ("Common Interview Answers", "interview-answers", "interview practice", "beginner"),
    ("Behavioral Interview Answers", "behavioral-interview", "STAR method", "intermediate"),
    ("Technical Interview Prep", "technical-interview-prep", "tech interviews", "advanced"),
    ("Follow-Up After Rejection", "follow-up-rejection", "graceful response", "intermediate"),
    ("Career Change Cover Letter", "career-change-cover", "industry switch", "intermediate"),
    ("Promotion Request Letter", "promotion-request", "internal advancement", "intermediate"),
    ("Performance Self-Assessment", "self-assessment", "review preparation", "intermediate"),
    ("Professional Bio Writer", "professional-bio", "speaker/conference bios", "beginner"),
]

for title, slug, topic, diff in resume_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "writing",
        "scenario": "resume-cover-letter",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["resume", "career", "job-search", "professional"],
        "prompt": f"You are an expert career coach and professional writer. Help me with {title.lower()}. [Provide your background, target role/industry, and key achievements]. Write in a professional, confident tone. Quantify achievements with numbers and impact where possible. Tailor to [TARGET ROLE/COMPANY] requirements.",
        "when_to_use": f"Create professional career documents for {topic}",
        "bad_example": "Write me a resume.",
        "good_example": "A tailored, achievement-focused document with quantified results, strong action verbs, clear structure, and keywords matching the target role.",
        "how_to_customize": "Provide your specific background, achievements with metrics, and target role/industry. Include job description keywords for ATS optimization.",
        "advanced_version": f"As a senior career coach, create a compelling {title.lower()} optimized for [TARGET ROLE] at [TARGET COMPANY]. Use: achievement-oriented language with quantified impact (%, $, numbers), industry-specific keywords for ATS, power verbs, and differentiation points that set me apart from typical candidates. Include: strategic positioning, narrative consistency, and a compelling professional story. Background: [DETAILS].",
        "related": ["resume-optimizer", "cover-letter-writer"],
        "featured": False,
        "collection": ["career-boost-bundle"]
    })

# ===== LEARNING-NEW-TOPIC (target: ~80, currently 25, need ~55) =====
learning_topics = [
    ("Concept Explainer Simple", "concept-explainer-simple", "basic understanding", "beginner"),
    ("Concept Explainer Deep Dive", "concept-explainer-deep", "comprehensive learning", "intermediate"),
    ("Study Plan Generator", "study-plan-generator", "learning roadmaps", "beginner"),
    ("Flashcard Generator", "flashcard-generator", "memorization", "beginner"),
    ("Quiz Generator", "quiz-generator", "knowledge testing", "beginner"),
    ("Summary of Complex Topic", "summary-complex", "topic compression", "intermediate"),
    ("Explain Like I'm 5", "explain-like-im-5", "simple explanations", "beginner"),
    ("Socratic Method Tutor", "socratic-tutor", "guided learning", "intermediate"),
    ("Learning Path Advisor", "learning-path-advisor", "skill planning", "intermediate"),
    ("Prerequisite Checker", "prerequisite-checker", "knowledge gaps", "beginner"),
    ("Analogy Generator", "analogy-generator", "conceptual bridges", "beginner"),
    ("Example Generator", "example-generator", "practical examples", "beginner"),
    ("Counterexample Generator", "counterexample-generator", "edge cases", "intermediate"),
    ("Mind Map Generator", "mind-map-generator", "concept organization", "intermediate"),
    ("Glossary Generator", "glossary-generator", "terminology", "beginner"),
    ("Timeline Generator", "timeline-generator", "historical context", "beginner"),
    ("Compare and Contrast", "compare-contrast", "concept differences", "intermediate"),
    ("Pros and Cons Analyzer", "pros-cons-analyzer", "decision analysis", "beginner"),
    ("Common Misconceptions", "common-misconceptions", "myth busting", "beginner"),
    ("FAQ Generator", "faq-generator-learning", "common questions", "beginner"),
    ("Practice Problem Generator", "practice-problems", "skill exercises", "intermediate"),
    ("Case Study Generator", "case-study-generator", "real-world examples", "intermediate"),
    ("Project Idea Generator", "project-ideas", "hands-on learning", "beginner"),
    ("Reading List Generator", "reading-list", "resource curation", "intermediate"),
    ("Video Recommendation Helper", "video-recommendations", "visual learning", "beginner"),
    ("Cheat Sheet Generator", "cheat-sheet", "quick reference", "beginner"),
    ("Interview Question Prep", "interview-question-prep", "exam preparation", "intermediate"),
    ("Teaching Lesson Planner", "lesson-planner", "educator tools", "intermediate"),
    ("Grading Rubric Generator", "grading-rubric", "assessment", "intermediate"),
    ("Course Syllabus Generator", "syllabus-generator", "course design", "intermediate"),
    ("Language Learning Helper", "language-learning", "language practice", "beginner"),
    ("Math Problem Solver", "math-solver", "mathematics help", "intermediate"),
    ("Science Concept Explainer", "science-explainer", "scientific concepts", "intermediate"),
    ("History Timeline Builder", "history-timeline", "historical events", "beginner"),
    ("Philosophy Discussion Guide", "philosophy-guide", "philosophical thinking", "intermediate"),
    ("Coding Concept Explainer", "coding-concept-explainer", "programming concepts", "intermediate"),
    ("Business Concept Explainer", "business-concept-explainer", "business fundamentals", "beginner"),
    ("Finance Concept Explainer", "finance-concept-explainer", "financial literacy", "intermediate"),
    ("Psychology Concept Explainer", "psychology-concept", "behavioral science", "intermediate"),
    ("Biology Concept Explainer", "biology-concept", "life sciences", "intermediate"),
    ("Chemistry Concept Explainer", "chemistry-concept", "chemical sciences", "intermediate"),
    ("Physics Concept Explainer", "physics-concept", "physical sciences", "intermediate"),
    ("Economics Concept Explainer", "economics-concept", "economic principles", "intermediate"),
    ("Political Science Explainer", "politics-concept", "political systems", "intermediate"),
    ("Sociology Concept Explainer", "sociology-concept", "social dynamics", "intermediate"),
    ("Art History Explainer", "art-history", "art movements", "intermediate"),
    ("Music Theory Explainer", "music-theory", "music fundamentals", "intermediate"),
    ("Statistics Explainer", "statistics-explainer", "data science basics", "intermediate"),
    ("Machine Learning Explainer", "ml-explainer", "AI concepts", "advanced"),
    ("Research Paper Summarizer", "research-summarizer", "academic papers", "intermediate"),
    ("Book Summary Generator", "book-summary-generator", "key insights", "beginner"),
    ("Article Summarizer", "article-summarizer", "content compression", "beginner"),
    ("Debate Preparation Helper", "debate-prep", "argument building", "intermediate"),
    ("Essay Writing Tutor", "essay-tutor", "academic writing", "intermediate"),
    ("Thesis Statement Helper", "thesis-helper", "argument formulation", "intermediate"),
]

for title, slug, topic, diff in learning_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "guide",
        "scenario": "learning-new-topic",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["learning", "education", "study", "knowledge"],
        "prompt": f"You are a patient, expert educator. Help me with {title.lower()}. Topic: [SPECIFY TOPIC]. Level: [BEGINNER/INTERMEDIATE/ADVANCED]. Explain clearly using simple language, concrete examples, and logical progression. Check for understanding and build from foundations to complexity.",
        "when_to_use": f"Learn and understand {topic} with AI-powered tutoring",
        "bad_example": "Tell me about this topic.",
        "good_example": "A clear, structured explanation with definitions, examples, analogies, and practical applications appropriate for the learner's level.",
        "how_to_customize": "Specify the exact topic, your current knowledge level, and what you want to achieve (pass an exam, understand for work, personal interest, etc.).",
        "advanced_version": f"As an expert educator, provide a comprehensive learning experience for {title.lower()}. Topic: [SPECIFY]. Include: foundational concepts with definitions and analogies, progressive complexity building, real-world applications, common misconceptions and corrections, practice exercises with solutions, key takeaways, and recommended next topics. Level: [SPECIFY]. Learning goal: [SPECIFY].",
        "related": ["topic-study-plan", "concept-explainer"],
        "featured": False,
        "collection": ["learning-accelerator-kit"]
    })

# ===== BUSINESS-PLANNING (target: ~70, currently 21, need ~49) =====
business_topics = [
    ("Business Model Canvas", "business-model-canvas", "business design", "intermediate"),
    ("Lean Canvas Generator", "lean-canvas", "startup planning", "intermediate"),
    ("Elevator Pitch Generator", "elevator-pitch-business", "quick pitches", "beginner"),
    ("Pitch Deck Outliner", "pitch-deck-outline", "investor presentations", "intermediate"),
    ("Business Plan Writer", "business-plan-writer", "formal planning", "advanced"),
    ("Market Analysis Report", "market-analysis-business", "market research", "intermediate"),
    ("Competitor Analysis Report", "competitor-analysis-business", "competitive landscape", "intermediate"),
    ("SWOT Analysis Generator", "swot-analysis", "strategic analysis", "beginner"),
    ("Target Customer Profile", "customer-profile", "buyer personas", "intermediate"),
    ("Go-To-Market Strategy", "gtm-strategy", "market entry", "advanced"),
    ("Revenue Model Designer", "revenue-model", "monetization", "intermediate"),
    ("Financial Projection Helper", "financial-projection", "forecasting", "advanced"),
    ("Break-Even Analysis", "break-even-analysis", "financial planning", "intermediate"),
    ("Pricing Strategy Advisor", "pricing-strategy", "price setting", "intermediate"),
    ("Marketing Plan Generator", "marketing-plan-business", "marketing strategy", "intermediate"),
    ("Content Strategy Planner", "content-strategy-business", "content planning", "intermediate"),
    ("Growth Strategy Planner", "growth-strategy", "scaling plans", "advanced"),
    ("Risk Assessment Report", "risk-assessment-business", "risk management", "intermediate"),
    ("Project Proposal Writer", "project-proposal-business", "project pitches", "intermediate"),
    ("Meeting Agenda Generator", "meeting-agenda-business", "meeting planning", "beginner"),
    ("Board Meeting Minutes", "board-minutes", "corporate governance", "intermediate"),
    ("OKR Generator", "okr-generator", "goal setting", "intermediate"),
    ("KPI Dashboard Planner", "kpi-planner-business", "metrics tracking", "intermediate"),
    ("Hiring Plan Generator", "hiring-plan", "workforce planning", "intermediate"),
    ("Job Description Writer", "job-description-writer", "hiring docs", "beginner"),
    ("Onboarding Plan Generator", "onboarding-plan", "new hire setup", "beginner"),
    ("SOP Writer", "sop-writer", "standard procedures", "intermediate"),
    ("Policy Document Writer", "policy-document", "company policies", "intermediate"),
    ("Partnership Proposal", "partnership-proposal-business", "B2B partnerships", "intermediate"),
    ("Vendor Evaluation Template", "vendor-evaluation", "supplier assessment", "intermediate"),
    ("Budget Planning Helper", "budget-planning", "financial management", "intermediate"),
    ("Cost Reduction Advisor", "cost-reduction", "efficiency", "intermediate"),
    ("Investor Update Template", "investor-update", "investor relations", "intermediate"),
    ("Board Report Template", "board-report", "governance reporting", "intermediate"),
    ("Product Requirements Doc", "prd-writer", "product planning", "intermediate"),
    ("User Story Generator", "user-story-generator", "agile planning", "intermediate"),
    ("Sprint Planning Helper", "sprint-planning", "agile execution", "intermediate"),
    ("Retrospective Facilitator", "retrospective-facilitator", "team improvement", "beginner"),
    ("Stakeholder Analysis", "stakeholder-analysis", "project management", "intermediate"),
    ("Change Management Plan", "change-management", "organizational change", "advanced"),
    ("Customer Journey Map", "customer-journey-map", "UX planning", "intermediate"),
    ("Value Chain Analysis", "value-chain-analysis", "operations analysis", "intermediate"),
    ("Porter's Five Forces", "porters-five-forces", "industry analysis", "intermediate"),
    ("PESTEL Analysis", "pestel-analysis", "macro analysis", "intermediate"),
    ("Blue Ocean Strategy", "blue-ocean-strategy", "market positioning", "advanced"),
    ("Scenario Planning Helper", "scenario-planning", "strategic foresight", "advanced"),
    ("Exit Strategy Planner", "exit-strategy", "business exit", "advanced"),
]

for title, slug, topic, diff in business_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "business",
        "scenario": "business-planning",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["business", "planning", "strategy", "management"],
        "prompt": f"You are an experienced business consultant and strategist. Help me with {title.lower()}. [Provide your industry, company size, and specific context]. Create a structured, actionable document with clear sections, data-driven insights, and specific recommendations. Use professional business language and frameworks.",
        "when_to_use": f"Create professional business documents for {topic}",
        "bad_example": "Write me a business plan.",
        "good_example": "A structured, data-informed business document with clear analysis, actionable recommendations, professional formatting, and industry-specific insights.",
        "how_to_customize": "Provide your industry, company details, market context, and specific objectives. Include any relevant data points or constraints.",
        "advanced_version": f"As a senior consultant, produce a comprehensive {title.lower()} using established business frameworks and methodologies. Include: executive summary, detailed analysis with data points, strategic recommendations with prioritization, implementation roadmap with timelines and milestones, risk assessment with mitigation plans, and KPIs for success measurement. Industry: [SPECIFY]. Context: [DETAILS].",
        "related": ["startup-business-plan", "business-model-canvas-template"],
        "featured": False,
        "collection": ["business-strategy-toolkit"]
    })

# ===== PRODUCTIVITY-TASKS (target: ~70, currently 30, need ~40) =====
productivity_topics = [
    ("Meeting Notes Summarizer", "meeting-notes-summarizer", "meeting documentation", "beginner"),
    ("Action Items Extractor", "action-items-extractor", "task tracking", "beginner"),
    ("Project Plan Generator", "project-plan-generator", "project management", "intermediate"),
    ("Task Breakdown Helper", "task-breakdown", "work decomposition", "beginner"),
    ("Priority Matrix Generator", "priority-matrix", "task prioritization", "beginner"),
    ("Daily Planner Generator", "daily-planner", "day planning", "beginner"),
    ("Weekly Review Template", "weekly-review", "reflection", "beginner"),
    ("Goal Setting Helper", "goal-setting-helper", "goal planning", "beginner"),
    ("Habit Tracker Designer", "habit-tracker", "habit building", "beginner"),
    ("Time Audit Analyzer", "time-audit", "time management", "intermediate"),
    ("Email Triage Assistant", "email-triage", "email management", "beginner"),
    ("Inbox Zero Helper", "inbox-zero", "email organization", "beginner"),
    ("Note Organization Helper", "note-organizer", "knowledge management", "beginner"),
    ("Book Notes Summarizer", "book-notes-summarizer", "reading notes", "beginner"),
    ("Decision Matrix Helper", "decision-matrix", "decision making", "intermediate"),
    ("Problem-Solving Framework", "problem-solving-framework", "issue resolution", "intermediate"),
    ("Brainstorming Facilitator", "brainstorming-facilitator", "idea generation", "beginner"),
    ("Mind Map Creator", "mind-map-creator", "visual thinking", "intermediate"),
    ("Workflow Automation Helper", "workflow-automation", "process efficiency", "intermediate"),
    ("Template Generator", "template-generator", "document templates", "beginner"),
    ("Checklist Generator", "checklist-generator", "process checklists", "beginner"),
    ("SOP Creator", "sop-creator", "standard procedures", "intermediate"),
    ("Delegation Planner", "delegation-planner", "task assignment", "intermediate"),
    ("Communication Planner", "communication-planner", "team communication", "intermediate"),
    ("Presentation Outliner", "presentation-outliner", "slide planning", "intermediate"),
    ("Speech Writer", "speech-writer", "public speaking", "intermediate"),
    ("Negotiation Prep Helper", "negotiation-prep", "deal preparation", "intermediate"),
    ("Conflict Resolution Guide", "conflict-resolution", "interpersonal issues", "intermediate"),
    ("Feedback Framework Helper", "feedback-framework", "performance feedback", "intermediate"),
    ("Coaching Question Helper", "coaching-questions", "mentoring", "intermediate"),
    ("Journaling Prompt Generator", "journaling-prompts", "self-reflection", "beginner"),
    ("Morning Routine Planner", "morning-routine", "daily habits", "beginner"),
    ("Evening Review Prompt", "evening-review", "daily reflection", "beginner"),
    ("Quarterly Planning Helper", "quarterly-planning", "strategic planning", "intermediate"),
    ("Annual Review Writer", "annual-review-writer", "year-end summary", "intermediate"),
    ("Vision Board Helper", "vision-board", "goal visualization", "beginner"),
    ("Personal Mission Statement", "mission-statement-personal", "life purpose", "intermediate"),
    ("Work-Life Balance Planner", "work-life-balance", "balance planning", "intermediate"),
    ("Stress Management Helper", "stress-management", "wellness", "beginner"),
    ("Focus and Deep Work Planner", "deep-work-planner", "concentration", "intermediate"),
]

for title, slug, topic, diff in productivity_topics:
    if slug in existing_slugs:
        continue
    new_entries.append({
        "id": f"prompt-{len(existing) + len(new_entries) + 1:03d}",
        "title": title,
        "slug": slug,
        "category": "productivity",
        "scenario": "productivity-tasks",
        "tools": ["chatgpt", "claude", "gemini"],
        "difficulty": diff,
        "tags": ["productivity", "organization", "planning", "efficiency"],
        "prompt": f"You are an expert productivity coach. Help me with {title.lower()}. [Provide your specific context, goals, and constraints]. Create a practical, actionable framework or document that I can implement immediately. Be specific, concise, and realistic.",
        "when_to_use": f"Improve your productivity with {topic}",
        "bad_example": "Help me be more productive.",
        "good_example": "A specific, actionable framework with clear steps, realistic timelines, and measurable outcomes tailored to your situation.",
        "how_to_customize": "Provide your specific situation, goals, constraints, and current challenges. Include any tools or systems you already use.",
        "advanced_version": f"As a senior productivity consultant, create a comprehensive and personalized {title.lower()} system. Include: current state analysis, specific action steps with timelines, measurable success criteria, potential obstacles with mitigation strategies, integration with existing workflows, and a review cadence for continuous improvement. Context: [DETAILS]. Goals: [SPECIFY]. Constraints: [LIST].",
        "related": ["meeting-summarizer", "task-prioritizer"],
        "featured": False,
        "collection": ["productivity-power-pack"]
    })

print(f"\nTotal new entries: {len(new_entries)}")
print(f"Total after merge: {len(existing) + len(new_entries)}")

# Merge
data["prompts"].extend(new_entries)

# Verify no duplicate slugs
all_slugs = [p["slug"] for p in data["prompts"]]
if len(all_slugs) != len(set(all_slugs)):
    dupes = [s for s in all_slugs if all_slugs.count(s) > 1]
    print(f"WARNING: Duplicate slugs: {set(dupes)}")
    sys.exit(1)

with open(DATA_PATH, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nDone! Written {len(data['prompts'])} total prompts.")

# Final distribution
from collections import Counter
scenarios = Counter(p["scenario"] for p in data["prompts"])
print("\nFinal distribution by scenario:")
for s, c in scenarios.most_common():
    print(f"  {s}: {c}")
