import type { ProfileData } from '@/context/PortfolioContext';

export function testimonialIdentity(
  item: ProfileData['testimonials'][number],
) {
  if (item.author.trim().toLowerCase() === 'ceo' && item.company) {
    return { name: item.company, role: item.role };
  }

  return {
    name: item.author,
    role: [item.role, item.company].filter(Boolean).join(' · '),
  };
}
