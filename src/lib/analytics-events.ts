/** Event catalogue shared by the tracker, API and dashboard. */

export const PAGE_VIEW = 'pageview';
export const ENGAGEMENT_EVENT = 'engagement';
export const SCROLL_EVENT = 'scroll_depth';

export const EVENT_TYPES = [
  'project_card_click',
  'nav_click',
  'contact_button_click',
  'email_click',
  'linkedin_click',
  'cv_download',
  'booking_click',
  'external_link_click',
  'contact_form_submit',
  'project_enquiry_submit',
  'scroll_depth',
  'engagement',
] as const;

export type AnalyticsEventType = (typeof EVENT_TYPES)[number];

export const EVENT_LABELS: Record<string, string> = {
  pageview: 'Page view',
  project_card_click: 'Project card click',
  nav_click: 'Navigation click',
  contact_button_click: 'Contact button click',
  email_click: 'Email click',
  linkedin_click: 'LinkedIn click',
  cv_download: 'CV download',
  booking_click: 'Booking click',
  external_link_click: 'External link click',
  contact_form_submit: 'Contact form submission',
  project_enquiry_submit: 'Project enquiry',
  scroll_depth: 'Scroll depth',
  engagement: 'Engagement time',
};

/** Events that represent a real opportunity rather than a passive view. */
export const CONVERSION_EVENTS = new Set<string>([
  'contact_form_submit',
  'project_enquiry_submit',
  'email_click',
  'cv_download',
  'booking_click',
]);

export const CONVERSION_LABELS: Record<string, string> = {
  contact_form_submit: 'Contact form submission',
  project_enquiry_submit: 'Project enquiry',
  email_click: 'Email click',
  cv_download: 'CV download',
  booking_click: 'Booking click',
};

/** Page views and timing signals are not counted as interactions. */
export function isInteractionEvent(event: string): boolean {
  return event !== PAGE_VIEW && event !== ENGAGEMENT_EVENT;
}

export function isConversionEvent(event: string): boolean {
  return CONVERSION_EVENTS.has(event);
}

export function isKnownEvent(value: string): value is AnalyticsEventType {
  return (EVENT_TYPES as readonly string[]).includes(value);
}

export const SCROLL_DEPTHS = [25, 50, 75, 100] as const;
export type ScrollDepth = (typeof SCROLL_DEPTHS)[number];

export function isScrollDepth(value: number): value is ScrollDepth {
  return (SCROLL_DEPTHS as readonly number[]).includes(value);
}

export function eventLabel(event: string): string {
  return EVENT_LABELS[event] ?? event.replace(/_/g, ' ');
}
