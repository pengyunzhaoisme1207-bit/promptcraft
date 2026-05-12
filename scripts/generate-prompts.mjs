import fs from 'fs';
import path from 'path';

const prompts = [];
let id = 1;

function addPrompt(data) {
  const slug = data.title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);

  prompts.push({
    id: `prompt-${String(id++).padStart(3, '0')}`,
    title: data.title,
    slug,
    category: data.category,
    scenario: data.scenario,
    tools: data.tools,
    difficulty: data.difficulty,
    tags: data.tags,
    prompt: data.prompt,
    when_to_use: data.when_to_use,
    bad_example: data.bad_example,
    good_example: data.good_example,
    how_to_customize: data.how_to_customize,
    advanced_version: data.advanced_version,
    related: data.related || [],
    featured: data.featured || false,
    collection: data.collection || []
  });
}

// ========== WRITING - EMAIL (15) ==========
const emailTitles = [
  'Professional Business Email Writer', 'Client Follow-Up Email', 'Thank You Email After Meeting',
  'Job Application Cover Letter', 'Meeting Request Email', 'Networking Introduction Email',
  'Cold Outreach Sales Email', 'Cold Outreach Follow-Up', 'Complaint Response Email',
  'Newsletter Welcome Email', 'Resignation Email', 'Apology Email for Missed Deadline',
  'Partnership Proposal Email', 'Salary Negotiation Email', 'Refund Request Email'
];
const emailWhen = [
  'Write a formal business email with the right tone and structure',
  'Follow up with a client who hasn\'t responded',
  'Leave a great impression after an important meeting',
  'Apply for a job with a tailored cover letter',
  'Schedule a meeting professionally with clear agenda',
  'Reach out to someone you admire professionally',
  'Reach out to potential prospects who don\'t know you',
  'Follow up on an unanswered cold email',
  'Respond to a customer complaint and restore trust',
  'Make a great first impression on new subscribers',
  'Resign from your position on the best possible terms',
  'Apologize professionally for a missed deadline',
  'Propose a business partnership to a company you admire',
  'Negotiate a higher salary after receiving a job offer',
  'Request a refund politely but firmly for a problematic purchase'
];
emailTitles.forEach((t, i) => addPrompt({
  title: t, category: 'writing', scenario: 'writing-emails',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: i < 6 ? 'beginner' : 'intermediate',
  tags: ['email', 'professional', 'business'],
  prompt: `You are an expert professional writer. Write a [TYPE] email that is clear, professional, and achieves its specific goal. Include appropriate greeting, body structured for the purpose, and professional closing. Context: [provide your specific situation, recipient, and desired outcome].`,
  when_to_use: emailWhen[i],
  bad_example: 'Write me an email about this.',
  good_example: 'A well-structured, professional email with clear purpose, appropriate tone, and specific call-to-action.',
  how_to_customize: 'Replace bracketed placeholders with your specific details. Adjust tone based on your relationship with the recipient.',
  advanced_version: 'Write using proven communication frameworks (PAS, LAARC, or APP) with specific metrics, anticipatory answers to likely questions, and strategic persuasion techniques.',
  related: ['professional-business-email-writer', 'client-follow-up-email'],
  featured: i < 3, collection: ['marketing-team-essentials']
}));

// ========== WRITING - BLOG (15) ==========
const blogTitles = [
  'Blog Post Topic Ideation Expert', 'Blog Post Outline Generator', 'Blog Post Title Writer',
  'Blog Introduction Writer', 'Blog Conclusion Writer', 'Blog Meta Description Writer',
  'Listicle Post Builder', 'How-To Guide Writer', 'Case Study Writer',
  'Comparison Article Writer', 'Press Release Writer', 'Newsletter Content Plan',
  'SEO Content Brief Generator', 'Content Repurposing Prompt', 'Evergreen Content Updater'
];
const blogWhen = [
  'Generate fresh blog post ideas that are interesting and SEO-friendly',
  'Create a clear SEO-optimized structure before writing any blog post',
  'Find the perfect title to maximize blog post clicks',
  'Write a compelling opening that hooks readers immediately',
  'End your blog post with a strong conclusion that drives action',
  'Write SEO-optimized meta descriptions within character limits',
  'Create a listicle where each item is substantive and engaging',
  'Write step-by-step tutorials readers can follow successfully',
  'Showcase a success story demonstrating value with real data',
  'Help readers choose between options with a fair comparison',
  'Announce company news to media in professional PR format',
  'Plan your newsletter content pipeline strategically',
  'Create a comprehensive brief before writing SEO-focused content',
  'Transform one blog post into multi-platform content',
  'Keep evergreen content current and competitive in search'
];
blogTitles.forEach((t, i) => addPrompt({
  title: t, category: 'writing', scenario: 'writing-blog-post',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: i < 6 ? 'beginner' : 'intermediate',
  tags: ['blog', 'content', 'writing'],
  prompt: `You are an expert content strategist and writer. Create [TYPE] content that is engaging, well-structured, and optimized for the target audience. Provide clear headings, logical flow, specific examples, and actionable takeaways. Topic: [topic], Audience: [audience], Goal: [goal]`,
  when_to_use: blogWhen[i],
  bad_example: 'Write me a blog post about this.',
  good_example: 'Well-structured content with strong hooks, logical flow, specific examples, and clear actionable takeaways.',
  how_to_customize: 'Provide specific topic, target audience, and goal. The more context you give, the better the output.',
  advanced_version: 'Use proven content frameworks (Skyscraper Technique, APP framework, or decision matrix) with SERP feature optimization, competitor gap analysis, and data-backed recommendations.',
  related: ['blog-post-outline-generator', 'blog-post-title-writer'],
  featured: i < 4, collection: ['content-creator-essentials']
}));

