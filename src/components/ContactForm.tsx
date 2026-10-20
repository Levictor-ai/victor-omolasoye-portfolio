'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

const inputClass =
  'w-full rounded-ios-sm border border-white/20 bg-white/15 px-4 py-3.5 font-ios text-sm text-white placeholder-white/60 shadow-none outline-none transition-all duration-200 focus:border-white/50 focus:bg-white/20 focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-white/30';

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
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`space-y-4 ${className}`}
    >
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="contact-name" className="sr-only">
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Your Name"
          required
          autoComplete="name"
          maxLength={120}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="sr-only">
          Your Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="Your Email"
          required
          autoComplete="email"
          maxLength={200}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          maxLength={4000}
          className={inputClass}
        />
      </div>
      <Button
        type="submit"
        variant="light"
        block
        loading={status === 'sending'}
        className="py-4"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </Button>
      <p aria-live="polite" className="min-h-[1.25rem] text-center text-sm">
        {status === 'sent' && (
          <span className="text-white">
            Message sent! I&rsquo;ll get back to you shortly.
          </span>
        )}
        {status === 'error' && (
          <span className="text-white/90">
            Something went wrong — please email me directly at{' '}
            <a
              href="mailto:omolasoyevictorakinyemi@gmail.com"
              className="font-medium underline"
            >
              omolasoyevictorakinyemi@gmail.com
            </a>
            .
          </span>
        )}
      </p>
    </motion.form>
  );
}
