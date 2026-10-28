import Link from 'next/link';
import type { ProfileData } from '@/context/PortfolioContext';

export function SiteFooter({ profile }: { profile: ProfileData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-[-0.01em] text-ink">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-ink-muted">Brand · Product · Digital</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5 text-sm">
            <Link href="/brand-design" className="w-fit text-ink-muted transition-colors hover:text-ink">
              Brand Design
            </Link>
            <Link href="/product-design" className="w-fit text-ink-muted transition-colors hover:text-ink">
              Product Design
            </Link>
            <Link href="/about" className="w-fit text-ink-muted transition-colors hover:text-ink">
              About
            </Link>
            <Link href="/contact" className="w-fit text-ink-muted transition-colors hover:text-ink">
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-2.5 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="w-fit break-all text-ink-muted transition-colors hover:text-ink"
            >
              Email
            </a>
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-ink-muted transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
            )}
            <Link href="/blog" className="w-fit text-ink-muted transition-colors hover:text-ink">
              Writing
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p>Multidisciplinary designer — Lagos, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