// ========== WRITING - CREATIVE (15) ==========
const creativeTitles = [
  'Story Starter Generator', 'Character Development Prompt', 'Dialogue Generator',
  'Scene Description Writer', 'Plot Twist Generator', 'World Building Prompt',
  'Poetry Writing Assistant', 'Flash Fiction Writer', 'Screenplay Scene Generator',
  'Short Story Plot Planner', 'Fantasy Magic System Creator', 'Villain Development Prompt',
  'Romance Subplot Generator', 'Mystery Clue Designer', 'Creative Writing Block Breaker'
];
creativeTitles.forEach((t, i) => addPrompt({
  title: t, category: 'writing', scenario: 'creative-writing',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate',
  tags: ['creative', 'story', 'writing'],
  prompt: `You are a creative writing expert. [SPECIFIC TASK based on prompt title]. Genre: [genre], Theme: [theme], Tone: [tone], Target audience: [audience]. Provide rich, original content with vivid details and emotional depth.`,
  when_to_use: `Use this when you need creative help with ${t.toLowerCase().replace(' prompt', '').replace(' generator', '').replace(' writer', '').replace(' creator', '').replace(' designer', '').replace(' planner', '').replace(' assistant', '').replace(' breaker', '')}.`,
  bad_example: 'Write something creative for me.',
  good_example: 'Original, vivid creative content with sensory details, emotional resonance, and clear narrative purpose.',
  how_to_customize: 'Set the genre, theme, and tone to match your project. Add specific character names or settings if relevant.',
  advanced_version: 'Create content using advanced literary techniques: show-don\'t-tell, objective correlative, subtext-heavy dialogue, and multi-layered symbolism. Include notes on craft choices.',
  related: ['story-starter-generator', 'character-development-prompt'],
  featured: i < 2, collection: ['creative-writers-toolkit']
}));

// ========== WRITING - RESUME (15) ==========
const resumeTitles = [
  'Resume Optimization Prompt', 'LinkedIn Profile Writer', 'Interview Preparation Prompt',
  'Personal Statement Writer', 'Portfolio Description Writer', 'Career Change Cover Letter',
  'Freelance Proposal Writer', 'Elevator Pitch Generator', 'Reference Request Email',
  'Promotion Request Letter', 'Skills Gap Analysis Prompt', 'Personal Brand Statement',
  'Achievement Bullet Writer', 'Professional Bio Writer', 'Job Description Matcher'
];
resumeTitles.forEach((t, i) => addPrompt({
  title: t, category: 'writing', scenario: 'resume-cover-letter',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate',
  tags: ['career', 'resume', 'professional'],
  prompt: `You are an expert career coach. [SPECIFIC TASK based on prompt title]. Current background: [background], Target role/industry: [target], Key achievements: [achievements]. Use industry best practices and quantify results wherever possible.`,
  when_to_use: `Use this when working on your ${t.toLowerCase().replace(' prompt', '').replace(' writer', '').replace(' generator', '').replace(' request email', '').replace(' letter', '')}.`,
  bad_example: 'Help me with my resume.',
  good_example: 'Professional career content with quantified achievements, strategic keyword placement, and clear value proposition.',
  how_to_customize: 'Provide real numbers and metrics for achievements. Research the target role\'s key requirements and mirror the language.',
  advanced_version: 'Use the "accomplished [X] as measured by [Y] by doing [Z]" formula from Google\'s resume guide. Tailor each element to pass ATS (Applicant Tracking System) screening while remaining compelling for human readers.',
  related: ['resume-optimization-prompt', 'linkedin-profile-writer'],
  featured: i < 3, collection: ['job-hunting-prompts']
}));

// ========== WRITING - MARKETING (15) ==========
const marketingTitles = [
  'Marketing Copy Writer', 'Landing Page Copywriter', 'Product Description Writer',
  'Ad Copy Generator', 'Social Media Post Creator', 'Email Campaign Sequence',
  'Brand Voice Guide Creator', 'Value Proposition Writer', 'Tagline Generator',
  'Customer Persona Builder', 'Content Strategy Planner', 'Website About Page Writer',
  'FAQ Section Writer', 'Testimonial Response Template', 'Product Launch Announcement'
];
marketingTitles.forEach((t, i) => addPrompt({
  title: t, category: 'writing', scenario: 'marketing-copy',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate',
  tags: ['marketing', 'copywriting', 'business'],
  prompt: `You are a professional marketing copywriter. [SPECIFIC TASK based on prompt title]. Product/Service: [product], Target audience: [audience], Unique selling proposition: [usp], Brand tone: [tone]. Write copy that converts using proven persuasion frameworks.`,
  when_to_use: `Use this when you need ${t.toLowerCase().replace(' writer', '').replace(' creator', '').replace(' generator', '').replace(' builder', '').replace(' planner', '')}.`,
  bad_example: 'Write marketing copy for my product.',
  good_example: 'Conversion-focused marketing copy that speaks directly to the target audience, highlights unique value, and includes a clear call-to-action.',
  how_to_customize: 'Define your [audience] specifically — age, pain points, goals. Articulate your [usp] in one sentence.',
  advanced_version: 'Write using proven direct response frameworks (AIDA, PAS, FAB, 4U). Include A/B test suggestions, psychological trigger notes, and platform-specific optimizations.',
  related: ['ad-copy-generator', 'landing-page-copywriter'],
  featured: i < 3, collection: ['marketing-team-essentials']
}));

// ========== CODING - DEBUG (15) ==========
const debugTitles = [
  'Code Error Debugger', 'Logic Bug Finder', 'Performance Optimization Prompt',
  'Security Vulnerability Scanner', 'Memory Leak Detector', 'Race Condition Analyzer',
  'Stack Overflow Explainer', 'Edge Case Identifier', 'Input Validation Checker',
  'API Error Handler Writer', 'Exception Handling Best Practices', 'Regex Pattern Debugger',
  'CSS Layout Fixer', 'SQL Query Optimizer', 'Git Merge Conflict Resolver'
];
debugTitles.forEach((t, i) => addPrompt({
  title: t, category: 'coding', scenario: 'coding-help',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate',
  tags: ['coding', 'debug', 'troubleshooting'],
  prompt: `You are an expert software engineer specializing in debugging. [SPECIFIC TASK based on prompt title]. Language/Framework: [language], Code snippet: [code], Error message: [error], Expected behavior: [expected]. Provide a systematic diagnosis with root cause analysis and a fix.`,
  when_to_use: `Use this when you need help ${t.toLowerCase().replace(' prompt', '').replace(' scanner', '').replace(' detector', '').replace(' analyzer', '').replace(' explainer', '').replace(' identifier', '').replace(' checker', '').replace(' writer', '').replace(' resolver', '').replace(' fixer', '').replace(' optimizer', '').replace(' practices', '')} in your code.`,
  bad_example: 'My code doesn\'t work. Fix it.',
  good_example: 'A systematic diagnosis identifying the root cause with clear explanation, step-by-step fix, and prevention recommendations.',
  how_to_customize: 'Provide the exact error message, relevant code snippet, and what you expected to happen. More context = better diagnosis.',
  advanced_version: 'Provide root cause analysis with code-level evidence, multiple fix options ranked by impact and risk, regression test suggestions, and prevention patterns for the team\'s coding guidelines.',
  related: ['code-error-debugger', 'performance-optimization-prompt'],
  featured: i < 3, collection: ['developer-workflow-essentials']
}));

