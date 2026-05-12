'use client';

import { useState } from 'react';
import { readGeneratorTemplates } from '@/lib/data';

interface Template {
  type: string;
  label: string;
  template: string;
  fields: { name: string; label: string; placeholder: string }[];
}

// Client-side data loading since this is a client component
const templates: Template[] = [
  {
    type: "write-email", label: "Write an Email",
    template: "You are a professional business communication specialist. Write a {tone} email to {recipient} about {topic}. The email should be {length} and include: {key_points}. Use {formality_level} language throughout.",
    fields: [
      { name: "tone", label: "Tone", placeholder: "professional, friendly, urgent" },
      { name: "recipient", label: "Recipient", placeholder: "my client Sarah, the marketing team" },
      { name: "topic", label: "Topic", placeholder: "project delay, meeting request, follow-up" },
      { name: "length", label: "Length", placeholder: "brief (3-4 paragraphs), detailed" },
      { name: "key_points", label: "Key Points", placeholder: "the new deadline, what caused the delay, proposed solution" },
      { name: "formality_level", label: "Formality", placeholder: "formal, semi-formal, casual" },
    ]
  },
  {
    type: "write-blog-post", label: "Write a Blog Post",
    template: "You are an expert content writer. Write a {tone} blog post about {topic} for {audience}. The post should be {length} words and cover: {key_topics}. Use a {structure} structure with clear headings.",
    fields: [
      { name: "topic", label: "Topic", placeholder: "AI tools for small business" },
      { name: "audience", label: "Target Audience", placeholder: "small business owners with no tech background" },
      { name: "length", label: "Word Count", placeholder: "800-1000, 1500-2000" },
      { name: "key_topics", label: "Key Topics", placeholder: "cost savings, ease of use, top 3 tools" },
      { name: "tone", label: "Tone", placeholder: "informative, conversational, authoritative" },
      { name: "structure", label: "Structure", placeholder: "list, how-to guide, comparison" },
    ]
  },
  {
    type: "analyze-data", label: "Analyze Data",
    template: "You are a data analyst. Analyze the following data and provide insights. Data: {data}. Focus on: {focus_area}. Present findings in {format}. The audience is {audience}.",
    fields: [
      { name: "data", label: "Data Description", placeholder: "Monthly sales data for the past 12 months" },
      { name: "focus_area", label: "Focus Area", placeholder: "trends, anomalies, growth patterns" },
      { name: "format", label: "Format", placeholder: "bullet points, table, executive summary" },
      { name: "audience", label: "Audience", placeholder: "executives, technical team, general audience" },
    ]
  },
  {
    type: "generate-code", label: "Generate Code",
    template: "You are an expert {language} developer. Write code that {task}. Requirements: {requirements}. Include error handling, comments, and follow {style} best practices.",
    fields: [
      { name: "language", label: "Language", placeholder: "Python, JavaScript, TypeScript, Go" },
      { name: "task", label: "What should it do?", placeholder: "parse a CSV file and calculate statistics" },
      { name: "requirements", label: "Requirements", placeholder: "handle missing data, support large files" },
      { name: "style", label: "Style Guide", placeholder: "PEP 8, Airbnb, Google" },
    ]
  },
  {
    type: "create-image", label: "Create an Image Prompt",
    template: "Create a detailed AI image generation prompt for: {subject}. Style: {style}. Mood: {mood}. Lighting: {lighting}. Composition: {composition}. Platform: {platform}.",
    fields: [
      { name: "subject", label: "Subject", placeholder: "a woman working on a laptop in a coffee shop" },
      { name: "style", label: "Style", placeholder: "photorealistic, illustration, oil painting" },
      { name: "mood", label: "Mood", placeholder: "warm, dramatic, serene, energetic" },
      { name: "lighting", label: "Lighting", placeholder: "golden hour, studio, natural window light" },
      { name: "composition", label: "Composition", placeholder: "close-up, wide angle, rule of thirds" },
      { name: "platform", label: "Platform", placeholder: "Midjourney, DALL-E, Stable Diffusion" },
    ]
  },
  {
    type: "brainstorm-ideas", label: "Brainstorm Ideas",
    template: "You are a creative strategist. Generate {count} ideas for {topic}. Target audience: {audience}. Goal: {goal}. Each idea should include: title, brief description, and why it works.",
    fields: [
      { name: "count", label: "Number of Ideas", placeholder: "5, 10, 15" },
      { name: "topic", label: "Topic", placeholder: "marketing campaign for a new app" },
      { name: "audience", label: "Target Audience", placeholder: "millennials interested in fitness" },
      { name: "goal", label: "Goal", placeholder: "brand awareness, lead generation, user engagement" },
    ]
  },
  {
    type: "write-social-post", label: "Write a Social Media Post",
    template: "You are a social media expert. Write a {platform} post about {topic}. Tone: {tone}. Include: {elements}. Keep it within {limit} characters. Target audience: {audience}.",
    fields: [
      { name: "platform", label: "Platform", placeholder: "Twitter/X, LinkedIn, Instagram" },
      { name: "topic", label: "Topic", placeholder: "our new product launch" },
      { name: "tone", label: "Tone", placeholder: "professional, casual, exciting" },
      { name: "elements", label: "Include", placeholder: "a question, a call-to-action, hashtags" },
      { name: "limit", label: "Character Limit", placeholder: "280, 500, 2200" },
      { name: "audience", label: "Audience", placeholder: "industry professionals, general consumers" },
    ]
  },
  {
    type: "explain-concept", label: "Explain a Concept",
    template: "You are a patient teacher. Explain {concept} to {audience} in a way that is {approach}. Use {examples} to make it concrete. Keep it under {length} words.",
    fields: [
      { name: "concept", label: "Concept", placeholder: "blockchain, machine learning, SEO" },
      { name: "audience", label: "Audience", placeholder: "a 10-year-old, a college student, a business professional" },
      { name: "approach", label: "Approach", placeholder: "simple and clear, detailed and technical" },
      { name: "examples", label: "Examples", placeholder: "real-world examples, everyday analogies" },
      { name: "length", label: "Max Words", placeholder: "200, 500, 1000" },
    ]
  },
  {
    type: "create-plan", label: "Create a Plan",
    template: "You are a project management expert. Create a detailed plan for {goal}. Timeline: {timeline}. Resources: {resources}. Include: {sections}. Present in {format}.",
    fields: [
      { name: "goal", label: "Goal", placeholder: "launch a new website, organize a conference" },
      { name: "timeline", label: "Timeline", placeholder: "2 weeks, 3 months, 6 months" },
      { name: "resources", label: "Resources", placeholder: "team of 5, $10k budget" },
      { name: "sections", label: "Include", placeholder: "milestones, risk assessment, resource allocation" },
      { name: "format", label: "Format", placeholder: "table, bullet points, detailed narrative" },
    ]
  },
  {
    type: "translate-rewrite", label: "Translate or Rewrite",
    template: "Rewrite the following text to be more {quality}. Original: {original_text}. Target tone: {tone}. Target audience: {audience}. Keep the key message but make it {style}.",
    fields: [
      { name: "quality", label: "Make it more...", placeholder: "professional, concise, persuasive" },
      { name: "original_text", label: "Original Text", placeholder: "Paste your text here" },
      { name: "tone", label: "Target Tone", placeholder: "formal, conversational, urgent" },
      { name: "audience", label: "Target Audience", placeholder: "customers, colleagues, executives" },
      { name: "style", label: "Style", placeholder: "shorter, more detailed, use active voice" },
    ]
  },
  {
    type: "summarize", label: "Summarize Content",
    template: "You are an expert analyst. Summarize the following content. Source: {source_type}. Focus on: {focus}. Length: {length}. Format: {format}. Key audience: {audience}.",
    fields: [
      { name: "source_type", label: "Source Type", placeholder: "article, report, meeting transcript" },
      { name: "focus", label: "Focus On", placeholder: "key findings, action items, main arguments" },
      { name: "length", label: "Summary Length", placeholder: "one paragraph, 3 bullet points" },
      { name: "format", label: "Format", placeholder: "bullet points, narrative, table" },
      { name: "audience", label: "Audience", placeholder: "executives, technical team, general" },
    ]
  },
  {
    type: "create-list", label: "Create a List",
    template: "You are an expert curator. Create a list of {count} {topic}. Criteria: {criteria}. For each item include: {details}. Target audience: {audience}.",
    fields: [
      { name: "count", label: "Number of Items", placeholder: "5, 10, 20" },
      { name: "topic", label: "Topic", placeholder: "best AI tools for writing" },
      { name: "criteria", label: "Selection Criteria", placeholder: "free or freemium, highly rated" },
      { name: "details", label: "Details per Item", placeholder: "name, description, pros/cons, pricing" },
      { name: "audience", label: "Audience", placeholder: "beginners, professionals, students" },
    ]
  },
  {
    type: "compare-options", label: "Compare Options",
    template: "You are an objective analyst. Compare the following options: {option_a} vs {option_b}. Comparison criteria: {criteria}. Present as: {format}. Recommendation: {recommendation_type}.",
    fields: [
      { name: "option_a", label: "Option A", placeholder: "ChatGPT Plus" },
      { name: "option_b", label: "Option B", placeholder: "Claude Pro" },
      { name: "criteria", label: "Criteria", placeholder: "price, quality, ease of use, features" },
      { name: "format", label: "Format", placeholder: "comparison table, pros/cons list" },
      { name: "recommendation_type", label: "Recommendation", placeholder: "overall best, best for beginners" },
    ]
  },
  {
    type: "write-presentation", label: "Write a Presentation",
    template: "You are a presentation expert. Create a {count}-slide presentation about {topic}. Audience: {audience}. Goal: {goal}. Each slide should include: {elements}. Tone: {tone}.",
    fields: [
      { name: "count", label: "Number of Slides", placeholder: "5, 10, 15" },
      { name: "topic", label: "Topic", placeholder: "Q4 results, product pitch" },
      { name: "audience", label: "Audience", placeholder: "executives, clients, team members" },
      { name: "goal", label: "Goal", placeholder: "inform, persuade, teach, inspire" },
      { name: "elements", label: "Per Slide Include", placeholder: "title, key point, speaker notes" },
      { name: "tone", label: "Tone", placeholder: "professional, casual, energetic" },
    ]
  },
  {
    type: "debug-code", label: "Debug Code",
    template: "You are an expert debugger. Find and fix the bug in this {language} code: {code_description}. The error is: {error}. Expected behavior: {expected}. Actual behavior: {actual}. Explain the fix step by step.",
    fields: [
      { name: "language", label: "Language", placeholder: "Python, JavaScript, TypeScript, Java" },
      { name: "code_description", label: "What does the code do?", placeholder: "a function that sorts a list" },
      { name: "error", label: "Error Message", placeholder: "TypeError: list indices must be integers" },
      { name: "expected", label: "Expected Behavior", placeholder: "returns a sorted list" },
      { name: "actual", label: "Actual Behavior", placeholder: "crashes on the third element" },
    ]
  },
  {
    type: "create-workflow", label: "Create a Workflow",
    template: "You are a process optimization expert. Design a workflow for {task}. Steps: {steps_type}. Tools used: {tools}. Team size: {team_size}. Include: {elements}.",
    fields: [
      { name: "task", label: "Task/Process", placeholder: "content review, code deployment" },
      { name: "steps_type", label: "Detail Level", placeholder: "high-level overview, detailed step-by-step" },
      { name: "tools", label: "Tools", placeholder: "Slack, GitHub, Google Docs, Jira" },
      { name: "team_size", label: "Team Size", placeholder: "solo, small team (3-5), large team (10+)" },
      { name: "elements", label: "Include", placeholder: "decision points, handoff procedures" },
    ]
  },
  {
    type: "roleplay-simulation", label: "Role-Play Simulation",
    template: "You are a {role}. I will play the role of {my_role}. Scenario: {scenario}. Your goal is to {goal}. Start by {opening}. Stay in character throughout.",
    fields: [
      { name: "role", label: "AI Role", placeholder: "job interviewer, sales prospect" },
      { name: "my_role", label: "Your Role", placeholder: "job candidate, salesperson" },
      { name: "scenario", label: "Scenario", placeholder: "job interview for a PM role" },
      { name: "goal", label: "Your Goal", placeholder: "practice my responses" },
      { name: "opening", label: "Opening", placeholder: "asking me to introduce myself" },
    ]
  },
  {
    type: "write-story", label: "Write a Story",
    template: "You are a creative writer. Write a {genre} story about {topic}. The main character is {character}. The setting is {setting}. The story should be {length} and have a {ending} ending. Tone: {tone}.",
    fields: [
      { name: "genre", label: "Genre", placeholder: "sci-fi, mystery, romance, comedy" },
      { name: "topic", label: "Theme/Topic", placeholder: "first contact, unexpected friendship" },
      { name: "character", label: "Main Character", placeholder: "a retired detective, a curious child" },
      { name: "setting", label: "Setting", placeholder: "near-future city, small town" },
      { name: "length", label: "Length", placeholder: "short (500 words), medium (1000 words)" },
      { name: "ending", label: "Ending Type", placeholder: "happy, twist, open-ended" },
      { name: "tone", label: "Tone", placeholder: "dark, light-hearted, suspenseful" },
    ]
  },
  {
    type: "create-quiz", label: "Create a Quiz",
    template: "You are an educator. Create a {type} about {topic}. Difficulty: {difficulty}. Number of questions: {count}. Include: {elements}. Target audience: {audience}.",
    fields: [
      { name: "type", label: "Quiz Type", placeholder: "multiple choice, true/false, short answer" },
      { name: "topic", label: "Topic", placeholder: "AI fundamentals, marketing basics" },
      { name: "difficulty", label: "Difficulty", placeholder: "beginner, intermediate, advanced" },
      { name: "count", label: "Questions", placeholder: "5, 10, 20" },
      { name: "elements", label: "Include", placeholder: "answer key, explanations" },
      { name: "audience", label: "Audience", placeholder: "students, professionals" },
    ]
  },
  {
    type: "create-rubric", label: "Create a Rubric",
    template: "You are an evaluation expert. Create a grading rubric for {task}. Criteria: {criteria}. Scale: {scale}. Format: {format}.",
    fields: [
      { name: "task", label: "Task to Evaluate", placeholder: "a research paper, a presentation" },
      { name: "criteria", label: "Evaluation Criteria", placeholder: "quality, completeness, creativity" },
      { name: "scale", label: "Scale", placeholder: "1-5, letter grades, pass/fail" },
      { name: "format", label: "Format", placeholder: "table, checklist, descriptive levels" },
    ]
  },
];

