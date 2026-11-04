import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { Footer, type FooterColumn, type FooterSocial } from '@/components/ui/Footer';

const SOCIAL_ICONS: Record<string, ReactNode> = {
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  contra: (
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 15.5c0 .828-.672 1.5-1.5 1.5H8c-.828 0-1.5-.672-1.5-1.5v-7c0-.828.672-1.5 1.5-1.5h8c.828 0 1.5.672 1.5 1.5v7z" />
  ),
  behance: (
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  ),
  twitter: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
  medium: (
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  ),
  github: (
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  ),
  whatsapp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  ),
};

const LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  contra: 'Contra',
  behance: 'Behance',
  twitter: 'X',
  medium: 'Medium',
  github: 'GitHub',
  whatsapp: 'WhatsApp',
};
export function SiteFooter({ profile }: { profile: ProfileData }) {
  const socials: FooterSocial[] = (Object.keys(SOCIAL_ICONS) as Array<keyof typeof SOCIAL_ICONS>)
    .filter((key) => profile.socials[key as keyof ProfileData['socials']])
    .map((key) => ({
      label: LABELS[key] ?? key,
      href: profile.socials[key as keyof ProfileData['socials']] as string,
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {SOCIAL_ICONS[key]}
        </svg>
      ),
    }));

  const columns: FooterColumn[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Projects', href: '/projects' },
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Product Design', href: '/about#services' },
        { label: 'Brand & Graphic Design', href: '/about#services' },
        { label: 'Web Design', href: '/about#services' },
      ],
    },
    {
      title: 'Get in touch',
      links: [
        { label: profile.email, href: `mailto:${profile.email}` },
        { label: 'Hire on Contra', href: profile.socials.contra ?? '/contact' },
        { label: 'Resume', href: profile.resumeUrl },
      ],
    },
  ];

  return (
    <Footer
      brand={{
        name: profile.name,
        tagline: 'Product designer and AI-assisted builder creating products, experiences, and brands.',
        href: '/',
        avatar: profile.avatar,
      }}
      columns={columns}
      socials={socials}
      wordmark={profile.name.toUpperCase()}
      legal={
        <>
          <span>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail className="size-3.5" />
            {profile.email}
          </a>
        </>
      }
    />
  );
}