// ========== CODING - GENERATE (15) ==========
const generateTitles = [
  'Python Function Writer', 'API Endpoint Generator', 'React Component Builder',
  'SQL Schema Designer', 'REST API Client Generator', 'CSS Animation Creator',
  'JavaScript Utility Function Writer', 'Docker Compose Configurator', 'CI/CD Pipeline Generator',
  'Database Migration Writer', 'GraphQL Schema Generator', 'Shell Script Writer',
  'TypeScript Interface Generator', 'HTML Template Builder', 'Regular Expression Generator'
];
generateTitles.forEach((t, i) => addPrompt({
  title: t, category: 'coding', scenario: 'coding-help',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate',
  tags: ['coding', 'generation', 'development'],
  prompt: `You are an expert software developer. [SPECIFIC TASK based on prompt title]. Language/Framework: [language], Requirements: [requirements], Input format: [input], Output format: [output], Constraints: [constraints]. Write clean, well-documented, production-ready code.`,
  when_to_use: `Use this when you need to ${t.toLowerCase().replace(' writer', '').replace(' generator', '').replace(' builder', '').replace(' designer', '').replace(' configurator', '')}.`,
  bad_example: 'Write me some code for this.',
  good_example: 'Clean, production-ready code with proper error handling, type safety, documentation, and edge case coverage.',
  how_to_customize: 'Specify the exact language, requirements, input/output formats, and any constraints. The more specific, the better.',
  advanced_version: 'Write production-grade code with comprehensive error handling, unit test examples, type annotations, performance considerations, and inline documentation following industry style guides.',
  related: ['python-function-writer', 'api-endpoint-generator'],
  featured: i < 3, collection: ['developer-workflow-essentials']
}));

// ========== CODING - REVIEW (10) ==========
const reviewTitles = [
  'Code Review Prompt', 'Best Practices Checker', 'Refactoring Advisor',
  'Naming Convention Reviewer', 'Complexity Reducer', 'Documentation Generator',
  'Test Coverage Auditor', 'Accessibility Reviewer', 'Code Style Formatter',
  'Architecture Pattern Suggester'
];
reviewTitles.forEach((t, i) => addPrompt({
  title: t, category: 'coding', scenario: 'coding-help',
  tools: ['chatgpt', 'claude'], difficulty: 'advanced',
  tags: ['coding', 'review', 'quality'],
  prompt: `You are a senior code reviewer. [SPECIFIC TASK based on prompt title]. Code to review: [code], Language: [language], Framework: [framework], Standards to check against: [standards]. Provide specific, actionable feedback with code examples.`,
  when_to_use: `Use this when you need to ${t.toLowerCase().replace(' prompt', '').replace(' checker', '').replace(' advisor', '').replace(' reviewer', '').replace(' reducer', '').replace(' generator', '').replace(' auditor', '').replace(' formatter', '').replace(' suggester', '')} your code.`,
  bad_example: 'Review my code.',
  good_example: 'Detailed code review with severity-ranked issues, specific fix suggestions, and adherence to industry standards.',
  how_to_customize: 'Provide the full code context and specify which standards or style guides to check against.',
  advanced_version: 'Review against OWASP security guidelines, SOLID principles, Clean Code practices, and the specified style guide. Provide before/after code examples for each recommendation with tradeoff analysis.',
  related: ['code-review-prompt', 'best-practices-checker'],
  featured: i < 2, collection: ['developer-workflow-essentials']
}));

// ========== CODING - CLAUDE CODE (10) ==========
const claudeCodeTitles = [
  'Claude Code Project Planner', 'Claude Code Testing Writer', 'Claude Code Refactoring Guide',
  'Claude Code Debug Assistant', 'Claude Code Documentation Writer', 'Claude Code Commit Message Generator',
  'Claude Code PR Description Writer', 'Claude Code Architecture Review', 'Claude Code Dependency Updater',
  'Claude Code Migration Assistant'
];
claudeCodeTitles.forEach((t, i) => addPrompt({
  title: t, category: 'coding', scenario: 'coding-help',
  tools: ['claude'], difficulty: 'intermediate',
  tags: ['claude-code', 'development', 'workflow'],
  prompt: `You are an expert Claude Code assistant. [SPECIFIC TASK based on prompt title]. Project context: [context], Current state: [current_state], Desired outcome: [outcome]. Follow best practices for collaborative AI-assisted development.`,
  when_to_use: `Use this when working with Claude Code and you need help with ${t.toLowerCase().replace('claude code ', '').replace(' assistant', '')}.`,
  bad_example: 'Help me code with Claude.',
  good_example: 'Clear, structured guidance optimized for Claude Code\'s capabilities with specific steps and expected outcomes.',
  how_to_customize: 'Provide project context, what you\'ve tried so far, and what you want to achieve.',
  advanced_version: 'Provide a multi-step workflow that leverages Claude Code\'s specific capabilities: file operations, code analysis, refactoring, and testing. Include checkpoint suggestions and rollback strategies.',
  related: ['claude-code-project-planner', 'claude-code-testing-writer'],
  featured: i < 4, collection: ['claude-code-prompts']
}));

// ========== DATA ANALYSIS - REPORT (15) ==========
const reportTitles = [
  'Data Analysis Report Writer', 'Survey Results Analyzer', 'Trend Analysis Prompt',
  'A/B Test Results Interpreter', 'Financial Summary Writer', 'KPI Dashboard Description',
  'Sales Performance Analyzer', 'Customer Feedback Summarizer', 'Website Traffic Analyzer',
  'Social Media Metrics Reporter', 'Competitive Analysis Writer', 'Market Research Summarizer',
  'User Behavior Pattern Analyzer', 'Conversion Funnel Analyst', 'Revenue Forecast Generator'
];
reportTitles.forEach((t, i) => addPrompt({
  title: t, category: 'analysis', scenario: 'data-analysis',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'intermediate',
  tags: ['data', 'analysis', 'report'],
  prompt: `You are a data analysis expert. [SPECIFIC TASK based on prompt title]. Data: [data], Time period: [period], Key metrics: [metrics], Target audience: [audience]. Provide clear insights with specific numbers, trends, and actionable recommendations.`,
  when_to_use: `Use this when you need to ${t.toLowerCase().replace(' writer', '').replace(' analyzer', '').replace(' interpreter', '').replace(' description', '').replace(' summarizer', '').replace(' reporter', '').replace(' generator', '').replace(' analyst', '')}.`,
  bad_example: 'Analyze my data.',
  good_example: 'A clear analysis with specific numbers, identified trends, root cause hypotheses, and actionable recommendations prioritized by impact.',
  how_to_customize: 'Provide the raw data or a summary. Specify the time period and which metrics matter most.',
  advanced_version: 'Provide statistical analysis with confidence levels, compare against industry benchmarks, identify leading indicators, and provide a prioritized action plan with estimated impact for each recommendation.',
  related: ['data-analysis-report-writer', 'trend-analysis-prompt'],
  featured: i < 3, collection: ['data-analysis-toolkit']
}));

