interface RTFSectionProps {
  label: string;
  content: string;
  color: string;
  icon: React.ReactNode;
}

function RTFSection({ label, content, color, icon }: RTFSectionProps) {
  return (
    <div className={`rounded-xl border ${color} p-5`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-wide">{label}</h3>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  );
}

export default function RTFView({
  role,
  task,
  format,
}: {
  role?: string;
  task?: string;
  format?: string;
}) {
  if (!role && !task && !format) return null;

  return (
    <div className="mb-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Structured Prompt (RTF)</h2>
      <div className="grid gap-4">
        {role && (
          <RTFSection
            label="Role"
            content={role}
            color="border-blue-200 bg-blue-50"
            icon={
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        )}
        {task && (
          <RTFSection
            label="Task"
            content={task}
            color="border-amber-200 bg-amber-50"
            icon={
              <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
        )}
        {format && (
          <RTFSection
            label="Format"
            content={format}
            color="border-green-200 bg-green-50"
            icon={
              <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            }
          />
        )}
      </div>
    </div>
  );
}
