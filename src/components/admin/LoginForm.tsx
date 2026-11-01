'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || pending) return;

    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? 'Could not sign in.');
        return;
      }

      setPassword('');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-ios-2xl border border-ios-separator bg-white/85 p-7 shadow-ios-lg backdrop-blur-xl sm:p-8">
      <div className="flex size-11 items-center justify-center rounded-full bg-ios-fill text-ios-blue">
        <Lock size={20} />
      </div>

      <h1 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ios-label">
        Private analytics
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ios-secondary">
        Visits and countries for this portfolio. Visitors never see this page — it is not linked,
        indexed, or tracked.
      </p>

      {configured ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label htmlFor="admin-password" className="sr-only">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            autoFocus
            disabled={pending}
            className="w-full rounded-ios-lg border border-ios-separator bg-ios-grouped px-4 py-3 text-sm text-ios-label outline-none transition-colors placeholder:text-ios-tertiary focus:border-ios-blue/50 disabled:opacity-60"
          />

          {error ? (
            <p className="text-sm font-medium text-ios-red" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending || !password}
            className="w-full rounded-full bg-ios-blue px-6 py-3 text-sm font-semibold text-white shadow-ios-button transition-colors hover:bg-ios-bluePressed disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? 'Checking…' : 'Open dashboard'}
          </button>
        </form>
      ) : (
        <div className="mt-6 rounded-ios-lg border border-ios-orange/30 bg-ios-orange/5 p-4 text-sm leading-relaxed text-ios-secondary">
          Set <code className="font-mono text-[12px]">ADMIN_PASSWORD</code> in your environment
          variables to switch this form on. See the setup notes below.
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-ios-tertiary">
        Tip: add <code className="font-mono">?no-track=1</code> to any URL to keep your own visits
        out of the numbers for that session.
      </p>
    </div>
  );
}