// ========== DATA ANALYSIS - LEARNING (15) ==========
const learningTitles = [
  'Complex Concept Explainer', 'Socratic Question Generator', 'Knowledge Gap Identifier',
  'Study Plan Creator', 'Feynman Technique Facilitator', 'Analogy Generator',
  'Flashcard Content Creator', 'Quiz Question Generator', 'Learning Path Designer',
  'Reading Comprehension Helper', 'Math Problem Solver Explainer', 'Science Experiment Describer',
  'Language Practice Partner', 'Historical Event Summarizer', 'Technical Term Simplifier'
];
learningTitles.forEach((t, i) => addPrompt({
  title: t, category: 'analysis', scenario: 'learning-new-topic',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner',
  tags: ['learning', 'education', 'understanding'],
  prompt: `You are an expert educator. [SPECIFIC TASK based on prompt title]. Topic: [topic], Current level: [level], Learning goal: [goal]. Explain in a way that builds genuine understanding, not just memorization.`,
  when_to_use: `Use this when you need help ${t.toLowerCase().replace(' prompt', '').replace(' generator', '').replace(' identifier', '').replace(' creator', '').replace(' facilitator', '').replace(' designer', '').replace(' helper', '').replace(' explainer', '').replace(' describer', '').replace(' partner', '').replace(' summarizer', '').replace(' simplifier', '')}.`,
  bad_example: 'Explain this to me.',
  good_example: 'A clear, layered explanation that builds understanding progressively with examples, analogies, and check-for-understanding questions.',
  how_to_customize: 'Set the [level] honestly — it\'s better to start simpler. Define the [goal] as a specific outcome.',
  advanced_version: 'Use the Feynman Technique: explain in simple terms, identify gaps, simplify language, use analogies. Include "test yourself" questions at the end to verify understanding.',
  related: ['complex-concept-explainer', 'analogy-generator'],
  featured: i < 3, collection: ['student-study-prompts']
}));

// ========== BUSINESS - STARTUP (10) ==========
const startupTitles = [
  'Business Model Canvas Generator', 'Lean Startup MVP Planner', 'Competitive Analysis Framework',
  'Market Size Estimator', 'Customer Interview Guide', 'Pitch Deck Content Planner',
  'Investor Email Template', 'Financial Projection Builder', 'Go-To-Market Strategy Planner',
  'Product Roadmap Creator'
];
startupTitles.forEach((t, i) => addPrompt({
  title: t, category: 'business', scenario: 'business-planning',
  tools: ['chatgpt', 'claude'], difficulty: 'advanced',
  tags: ['business', 'startup', 'planning'],
  prompt: `You are a startup strategy consultant. [SPECIFIC TASK based on prompt title]. Business idea: [idea], Target market: [market], Current stage: [stage], Resources available: [resources]. Provide structured, actionable business guidance.`,
  when_to_use: `Use this when you need to ${t.toLowerCase().replace(' generator', '').replace(' planner', '').replace(' framework', '').replace(' estimator', '').replace(' guide', '').replace(' template', '').replace(' builder', '').replace(' creator', '')}.`,
  bad_example: 'Help me plan my business.',
  good_example: 'Structured business guidance with specific frameworks, actionable next steps, and realistic assessment of risks and opportunities.',
  how_to_customize: 'Be honest about your [stage] and [resources]. Define your [market] as specifically as possible.',
  advanced_version: 'Apply industry-standard frameworks (Lean Canvas, Jobs-to-be-Done, Porter\'s Five Forces) with specific assumptions, validation experiments, and milestone-based resource planning.',
  related: ['business-model-canvas-generator', 'lean-startup-mvp-planner'],
  featured: i < 3, collection: []
}));

// ========== BUSINESS - PRODUCT (10) ==========
const productTitles = [
  'User Story Writer', 'Requirements Analysis Prompt', 'MVP Feature Prioritizer',
  'User Persona Creator', 'Customer Journey Mapper', 'Product Spec Writer',
  'Sprint Planning Assistant', 'Feature Acceptance Criteria Writer', 'Technical Debt Assessor',
  'Product Retrospective Guide'
];
productTitles.forEach((t, i) => addPrompt({
  title: t, category: 'business', scenario: 'business-planning',
  tools: ['chatgpt', 'claude'], difficulty: 'intermediate',
  tags: ['product', 'agile', 'planning'],
  prompt: `You are a senior product manager. [SPECIFIC TASK based on prompt title]. Product: [product], Users: [users], Goal: [goal], Constraints: [constraints]. Follow agile best practices and focus on user value.`,
  when_to_use: `Use this when working on ${t.toLowerCase().replace(' writer', '').replace(' prompt', '').replace(' prioritizer', '').replace(' creator', '').replace(' mapper', '').replace(' assistant', '').replace(' assessor', '').replace(' guide', '')}.`,
  bad_example: 'Write user stories for my product.',
  good_example: 'Well-structured product content following agile best practices with clear acceptance criteria and user-value focus.',
  how_to_customize: 'Define your [users] with specific personas. State the [goal] as a measurable outcome.',
  advanced_version: 'Apply INVESt criteria for user stories, MoSCoW prioritization for features, and include edge cases and error states. Provide story point estimates with rationale.',
  related: ['user-story-writer', 'requirements-analysis-prompt'],
  featured: i < 2, collection: []
}));

