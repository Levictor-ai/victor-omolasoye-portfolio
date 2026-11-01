const VARS: Array<{ name: string; note: string }> = [
  { name: 'UPSTASH_REDIS_REST_URL', note: 'REST endpoint of a free Upstash Redis database' },
  { name: 'UPSTASH_REDIS_REST_TOKEN', note: 'REST token for the same database' },
  { name: 'ADMIN_PASSWORD', note: 'the password for this page — choose something long' },
  { name: 'ADMIN_SESSION_SECRET', note: 'optional, signs the login cookie' },
  { name: 'ANALYTICS_SALT', note: 'optional, salts hashed visitor IDs' },
];

export function SetupNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-ios-xl border border-ios-orange/30 bg-white/80 p-5 shadow-ios sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ios-orange">
        Setup needed
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ios-label">
        {compact ? 'Connect a data store to start collecting visits' : 'Connect a store before your first login'}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ios-secondary">
        Visits are stored in a Redis database, not on the page. Create a free database at{' '}
        <a
          href="https://console.upstash.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-ios-blue underline decoration-ios-blue/30 underline-offset-2"
        >
          console.upstash.com
        </a>{' '}
        and add these variables in Vercel (Project → Settings → Environment Variables) and in
        <code className="mx-1 rounded bg-ios-fill px-1.5 py-0.5 text-[12px]">.env.local</code>
        for local testing:
      </p>

      <ul className="mt-4 space-y-2">
        {VARS.map((variable) => (
          <li key={variable.name} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-3">
            <code className="shrink-0 rounded bg-ios-fill px-2 py-1 font-mono text-[12px] text-ios-label">
              {variable.name}
            </code>
            <span className="text-ios-tertiary sm:pt-1">{variable.note}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-ios-tertiary">
        Redeploy after adding the variables, then open <code className="font-mono">/admin</code>.
        Until then the tracker is a no-op and store nothing.
      </p>
    </div>
  );
}
