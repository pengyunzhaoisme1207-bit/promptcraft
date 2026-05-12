export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Submit a Prompt</h1>
      <div className="mt-8 space-y-6 text-gray-700">
        <p>Have a great prompt you&apos;d like to share with the community? We&apos;d love to feature it on PromptCraft.</p>

        <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800">How to Submit</h2>
          <p className="mt-2 text-blue-700">
            Currently, prompt submissions are accepted via email. Please send your prompt with the following details:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-blue-700">
            <li>Prompt title</li>
            <li>The full prompt text</li>
            <li>When to use it (context)</li>
            <li>Compatible AI tools (ChatGPT, Claude, etc.)</li>
            <li>Category/scenario</li>
            <li>Difficulty level (beginner, intermediate, advanced)</li>
          </ul>
        </div>

        <p>
          Send your submissions to <a href="mailto:submit@prompt.next-happy.com" className="text-blue-600 hover:text-blue-800">submit@prompt.next-happy.com</a>.
        </p>

        <p className="text-sm text-gray-500">
          All submissions will be reviewed for quality and originality before being published.
          In the future, we plan to support community submissions through a web form.
        </p>
      </div>
    </div>
  );
}