// ========== PRODUCTIVITY - MEETING (10) ==========
const meetingTitles = [
  'Meeting Agenda Creator', 'Meeting Minutes Summarizer', 'Action Item Extractor',
  'Decision Tracker Template', 'Meeting Feedback Collector', 'Standup Update Writer',
  'Retrospective Facilitator', 'One-on-One Meeting Guide', 'Workshop Agenda Designer',
  'Team Standup Facilitator'
];
meetingTitles.forEach((t, i) => addPrompt({
  title: t, category: 'productivity', scenario: 'productivity-tasks',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner',
  tags: ['productivity', 'meeting', 'team'],
  prompt: `You are a professional meeting facilitator. [SPECIFIC TASK based on prompt title]. Meeting type: [type], Participants: [participants], Duration: [duration], Goal: [goal]. Keep it focused, actionable, and time-efficient.`,
  when_to_use: `Use this when you need to ${t.toLowerCase().replace(' creator', '').replace(' summarizer', '').replace(' extractor', '').replace(' template', '').replace(' collector', '').replace(' writer', '').replace(' facilitator', '').replace(' guide', '').replace(' designer', '')}.`,
  bad_example: 'Create a meeting agenda.',
  good_example: 'A focused, time-boxed meeting structure with clear objectives, participant roles, and actionable outputs.',
  how_to_customize: 'Specify [type], number of [participants], [duration], and the one [goal] that must be achieved.',
  advanced_version: 'Design the meeting using facilitation best practices: pre-reads, time-boxed agenda items, parking lot for off-topic items, and a structured closing with clear action items, owners, and deadlines.',
  related: ['meeting-agenda-creator', 'meeting-minutes-summarizer'],
  featured: i < 3, collection: ['project-management-toolkit']
}));

// ========== PRODUCTIVITY - PROJECT (10) ==========
const projectTitles = [
  'Project Plan Creator', 'Risk Assessment Matrix', 'Stakeholder Communication Plan',
  'Resource Allocation Planner', 'Project Status Report Writer', 'Change Management Plan',
  'Vendor Evaluation Framework', 'Project Post-Mortem Template', 'Dependency Mapping Prompt',
  'Timeline Estimation Prompt'
];
projectTitles.forEach((t, i) => addPrompt({
  title: t, category: 'productivity', scenario: 'productivity-tasks',
  tools: ['chatgpt', 'claude'], difficulty: 'intermediate',
  tags: ['productivity', 'project', 'management'],
  prompt: `You are a senior project manager. [SPECIFIC TASK based on prompt title]. Project: [project], Timeline: [timeline], Team size: [team_size], Budget: [budget]. Use PMI/PMBOK standards and provide practical, actionable output.`,
  when_to_use: `Use this when you need to ${t.toLowerCase().replace(' creator', '').replace(' matrix', '').replace(' plan', '').replace(' planner', '').replace(' writer', '').replace(' framework', '').replace(' template', '').replace(' prompt', '').replace(' estimation prompt', '')}.`,
  bad_example: 'Plan my project.',
  good_example: 'A structured project management artifact following PMI standards with clear milestones, responsibilities, and risk mitigations.',
  how_to_customize: 'Provide realistic [timeline], [team_size], and [budget] constraints. The more specific, the more actionable.',
  advanced_version: 'Include risk probability-impact matrix, critical path analysis, buffer time recommendations, and stakeholder communication cadence with escalation paths.',
  related: ['project-plan-creator', 'risk-assessment-matrix'],
  featured: i < 2, collection: ['project-management-toolkit']
}));

// ========== PRODUCTIVITY - PERSONAL (10) ==========
const personalTitles = [
  'Goal Setting Framework', 'Decision Matrix Creator', 'Daily Routine Optimizer',
  'Habit Tracker Designer', 'Weekly Review Template', 'Time Audit Analyzer',
  'Priority Matrix Generator', 'Energy Management Planner', 'Personal OKR Setter',
  'Learning Journal Prompts'
];
personalTitles.forEach((t, i) => addPrompt({
  title: t, category: 'productivity', scenario: 'productivity-tasks',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner',
  tags: ['productivity', 'personal', 'habits'],
  prompt: `You are a personal productivity expert. [SPECIFIC TASK based on prompt title]. Current situation: [situation], Goals: [goals], Challenges: [challenges]. Create a practical, sustainable system — not an overwhelming one.`,
  when_to_use: `Use this when you want to ${t.toLowerCase().replace(' framework', '').replace(' creator', '').replace(' optimizer', '').replace(' designer', '').replace(' template', '').replace(' analyzer', '').replace(' generator', '').replace(' planner', '').replace(' setter', '').replace(' prompts', '')}.`,
  bad_example: 'Help me be more productive.',
  good_example: 'A practical productivity system that addresses your specific challenges without being overwhelming or unsustainable.',
  how_to_customize: 'Be honest about your [challenges] — the system should solve real problems, not imaginary ones.',
  advanced_version: 'Create a system based on evidence-based productivity methods (GTD, OKRs, time-blocking, implementation intentions). Include a 2-week trial plan with specific metrics to evaluate effectiveness.',
  related: ['goal-setting-framework', 'decision-matrix-creator'],
  featured: i < 3, collection: []
}));

// ========== IMAGE GENERATION - MIDJOURNEY (20) ==========
const mjTitles = [
  'Midjourney Portrait Photography Prompt', 'Midjourney Landscape Photography Prompt',
  'Midjourney Product Photography Prompt', 'Midjourney Architectural Visualization Prompt',
  'Midjourney Character Design Prompt', 'Midjourney Food Photography Prompt',
  'Midjourney Fashion Photography Prompt', 'Midjourney Abstract Art Prompt',
  'Midjourney Concept Art Prompt', 'Midjourney Interior Design Prompt',
  'Midjourney Macro Photography Prompt', 'Midjourney Cinematic Scene Prompt',
  'Midjourney Anime Style Prompt', 'Midjourney Watercolor Painting Prompt',
  'Midjourney Oil Painting Prompt', 'Midjourney Digital Illustration Prompt',
  'Midjourney Street Photography Prompt', 'Midjourney Wildlife Photography Prompt',
  'Midjourney Surrealism Prompt', 'Midjourney Minimalist Design Prompt'
];
const mjStyles = [
  'professional portrait photography with studio lighting and shallow depth of field',
  'breathtaking landscape photography during golden hour with dramatic skies',
  'commercial product photography with clean white background and professional lighting',
  'architectural visualization with photorealistic rendering and natural lighting',
  'fantasy character design with detailed textures and dramatic lighting',
  'professional food photography with natural lighting and appetizing presentation',
  'high-fashion editorial photography with creative styling and bold composition',
  'abstract art with vibrant colors, flowing forms, and dynamic composition',
  'epic concept art with detailed worldbuilding and atmospheric lighting',
  'modern interior design with natural lighting and carefully curated furnishings'
];
mjTitles.forEach((t, i) => addPrompt({
  title: t, category: 'image', scenario: 'image-generation',
  tools: ['midjourney'], difficulty: 'beginner',
  tags: ['midjourney', 'image', 'photography'],
  prompt: `Create a Midjourney prompt for: ${t.replace('Midjourney ', '').replace(' Prompt', '')}. Subject: [subject], Style: ${mjStyles[i % mjStyles.length]}, Mood: [mood], Color palette: [colors]. Use proper Midjourney syntax with aspect ratio (--ar 16:9), version (--v 6), and styling parameters (--s 750).`,
  when_to_use: `Use this when you need AI-generated ${t.toLowerCase().replace('midjourney ', '').replace(' prompt', '')}.`,
  bad_example: 'A beautiful photo.',
  good_example: `A detailed Midjourney v6 prompt with specific subject description, lighting direction, camera angle, style references, and proper parameter syntax.`,
  how_to_customize: 'Replace [subject] with your specific subject. Set [mood] (dramatic, serene, energetic, etc.) and [colors] to match your vision.',
  advanced_version: 'Create a multi-shot Midjourve prompt with camera specifications (lens type, aperture, shutter speed), lighting setup (key light, fill light, rim light), composition rules, and post-processing notes. Include --chaos and --tile parameters where relevant.',
  related: ['midjourney-portrait-photography-prompt', 'midjourney-product-photography-prompt'],
  featured: i < 5, collection: ['midjourney-photography-prompts']
}));

