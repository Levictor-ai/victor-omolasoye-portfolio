import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { getProject } from '@/lib/projects';
import { buildStudyDoc } from '@/lib/projectStudyDoc';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { StudyDocCaseStudy } from '@/components/StudyDocCaseStudy';
import { SiteFooter } from '@/components/SiteFooter';
import { BackToTop } from '@/components/BackToTop';
import { defaultProfile } from '@/data/profile';

export const metadata: Metadata = pageMetadata({
  title: 'DocIntel — AI Document Intelligence Case Study',
  description:
    'DocIntel is an AI-powered document intelligence platform that turns invoices and receipts into structured, reviewable data. An early-stage product design and AI case study by Victor Omolasoye.',
  path: '/showcase/docintel',
  image: '/images/projects/docintel/cover.png',
  imageAlt: 'DocIntel — AI document intelligence for invoices and receipts',
  keywords: [
    'DocIntel',
    'AI document intelligence',
    'document extraction case study',
    'invoice extraction',
    'receipt processing',
    'product design case study',
  ],
});

export default function DocIntelShowcasePage() {
  const project = getProject('docintel');

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Showcase', path: '/showcase/docintel' },
          { name: project.title, path: '/showcase/docintel' },
        ])}
      />
      <main className="min-h-screen bg-white font-ios text-ios-ink">
        <article className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <Link
            href="/#lab"
            className="mb-10 inline-flex items-center gap-2 text-sm text-ios-ink transition-colors hover:text-ios-electric"
          >
            <ArrowUpRight className="size-4 rotate-180" />
            Back to showcase
          </Link>

          <StudyDocCaseStudy
            project={project}
            doc={project.studyDoc ?? buildStudyDoc(project)}
          />
        </article>
        <SiteFooter profile={defaultProfile} />
        <BackToTop />
      </main>
    </>
  );
}
