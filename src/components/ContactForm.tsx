'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
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
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-100 shadow-none outline-none transition-colors focus:border-white focus-visible:shadow-none focus-visible:ring-0"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-100 shadow-none outline-none transition-colors focus:border-white focus-visible:shadow-none focus-visible:ring-0"
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          className="w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-100 shadow-none outline-none transition-colors focus:border-white focus-visible:shadow-none focus-visible:ring-0"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-blue-700 transition-all hover:bg-blue-50 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'sent' && (
        <p className="text-center text-sm text-blue-50">Message sent!</p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-white/90">
          Something went wrong — please email me directly at omolasoyevictorakinyemi@gmail.com.
        </p>
      )}
    </motion.form>
  );
}