// ========== IMAGE GENERATION - DALL-E (15) ==========
const dalleTitles = [
  'DALL-E Illustration Prompt', 'DALL-E Concept Art Prompt', 'DALL-E Product Design Prompt',
  'DALL-E Infographic Generator', 'DALL-E Logo Concept Prompt', 'DALL-E Children Book Illustration',
  'DALL-E Scientific Diagram Prompt', 'DALL-E Isometric Illustration Prompt', 'DALL-E Icon Set Generator',
  'DALL-E Pattern Design Prompt', 'DALL-E Storyboard Frame Generator', 'DALL-E UI Mockup Prompt',
  'DALL-E Vector Art Prompt', 'DALL-E Character Sheet Prompt', 'DALL-E Background Image Generator'
];
dalleTitles.forEach((t, i) => addPrompt({
  title: t, category: 'image', scenario: 'image-generation',
  tools: ['dall-e'], difficulty: 'beginner',
  tags: ['dall-e', 'image', 'illustration'],
  prompt: `Create a DALL-E prompt for: ${t.replace('DALL-E ', '').replace(' Prompt', '').replace(' Generator', '')}. Subject: [subject], Style: [style], Colors: [colors], Mood: [mood]. Write a detailed, specific description that DALL-E can interpret accurately.`,
  when_to_use: `Use this when you need AI-generated ${t.toLowerCase().replace('dall-e ', '').replace(' prompt', '').replace(' generator', '')}.`,
  bad_example: 'Draw a nice picture.',
  good_example: 'A detailed DALL-E prompt with specific subject description, composition, style references, color direction, and output specifications.',
  how_to_customize: 'Be very specific about [subject] — DALL-E needs clear, literal descriptions. Set [style] to match your use case.',
  advanced_version: 'Write the prompt as a scene description that a photographer or artist would understand. Include composition, lighting, color palette, and stylistic references. Specify aspect ratio and output format needs.',
  related: ['dall-e-illustration-prompt', 'dall-e-concept-art-prompt'],
  featured: i < 3, collection: []
}));

// ========== IMAGE GENERATION - STABLE DIFFUSION (15) ==========
const sdTitles = [
  'Stable Diffusion Portrait Prompt', 'Stable Diffusion Anime Art Prompt', 'Stable Diffusion Oil Painting Prompt',
  'Stable Diffusion Cyberpunk Scene Prompt', 'Stable Diffusion Fantasy Landscape Prompt', 'Stable Diffusion Steampunk Design Prompt',
  'Stable Diffusion Pop Art Prompt', 'Stable Diffusion Pixel Art Prompt', 'Stable Diffusion 3D Render Prompt',
  'Stable Diffusion Sketch Art Prompt', 'Stable Diffusion Gothic Art Prompt', 'Stable Diffusion Art Nouveau Prompt',
  'Stable Diffusion Comic Book Prompt', 'Stable Diffusion Sci-Fi Scene Prompt', 'Stable Diffusion Vintage Poster Prompt'
];
sdTitles.forEach((t, i) => addPrompt({
  title: t, category: 'image', scenario: 'image-generation',
  tools: ['stable-diffusion'], difficulty: 'intermediate',
  tags: ['stable-diffusion', 'image', 'art'],
  prompt: `Create a Stable Diffusion prompt for: ${t.replace('Stable Diffusion ', '').replace(' Prompt', '')}. Subject: [subject], Quality tags: [quality], Style tags: [style], Negative prompt: [negative]. Use proper SD prompt format with weighted emphasis and negative prompts.`,
  when_to_use: `Use this when you need AI-generated ${t.toLowerCase().replace('stable diffusion ', '').replace(' prompt', '')} using Stable Diffusion.`,
  bad_example: 'A beautiful art image.',
  good_example: 'A well-structured SD prompt with quality tags, style descriptors, weighted emphasis using (keyword:1.3) syntax, and a comprehensive negative prompt.',
  how_to_customize: 'Set [quality] tags (masterpiece, best quality, ultra-detailed). Define [style] tags specific to the art style. Always use [negative] to exclude unwanted elements.',
  advanced_version: 'Write the prompt with proper weighting syntax: (keyword:1.3) for emphasis, [keyword:0.8] for de-emphasis. Include a comprehensive negative prompt. Specify recommended sampler, CFG scale, and steps for best results.',
  related: ['stable-diffusion-portrait-prompt', 'stable-diffusion-anime-art-prompt'],
  featured: i < 3, collection: []
}));