export default function GeneratorPage() {
  const [selectedType, setSelectedType] = useState(templates[0].type);
  const [values, setValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const template = templates.find(t => t.type === selectedType)!;

  function handleChange(name: string, value: string) {
    setValues(prev => ({ ...prev, [name]: value }));
  }

  function generatePrompt() {
    let result = template.template;
    for (const [key, value] of Object.entries(values)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value || `[${key}]`);
    }
    setGeneratedPrompt(result);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">AI Prompt Generator</h1>
      <p className="mt-3 text-lg text-gray-600">
        Fill in the fields below and we&apos;ll generate a customized prompt for your AI.
      </p>

      {/* Template Selector */}
      <div className="mt-8">
        <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
          What do you want to do?
        </label>
        <select
          id="template"
          value={selectedType}
          onChange={(e) => { setSelectedType(e.target.value); setValues({}); setGeneratedPrompt(''); }}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {templates.map(t => (
            <option key={t.type} value={t.type}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Input Fields */}
      <div className="mt-8 space-y-4">
        {template.fields.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              type="text"
              placeholder={field.placeholder}
              value={values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        ))}
      </div>

      {/* Generate Button */}
      <div className="mt-8">
        <button
          onClick={generatePrompt}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Generate Prompt
        </button>
      </div>

      {/* Generated Prompt */}
      {generatedPrompt && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Your Generated Prompt</h2>
            <button
              onClick={() => navigator.clipboard.writeText(generatedPrompt)}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-gray-50 p-6 text-sm text-gray-800 border border-gray-200 font-mono leading-relaxed">
            {generatedPrompt}
          </pre>
        </div>
      )}

      {/* Related prompts link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Or browse our{' '}
          <a href="/" className="font-medium text-blue-600 hover:text-blue-800">
            library of 300+ tested prompts
          </a>
        </p>
      </div>
    </div>
  );
}
