'use client';

import { useState } from 'react';
import { site } from '@/lib/seo';
import { track } from '@/lib/analytics';

const inputClass =
  'mt-2 w-full border-b border-line bg-transparent py-3 text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none focus-visible:shadow-none';

const labelClass = 'text-xs font-medium uppercase tracking-[0.12em] text-ink-faint';

export function ContactForm({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          company: formData.get('company'),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        track('generate_lead', { method: 'contact_form' });
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`} noValidate={false}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me about the project or opportunity"
          rows={5}
          required
          maxLength={4000}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <p aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === 'sent' && (
          <span className="text-ink">
            Message sent. I&rsquo;ll get back to you shortly.
          </span>
        )}
        {status === 'error' && (
          <span className="text-[#9B2C2C]">
            Something went wrong. Please email me directly at{' '}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