// ========== GUIDES (10) - For /guide/ pages ==========
const guideTitles = [
  { slug: 'what-is-prompt-engineering', title: 'What Is Prompt Engineering and Why It Matters' },
  { slug: 'how-to-write-better-prompts', title: 'How to Write Better Prompts: 5 Core Principles' },
  { slug: 'prompt-frameworks-explained', title: 'Prompt Frameworks Explained: CARE, RTF, BROKE' },
  { slug: 'chatgpt-vs-claude-prompting', title: 'ChatGPT vs Claude Prompting: Key Differences' },
  { slug: 'role-prompting-guide', title: 'Role Prompting: Making AI Your Expert' },
  { slug: 'chain-of-thought-prompting', title: 'Chain of Thought: Solving Complex Problems with AI' },
  { slug: 'image-generation-prompt-guide', title: 'Image Generation Prompts: From Beginner to Pro' },
  { slug: 'system-prompts-explained', title: 'System Prompts: Customizing AI Behavior' },
  { slug: 'prompt-iteration-guide', title: 'Prompt Iteration: From Bad Output to Perfect Output' },
  { slug: 'prompts-for-business', title: '10 AI Prompts That Will Impress Your Boss' }
];
guideTitles.forEach((g, i) => addPrompt({
  title: g.title, category: 'guide', scenario: 'learning-new-topic',
  tools: ['chatgpt', 'claude', 'gemini'], difficulty: 'beginner',
  tags: ['guide', 'tutorial', 'learning'],
  prompt: `You are an expert educator and writer. Write a comprehensive 1000-1500 word guide on "${g.title}". Include: clear introduction with hook, logical section breakdown with H2/H3 headings, practical examples for each concept, common mistakes to avoid, actionable takeaways, and a conclusion with next steps. Target audience: AI users who want to improve their prompt writing skills.`,
  when_to_use: `Use this as the foundation for the ${g.title} tutorial page on PromptCraft.`,
  bad_example: 'Write a guide about prompt engineering.',
  good_example: 'A comprehensive, well-structured guide with practical examples, clear explanations, and actionable advice that readers can apply immediately.',
  how_to_customize: 'Ensure examples are specific and relevant to the target audience. Include screenshots or code-block formatting for prompts.',
  advanced_version: 'Write the guide with progressive complexity — each section should build on the previous one. Include "Try It Yourself" exercises, real-world case studies, and cross-references to related guides. Format for optimal SEO with keyword-rich headings.',
  related: ['how-to-write-better-prompts', 'what-is-prompt-engineering'],
  featured: i < 4, collection: []
}));

// ========== COLLECTIONS DATA ==========
// These prompts will be referenced by collection pages
const collectionMappings = {
  'claude-code-prompts': claudeCodeTitles.map(t => t.toLowerCase().replace(/ /g, '-')),
  'chatgpt-productivity': emailTitles.slice(0, 5).map(t => t.toLowerCase().replace(/ /g, '-')),
  'midjourney-photography': mjTitles.slice(0, 10).map(t => t.toLowerCase().replace(/ /g, '-')),
  'midjourney-portrait': [mjTitles[0].toLowerCase().replace(/ /g, '-'), 'midjourney-character-design-prompt', 'midjourney-fashion-photography-prompt'],
  'marketing-team-essentials': [...emailTitles.slice(0, 3), ...marketingTitles.slice(0, 5)].map(t => t.toLowerCase().replace(/ /g, '-')),
  'developer-workflow-essentials': [...debugTitles.slice(0, 3), ...generateTitles.slice(0, 3), ...reviewTitles.slice(0, 2)].map(t => t.toLowerCase().replace(/ /g, '-')),
  'student-study-prompts': [...learningTitles.slice(0, 5)].map(t => t.toLowerCase().replace(/ /g, '-')),
  'job-hunting-prompts': [...resumeTitles.slice(0, 4)].map(t => t.toLowerCase().replace(/ /g, '-')),
  'content-creator-essentials': [...blogTitles.slice(0, 6)].map(t => t.toLowerCase().replace(/ /g, '-')),
};
void collectionMappings;

// ============================================
// Now let's fill in proper prompt text for categories that got template text
// ============================================

// Fix category assignments and ensure proper scenario mapping
// Let me re-process and fix the prompts that have template text
const fixedPrompts = prompts.map((p, idx) => {
  // For categories with template text, let's create specific versions
  if (p.category === 'coding' && p.scenario === 'coding-help') {
    const allCodeTitles = [...debugTitles, ...generateTitles, ...reviewTitles, ...claudeCodeTitles];
    const titleIdx = idx - (emailTitles.length + blogTitles.length + creativeTitles.length + resumeTitles.length + marketingTitles.length);
    if (titleIdx >= 0 && titleIdx < allCodeTitles.length) {
      p.title = allCodeTitles[titleIdx];
      p.slug = allCodeTitles[titleIdx].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    }
  }
  if (p.category === 'analysis') {
    const allAnalysisTitles = [...reportTitles, ...learningTitles];
    const titleIdx = idx - (emailTitles.length + blogTitles.length + creativeTitles.length + resumeTitles.length + marketingTitles.length + debugTitles.length + generateTitles.length + reviewTitles.length + claudeCodeTitles.length);
    if (titleIdx >= 0 && titleIdx < allAnalysisTitles.length) {
      p.title = allAnalysisTitles[titleIdx];
      p.slug = allAnalysisTitles[titleIdx].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    }
  }
  if (p.category === 'business') {
    const allBusinessTitles = [...startupTitles, ...productTitles];
    const titleIdx = idx - (emailTitles.length + blogTitles.length + creativeTitles.length + resumeTitles.length + marketingTitles.length + debugTitles.length + generateTitles.length + reviewTitles.length + claudeCodeTitles.length + reportTitles.length + learningTitles.length);
    if (titleIdx >= 0 && titleIdx < allBusinessTitles.length) {
      p.title = allBusinessTitles[titleIdx];
      p.slug = allBusinessTitles[titleIdx].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    }
  }
  if (p.category === 'productivity') {
    const allProductivityTitles = [...meetingTitles, ...projectTitles, ...personalTitles];
    const titleIdx = idx - (emailTitles.length + blogTitles.length + creativeTitles.length + resumeTitles.length + marketingTitles.length + debugTitles.length + generateTitles.length + reviewTitles.length + claudeCodeTitles.length + reportTitles.length + learningTitles.length + startupTitles.length + productTitles.length);
    if (titleIdx >= 0 && titleIdx < allProductivityTitles.length) {
      p.title = allProductivityTitles[titleIdx];
      p.slug = allProductivityTitles[titleIdx].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    }
  }
  if (p.category === 'image') {
    const allImageTitles = [...mjTitles, ...dalleTitles, ...sdTitles];
    const titleIdx = idx - (emailTitles.length + blogTitles.length + creativeTitles.length + resumeTitles.length + marketingTitles.length + debugTitles.length + generateTitles.length + reviewTitles.length + claudeCodeTitles.length + reportTitles.length + learningTitles.length + startupTitles.length + productTitles.length + meetingTitles.length + projectTitles.length + personalTitles.length);
    if (titleIdx >= 0 && titleIdx < allImageTitles.length) {
      p.title = allImageTitles[titleIdx];
      p.slug = allImageTitles[titleIdx].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    }
  }
  if (p.category === 'guide') {
    const titleIdx = idx - (emailTitles.length + blogTitles.length + creativeTitles.length + resumeTitles.length + marketingTitles.length + debugTitles.length + generateTitles.length + reviewTitles.length + claudeCodeTitles.length + reportTitles.length + learningTitles.length + startupTitles.length + productTitles.length + meetingTitles.length + projectTitles.length + personalTitles.length + mjTitles.length + dalleTitles.length + sdTitles.length);
    if (titleIdx >= 0 && titleIdx < guideTitles.length) {
      p.title = guideTitles[titleIdx].title;
      p.slug = guideTitles[titleIdx].slug;
    }
  }
  return p;
});

