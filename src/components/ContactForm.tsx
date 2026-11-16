'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { track, trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

const fieldClass =
  'w-full rounded-ios-lg border border-ios-separator bg-white px-4 py-3.5 font-ios text-sm text-ios-ink placeholder:text-ios-tertiary outline-none transition-all duration-200 focus:border-ios-electric/60 focus:ring-4 focus:ring-ios-electric/10';

const labelClass =
  'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary';

const projectTypes = [
  'Product design',
  'Brand identity',
  'Website',
  'Design system',
  'Something else',
];

const budgets = [
  'Under $1k',
  '$1k – $3k',
  '$3k – $7k',
  '$7k+',
  'Not sure yet',
];

const timelines = ['ASAP', '2–4 weeks', '1–2 months', 'Flexible'];

export function ContactForm({
  className = '',
  email = 'omolasoyevictorakinyemi@gmail.com',
}: {
  className?: string;
  email?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);

    const requestedProject =
      new URLSearchParams(window.location.search).get('project') ?? '';
    const project = /^[a-z0-9-]{1,80}$/i.test(requestedProject)
      ? requestedProject
      : '';

    const projectType = String(formData.get('projectType') ?? '').trim();
    const budget = String(formData.get('budget') ?? '').trim();
    const timeline = String(formData.get('timeline') ?? '').trim();
    const notes = String(formData.get('message') ?? '').trim();

    const brief = [
      projectType ? `Project type: ${projectType}` : '',
      budget ? `Budget: ${budget}` : '',
      timeline ? `Timeline: ${timeline}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: [brief, notes].filter(Boolean).join('\n\n'),
          company: formData.get('company'),
          project,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setStatus('sent');

        if (project) {
          track('generate_lead', { method: 'project_enquiry', project });
          trackEvent('project_enquiry_submit', {
            project,
            label: `Project enquiry: ${project}`,
          });
        } else {
          track('generate_lead', { method: 'contact_form' });
          trackEvent('contact_form_submit', { label: 'Contact form' });
        }

        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className="rounded-ios-2xl border border-ios-electric/20 bg-ios-pale p-6 text-center sm:p-8"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-ios-electric text-white">
          <CheckCircle2 className="size-6" strokeWidth={2.2} />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-ios-ink">
          Message sent.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ios-secondary">
          Thanks for the context. I&rsquo;ll reply within one working day. If it
          is urgent, email me directly.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </Button>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-ios-electric"
          >
            Email directly
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`space-y-5 ${className}`}
    >
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Ada Okafor"
            required
            autoComplete="name"
            maxLength={120}
            className={fieldClass}
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
            placeholder="you@company.com"
            required
            autoComplete="email"
            maxLength={200}
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={type}
                required
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-ios-separator bg-white px-3 py-1.5 text-xs font-medium text-ios-secondary transition-all duration-200 peer-checked:border-ios-electric peer-checked:bg-ios-electric peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ios-electric/30">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Budget range
          </label>
          <div className="relative">
            <select
              id="contact-budget"
              name="budget"
              required
              defaultValue=""
              className={`${fieldClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ios-tertiary" />
          </div>
        </div>
        <div>
          <label htmlFor="contact-timeline" className={labelClass}>
            Timeline
          </label>
          <div className="relative">
            <select
              id="contact-timeline"
              name="timeline"
              required
              defaultValue=""
              className={`${fieldClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {timelines.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ios-tertiary" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          The brief
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="What are you building? Who is it for? What does success look like?"
          rows={5}
          required
          maxLength={4000}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <p className="flex items-center gap-1.5 text-[11px] leading-relaxed text-ios-tertiary">
        <Lock className="size-3.5 shrink-0" />
        Your details stay between us. No newsletters, no spam.
      </p>

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-ios-lg border border-ios-red/20 bg-ios-red/5 p-3 text-xs leading-relaxed text-ios-red"
        >
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          Something went wrong. Please try again or email me directly at{' '}
          <a
            href={`mailto:${email}`}
            className="font-semibold underline"
          >
            {email}
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        block
        loading={status === 'sending'}
        className="py-4"
      >
        {status === 'sending' ? 'Sending…' : 'Send the brief'}
      </Button>

      <p aria-live="polite" className="sr-only">
        {status === 'sending' && 'Sending your message'}
        {status === 'error' && 'There was an error sending your message'}
      </p>
    </motion.form>
  );
}
