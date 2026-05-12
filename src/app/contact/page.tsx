export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      <div className="mt-8 space-y-6 text-gray-700">
        <p>Have a question, suggestion, or feedback? We&apos;d love to hear from you.</p>
        <p>
          For general inquiries, you can reach us at <a href="mailto:hello@prompt.next-happy.com" className="text-blue-600 hover:text-blue-800">hello@prompt.next-happy.com</a>.
        </p>
        <p>
          To submit a new prompt, visit our <a href="/submit" className="text-blue-600 hover:text-blue-800">Submit page</a>.
        </p>
        <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/about" className="text-blue-600 hover:text-blue-800">About PromptCraft</a></li>
            <li><a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a></li>
            <li><a href="/generator" className="text-blue-600 hover:text-blue-800">Prompt Generator</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