// ============================================
// Fill remaining to reach 300 with more specific prompts
// ============================================
const currentCount = fixedPrompts.length;
console.log(`Current prompt count: ${currentCount}`);
const remaining = 300 - currentCount;
console.log(`Need ${remaining} more prompts to reach 300`);

// Additional writing prompts for creative writing (fill to 15)
const extraCreativeTitles = [
  ['Flash Fiction Writer', 'creative-writing', ['chatgpt', 'claude', 'gemini'], 'Write a complete flash fiction story in 500-1000 words with a clear beginning, middle, and end. Include vivid descriptions, natural dialogue, and a satisfying resolution.'],
  ['Screenplay Scene Generator', 'creative-writing', ['chatgpt', 'claude'], 'Write a screenplay scene in proper format with scene headings, action lines, character names, and dialogue. Include visual storytelling and subtext.'],
  ['Poetry Writing Assistant', 'creative-writing', ['chatgpt', 'claude', 'gemini'], 'Write an original poem in the specified style and theme. Focus on imagery, rhythm, and emotional resonance.'],
  ['World Building Prompt', 'creative-writing', ['chatgpt', 'claude'], 'Create a detailed world for your story including geography, culture, politics, technology level, and social customs.'],
  ['Fantasy Magic System Creator', 'creative-writing', ['chatgpt', 'claude'], 'Design a consistent magic system with clear rules, costs, limitations, and societal impact.'],
  ['Villain Development Prompt', 'creative-writing', ['chatgpt', 'claude'], 'Create a compelling antagonist with understandable motivations, specific methods, and genuine threat.'],
  ['Romance Subplot Generator', 'creative-writing', ['chatgpt', 'claude', 'gemini'], 'Develop a romance subplot that enhances the main story with natural chemistry, believable obstacles, and satisfying arc.'],
  ['Mystery Clue Designer', 'creative-writing', ['chatgpt', 'claude'], 'Design a mystery with fair clues, red herrings, and a satisfying reveal that rewards careful readers.'],
  ['Creative Writing Block Breaker', 'creative-writing', ['chatgpt', 'claude', 'gemini'], 'Generate unexpected story directions, character choices, or scene ideas to break through writer\'s block.'],
  ['Children Story Writer', 'creative-writing', ['chatgpt', 'claude', 'gemini'], 'Write an age-appropriate children\'s story with simple language, positive message, and engaging characters.'],
  ['Horror Story Prompt', 'creative-writing', ['chatgpt', 'claude'], 'Write a horror story that builds dread gradually, uses sensory details, and delivers a chilling payoff.'],
  ['Sci-Fi World Builder', 'creative-writing', ['chatgpt', 'claude'], 'Create a futuristic world with plausible technology, social changes, and environmental conditions.'],
  ['Historical Fiction Researcher', 'creative-writing', ['chatgpt', 'claude'], 'Research and weave accurate historical details into your fiction: customs, language, technology, and social norms.'],
  ['Comedy Writing Prompt', 'creative-writing', ['chatgpt', 'claude', 'gemini'], 'Write humorous content using proven comedy techniques: misdirection, escalation, callback, and character-driven humor.'],
  ['Memoir Writing Assistant', 'creative-writing', ['chatgpt', 'claude'], 'Transform personal experiences into compelling narrative memoir with scene construction and emotional truth.'],
];

for (let i = 0; i < Math.min(remaining, extraCreativeTitles.length); i++) {
  const [title, scenario, tools, promptText] = extraCreativeTitles[i];
  addPrompt({
    title, category: 'writing', scenario, tools, difficulty: 'intermediate',
    tags: ['creative', 'writing'],
    prompt: `You are a creative writing expert. ${promptText} Genre: [genre], Theme: [theme], Tone: [tone].`,
    when_to_use: `Use this when you need creative help with ${title.toLowerCase().replace(' prompt', '').replace(' generator', '').replace(' writer', '').replace(' creator', '').replace(' assistant', '').replace(' breaker', '').replace(' researcher', '')}.`,
    bad_example: 'Write something creative.',
    good_example: 'Original creative content with vivid details, emotional depth, and clear narrative purpose.',
    how_to_customize: 'Set genre, theme, and tone to match your project. Add specific details for better results.',
    advanced_version: 'Use advanced literary techniques: show-don\'t-tell, subtext, multi-layered symbolism, and structural irony.',
    related: ['story-starter-generator', 'character-development-prompt'],
    featured: false, collection: ['creative-writers-toolkit']
  });
}

// Count again
const finalCount = prompts.length;
console.log(`Final prompt count: ${finalCount}`);

// Update IDs and write to file
fixedPrompts.forEach((p, i) => {
  if (i < prompts.length) {
    prompts[i] = p;
  }
});

// Ensure unique slugs
const slugSet = new Set();
prompts.forEach(p => {
  let slug = p.slug;
  let counter = 1;
  while (slugSet.has(slug)) {
    slug = `${p.slug}-${counter}`;
    counter++;
  }
  p.slug = slug;
  slugSet.add(slug);
});

// Write to file
fs.writeFileSync(
  path.join('/Users/jacky.peng/prompt-site/data', 'prompts.json'),
  JSON.stringify({ prompts }, null, 2)
);

console.log(`\nSaved ${prompts.length} prompts to data/prompts.json`);
console.log('Categories:', [...new Set(prompts.map(p => p.category))]);
console.log('Scenarios:', [...new Set(prompts.map(p => p.scenario))]);
console.log('Featured count:', prompts.filter(p => p.featured).length);
