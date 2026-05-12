#!/usr/bin/env python3
"""
Batch RTF (Role-Task-Format) enrichment script for PromptCraft prompts.

Processes all prompts in data/prompts.json:
1. Adds role, task, format fields to every prompt
2. Fixes placeholder text ([SPECIFIC TASK], Help me with...)
3. Converts [variable] syntax to {{variable}}
4. Adds V1.0 version to all prompts

Quality gate: only modifies prompts that pass is_publishable() check.
Skips already-enriched prompts (those with role field already set).
"""

import json
import re

MAX_PER_SCENARIO = 25

def is_publishable(p):
    text = p.get('prompt', '')
    if re.search(r'\[SPECIFIC TASK based on prompt title\]', text): return False
    if re.search(r'^You are an expert\. Help me with', text): return False
    if not p.get('when_to_use') or not p.get('good_example') or not p.get('bad_example') or not p.get('how_to_customize'): return False
    return True

# ─── Role templates per scenario ───
ROLES = {
    'writing-emails': 'You are a senior business communication expert with 15+ years of experience writing executive-level emails, proposals, and professional correspondence. You understand tone, persuasion psychology, and cross-cultural communication norms.',
    'writing-blog-post': 'You are an expert content strategist and SEO-optimized blog writer. You know how to craft engaging articles with clear structure, compelling headlines, and natural keyword integration that ranks well and keeps readers engaged.',
    'creative-writing': 'You are a creative writing expert and published author. You specialize in vivid storytelling, compelling characters, natural dialogue, and genre-specific techniques across fiction, poetry, and screenwriting.',
    'coding-help': 'You are a senior software engineer with deep expertise across multiple programming languages and frameworks. You write clean, production-ready code with proper error handling, documentation, and testing.',
    'data-analysis': 'You are an expert data analyst with strong skills in statistical analysis, data visualization, and business intelligence. You transform raw data into clear, actionable insights.',
    'marketing-copy': 'You are a senior direct-response marketing copywriter with 10+ years of experience writing high-converting copy for SaaS, e-commerce, and B2B brands. You understand consumer psychology and persuasion frameworks.',
    'image-generation': 'You are an expert AI image prompt engineer with deep knowledge of Midjourney, DALL-E, and Stable Diffusion. You understand composition, lighting, style descriptors, and platform-specific prompt syntax.',
    'resume-cover-letter': 'You are an expert career coach and professional resume writer. You help professionals at all levels craft compelling application materials that highlight achievements and align with target roles.',
    'learning-new-topic': 'You are an expert educator who excels at breaking down complex topics into clear, engaging explanations. You use analogies, examples, and structured learning paths to make any subject accessible.',
    'business-planning': 'You are an experienced business consultant and startup strategist. You help entrepreneurs and teams develop actionable business plans, conduct market research, and make data-driven decisions.',
    'productivity-tasks': 'You are an expert productivity coach and workflow optimizer. You design efficient systems for time management, meeting effectiveness, task prioritization, and team collaboration.',
}

# ─── Format templates per scenario ───
FORMATS = {
    'writing-emails': 'Structure the email with:\n**Subject:** [clear, action-oriented subject line]\n**Greeting:** [appropriate salutation]\n**Opening:** [1-2 sentences stating purpose]\n**Body:** [concise paragraphs with key points]\n**Call to Action:** [clear next step]\n**Sign-off:** [professional closing]',
    'writing-blog-post': 'Structure the article with:\n**Title:** [compelling headline]\n**Introduction:** [hook + thesis]\n**Body Sections:** [clear headings with logical flow]\n**Conclusion:** [summary + next step]\n**Meta:** [SEO description and keywords]',
    'creative-writing': 'Structure the piece with:\n**Title/Opening:** [attention-grabbing start]\n**Body:** [vivid scenes, natural dialogue, sensory details]\n**Ending:** [satisfying resolution or hook]\n**Word count:** appropriate to the format',
    'coding-help': 'Structure the response with:\n**Overview:** [what the code does]\n**Code:** [clean, well-commented code block]\n**Explanation:** [key concepts and decisions]\n**Usage:** [example of how to call/use it]\n**Notes:** [edge cases, limitations, or alternatives]',
    'data-analysis': 'Structure the response with:\n**Summary:** [key findings in 2-3 sentences]\n**Analysis:** [methodology and detailed findings]\n**Insights:** [bullet points with actionable takeaways]\n**Recommendations:** [specific next steps]\n**Data Notes:** [assumptions, limitations, or caveats]',
    'marketing-copy': 'Structure the copy with:\n**Headline:** [attention-grabbing, benefit-focused]\n**Hook:** [1-2 sentences identifying pain point or creating curiosity]\n**Body:** [2-3 paragraphs building desire with benefits]\n**Call to Action:** [clear, urgent next step]',
    'image-generation': 'Structure the prompt with:\n**Subject:** [main focus and description]\n**Style:** [artistic style, medium, era]\n**Lighting:** [quality and direction of light]\n**Composition:** [framing, perspective, rule of thirds]\n**Mood/Color:** [atmosphere and palette]\n**Technical:** [aspect ratio, quality tags, platform parameters]',
    'resume-cover-letter': 'Structure the document with:\n**Header:** [name, contact, links]\n**Summary/Objective:** [2-3 sentence value proposition]\n**Experience:** [bullet points with metrics and achievements]\n**Skills:** [relevant, categorized skills]\n**Education/Certifications:** [degrees, credentials]',
    'learning-new-topic': 'Structure the explanation with:\n**Overview:** [what it is in 1-2 sentences]\n**Key Concepts:** [3-5 core ideas with examples]\n**How It Works:** [step-by-step or process explanation]\n**Examples:** [real-world applications]\n**Next Steps:** [how to go deeper]',
    'business-planning': 'Structure the deliverable with:\n**Executive Summary:** [1-2 sentence overview]\n**Analysis:** [detailed findings with evidence]\n**Recommendations:** [specific, actionable steps]\n**Risks/Mitigations:** [potential obstacles and solutions]\n**Timeline:** [phased implementation plan]',
    'productivity-tasks': 'Structure the output with:\n**Overview:** [purpose and scope]\n**Steps/Framework:** [clear, numbered or categorized items]\n**Action Items:** [specific tasks with owners or deadlines]\n**Tips:** [best practices or common pitfalls]\n**Tools:** [recommended tools or templates]',
}

# ─── Task extraction: derive task from title + existing prompt ───
def extract_task(p):
    """Extract a task description from the prompt's existing text."""
    prompt = p.get('prompt', '')
    title = p.get('title', '')

    # Remove common prefix patterns to get the task core
    task = prompt

    # Remove "You are a..." role prefix
    task = re.sub(r'^You are [^.]+\.\s*', '', task)

    # Remove placeholder text
    task = re.sub(r'\[SPECIFIC TASK based on prompt title\]\.?\s*', '', task)

    # Remove "Help me with..." filler
    task = re.sub(r'Help me with [^.]+\.?\s*', '', task)

    # Remove variable placeholders for a cleaner task description
    task = re.sub(r'\[([^\]]+)\]', r'{{\1}}', task)

    # Clean up and truncate
    task = task.strip()
    if len(task) > 300:
        task = task[:297] + '...'

    return task if task else f'Create content based on the title: {title}'

# ─── Fix prompt text ───
def fix_prompt_text(p):
    """Fix placeholder text in the prompt, convert [var] to {{var}}."""
    prompt = p.get('prompt', '')
    title = p.get('title', '')
    scenario = p.get('scenario', '')

    # Fix: [SPECIFIC TASK based on prompt title] → actual task
    if '[SPECIFIC TASK based on prompt title]' in prompt:
        role_match = re.match(r'(You are [^.]+\.)\s*', prompt)
        role = role_match.group(1) if role_match else ''
        # Generate a task from title
        task_from_title = title.lower().replace(' prompt', '').replace(' generator', '').replace(' writer', '')
        task_from_title = task_from_title.replace(' prompt', '').replace(' template', '')

        # Rebuild prompt: keep role, replace placeholder with meaningful task
        after_role = prompt[role_match.end():] if role_match else prompt
        after_role = after_role.replace('[SPECIFIC TASK based on prompt title]. ', '')
        after_role = after_role.replace('[SPECIFIC TASK based on prompt title]', '')

        prompt = f'{role} Create content for: {title}. {after_role.strip()}'

    # Fix: "You are an expert. Help me with X."
    if re.match(r'^You are an expert\. Help me with', prompt):
        role = f'You are an expert {scenario.replace("-", " ")} specialist.'
        task_from_title = title.lower().replace(' prompt', '').replace(' generator', '')
        after = re.sub(r'^You are an expert\. Help me with [^.]+\.?\s*', '', prompt)
        prompt = f'{role} Create content for: {title}. {after.strip()}'

    # Convert [variable] to {{variable}}
    prompt = re.sub(r'\[([a-zA-Z_][a-zA-Z_ ]*)\]', r'{{\1}}', prompt)

    return prompt

# ─── Main ───
with open('/Users/jacky.peng/prompt-site/data/prompts.json', 'r') as f:
    data = json.load(f)

prompts = data['prompts']
counts = {}
published_slugs = set()

# First pass: identify published slugs
for p in prompts:
    if not is_publishable(p): continue
    sc = p['scenario']
    if counts.get(sc, 0) >= MAX_PER_SCENARIO: continue
    counts[sc] = counts.get(sc, 0) + 1
    published_slugs.add(p['slug'])

print(f'Published prompts: {len(published_slugs)}')

# Second pass: enrich published prompts
enriched = 0
fixed = 0
for p in prompts:
    if p['slug'] not in published_slugs:
        continue

    # Skip if already enriched
    if p.get('role'):
        enriched += 1
        continue

    scenario = p['scenario']

    # Add RTF fields
    p['role'] = ROLES.get(scenario, f'You are an expert {scenario.replace("-", " ")} specialist.')
    p['task'] = extract_task(p)
    p['format'] = FORMATS.get(scenario, 'Provide clear, well-structured output with appropriate sections.')

    # Fix prompt text
    old_prompt = p.get('prompt', '')
    p['prompt'] = fix_prompt_text(p)
    if p['prompt'] != old_prompt:
        fixed += 1

    # Add version
    p['version'] = 'V1.0'

    enriched += 1

with open('/Users/jacky.peng/prompt-site/data/prompts.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Enriched: {enriched} prompts with RTF fields')
print(f'Fixed prompt text: {fixed} prompts')
