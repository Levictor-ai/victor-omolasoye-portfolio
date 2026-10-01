export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  tags: string[];
  readingTime: string;
  mediumUrl: string;
  sections: BlogSection[];
}

const posts: BlogPost[] = [
  {
    slug: 'design-system-fundamentals',
    title: 'Design System Fundamentals: What They Really Are and Why They Matter',
    description:
      'A practical breakdown of what a design system actually is, the three layers it needs to work, and why it pays back faster than most product teams expect.',
    datePublished: '2025-04-18',
    tags: ['Design Systems', 'Product Design', 'UI/UX'],
    readingTime: '6 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/design-system-fundamentals-what-they-really-are-and-why-they-matter-08df08a9f2d3',
    sections: [
      {
        paragraphs: [
          'A design system is not a Figma library and it is not a component library. Both are outputs. The design system is the set of decisions a team has made about how products should look and behave, written down so that everyone applies them the same way.',
          'When teams skip that first step and jump straight to building components, they end up with a component library nobody trusts, because the underlying rules were never agreed on. The components encode guesses instead of decisions.',
        ],
      },
      {
        heading: 'The three layers that actually matter',
        paragraphs: [
          'Most working design systems have three layers, and each one solves a different problem. Teams usually try to build them in the wrong order.',
        ],
        bullets: [
          'Foundations — the raw materials: colour, type, spacing, elevation, radius, motion. These are tokens, not components.',
          'Patterns — recurring design decisions expressed as intent: "a card with an image, a title, and metadata". Patterns describe when to use something, which pure component APIs never do.',
          'Components — the reusable implementations built on top: buttons, inputs, modals, tables, navigation.',
        ],
      },
      {
        heading: 'Why it pays back faster than you think',
        paragraphs: [
          'The cost argument usually gets made badly. A design system is not justified by the hours you save on the tenth screen. It is justified by the decisions you stop re-litigating.',
          'Without a system, every new screen reopens questions that were already answered. Two designers produce two different button behaviours, two different date formats, two different error states. You pay for that inconsistency in QA, in bugs, and in support tickets — not in design hours.',
          'A team shipping a single well-built component with clear usage guidance and real states gets most of the benefit. A sprawling system built for hypothetical future needs gets none of it.',
        ],
      },
      {
        heading: 'Where teams go wrong',
        paragraphs: [
          'The most common failure is building for scale you do not have. A system designed for fifty product surfaces will be too heavy for a team shipping three, and the team will route around it.',
          'The second is treating documentation as optional. A system nobody can find is not a system, it is a folder. If it is not discoverable from inside the product work, it will not be used.',
        ],
      },
    ],
  },
  {
    slug: 'wcag-2-1-explained',
    title: 'WCAG 2.1 Explained: What Every Product Designer Should Know About Accessibility',
    description:
      'The accessibility rules that actually change design decisions, explained without the jargon, plus the checks that catch the majority of real-world issues.',
    datePublished: '2025-06-02',
    tags: ['Accessibility', 'UI/UX', 'Product Design'],
    readingTime: '7 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/wcag-2-1-explained-what-every-product-designer-should-know-about-accessibility-534cc6fa665a',
    sections: [
      {
        paragraphs: [
          'WCAG is a specification, not a law, and most product designers encounter it late — usually as a bug ticket from an audit. The problem is that almost every accessibility failure traces back to a design decision made weeks earlier, when nobody was thinking about it.',
          'The useful way to read WCAG is not as a checklist but as a set of underlying principles. If you understand the principles, you can reason about cases the spec does not explicitly cover.',
        ],
      },
      {
        heading: 'Perceivable',
        paragraphs: [
          'Content has to be available to more than one kind of sense. Everything visual needs a text alternative, which in practice means writing real alt text rather than descriptions of the image itself.',
          'Colour is never sufficient on its own to carry meaning. If an error state is communicated by red alone, a colour-blind user and a monochrome screen reader user both miss it. Add an icon, a border, or text.',
          'Text needs a contrast ratio of at least 4.5:1 against its background, and 3:1 for large text. This is the single highest-impact check in the whole specification, and light grey on white is the most common violation I see.',
        ],
      },
      {
        heading: 'Operable',
        paragraphs: [
          'Everything reachable by mouse must be reachable by keyboard, with visible focus. Losing focus styling is the fastest way to make a product unusable for keyboard users, and it is usually removed because it looked untidy in a review.',
          'Nothing important should depend on hover, on drag, or on a gesture that has no single-pointer equivalent.',
        ],
      },
      {
        heading: 'Understandable',
        paragraphs: [
          'This is where design has the most influence. Error messages need to say what happened and what to do next. Input fields need labels, not just placeholders, because a placeholder disappears the moment someone types.',
          'Consistent navigation and predictable behaviour reduce the cognitive load the criterion is really about. Unexpected behaviour is an accessibility problem even when every control technically works.',
        ],
      },
      {
        heading: 'Robust',
        paragraphs: [
          'Code needs to expose the semantics that assistive technology depends on. A div with a click handler is invisible to a screen reader unless you add the right role, state, and keyboard handling. This one is a front-end concern, but the designer decides whether the component is even capable of it.',
        ],
      },
    ],
  },
  {
    slug: 'the-quiet-power-of-ux-writing',
    title: 'The Quiet Power of UX Writing: Why Microcopy Decides Whether Your Design Works',
    description:
      'Interface copy is a design material, not a finishing touch. How to write microcopy that reduces errors, lowers support load, and makes products feel considered.',
    datePublished: '2025-05-12',
    tags: ['UX Writing', 'Content Design', 'Product Design'],
    readingTime: '5 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/the-quiet-power-of-ux-writing-why-microcopy-decides-whether-your-design-works-0eb44fc72b55',
    sections: [
      {
        paragraphs: [
          'Most microcopy gets written last, in the gap between design approval and handoff, by whoever is available. That is why so much of it is vague, and why vague interface copy shows up in support tickets.',
          'Interface writing is not copywriting. Nobody is being persuaded. Your job is to remove ambiguity at the exact moment a person is uncertain, and that is a much narrower and more technical skill than marketing writing.',
        ],
      },
      {
        heading: 'Write for the moment of uncertainty',
        paragraphs: [
          'Every label, error, and confirmation should answer the question the user actually has at that moment. Not "what do we want to say", but "what is the person trying to find out".',
        ],
        bullets: [
          'Buttons describe the action, not the destination. "Save changes" beats "Continue".',
          'Errors say what failed and what to do. "Card number is incomplete" beats "Invalid input".',
          'Confirmations confirm the specific thing, with the specifics. "Booking confirmed for 14 March, 6:30pm" beats "Success".',
        ],
      },
      {
        heading: 'The words you cut are the ones that help',
        paragraphs: [
          'Vague words are usually there to avoid committing to a claim. "Some of your details are invalid" hedges in a way that makes the person read it twice. Specificity is kinder, because it is faster.',
          'Symmetry matters more than people expect. If one button says "Start free trial", no button on the screen should say "Learn more about pricing". Inconsistent vocabulary makes interfaces feel careless even when the user cannot explain why.',
        ],
      },
      {
        heading: 'Voice is part of the design system',
        paragraphs: [
          'Tone should be defined alongside colour and type, and enforced the same way. Deciding in advance that errors are direct but never harsh, and that empty states suggest a next action, removes a whole class of inconsistent-feeling products.',
        ],
      },
    ],
  },
  {
    slug: 'why-designers-fail-at-ideate',
    title: 'Why Most Designers Fail at the Ideate Stage (A Product Designer’s Perspective)',
    description:
      'Ideation stalls because teams generate ideas instead of framing them. A practical structure for getting to solutions that are actually worth testing.',
    datePublished: '2025-07-21',
    tags: ['Design Thinking', 'Product Design', 'Ideation'],
    readingTime: '6 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/why-most-designers-fail-at-the-ideate-stage-a-product-designers-perspective-78f9ee120aad',
    sections: [
      {
        paragraphs: [
          'Most design teams do not have an ideation problem. They have a framing problem. They arrive at the ideate stage with a solution-shaped brief, and so they generate variations on a decision that was never consciously made.',
        ],
      },
      {
        heading: 'Framing before generating',
        paragraphs: [
          'A useful How Might We question is not a paraphrase of the feature request. It has to hold the constraints loosely enough that a genuinely different answer survives, and tightly enough that it still points at a real user problem.',
          'If your questions all contain words like "screen", "flow", or "feature", you have already chosen the answer. The test is whether two people in the room could reasonably propose opposite solutions.',
        ],
      },
      {
        heading: 'Diverge by constraint, not by volume',
        paragraphs: [
          'Thirty ideas in ten minutes produces thirty variations of whatever the loudest person said. A better approach is to force a different lens on each round.',
        ],
        bullets: [
          'Invert the assumption. If we assume users will not read this, what would we build?',
          'Change the actor. What would a first-time user need that a returning one would not?',
          'Remove a constraint. What is possible if we had no technical limitation at all?',
          'Push the timeframe. What would this look like if it only had to work in five years?',
        ],
      },
      {
        heading: 'Converge on a bet, not a favourite',
        paragraphs: [
          'The failure mode at convergence is selecting the idea the team enjoyed most, or the one the most senior person defended hardest. Instead, converge on the cheapest thing that would teach you the most.',
          'That usually means a prototype rough enough to be embarrassing. Its roughness is the point: it forces the conversation onto whether the assumption holds, rather than whether the craft is good.',
        ],
      },
    ],
  },
  {
    slug: 'the-hidden-power-of-a-prd',
    title: 'Scalability Starts on Paper: The Hidden Power of a PRD',
    description:
      'Why a written product requirements document is the cheapest scaling tool a product team has, and the structure that keeps it useful instead of bureaucratic.',
    datePublished: '2025-09-08',
    tags: ['Product Management', 'Product Design', 'Vibe Coding'],
    readingTime: '6 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/scalability-starts-on-paper-the-hidden-power-of-a-prd-99720508a680',
    sections: [
      {
        paragraphs: [
          'A PRD is often treated as a formality — a document written after the decisions are made so that other people can be consulted. Used that way it adds almost nothing.',
          'Written the other way round, a PRD is the thing that lets a small team behave like a much larger one, because it externalises the reasoning instead of only the output.',
        ],
      },
      {
        heading: 'What it should contain',
        paragraphs: [
          'The value is in the sections that record thinking, not the ones that record features. A PRD that only lists requirements will always go stale, because requirements change faster than understanding does.',
        ],
        bullets: [
          'Problem — whose pain, how often, and what it costs them today. No solution language.',
          'Evidence — research, data, support tickets, anything that justifies the problem being real.',
          'Goals and non-goals — the second list matters more. Non-goals are what stop scope drift.',
          'Success metrics — decided before the build, not invented afterwards to justify it.',
          'Constraints — deadlines, platform limits, legal requirements, budget.',
          'Open questions — the honest unknowns, with an owner and a date for each.',
        ],
      },
      {
        heading: 'Why it matters when the tools change',
        paragraphs: [
          'Faster ways of building have made the document look optional, because the cost of guessing wrong went down. The opposite is true. When anyone can generate a working prototype in an afternoon, the scarce resource is deciding what should exist and why.',
          'A PRD is what separates a team that ships quickly from a team that produces a lot of software nobody needed. It is the artefact that makes the difference legible, reviewable, and challengeable by someone who was not in the room.',
        ],
      },
      {
        heading: 'Keep it alive',
        paragraphs: [
          'A PRD is not a document, it is a decision log. If the reasoning behind a decision is never written down, then six months later the only way to find out why something exists is to ask the person who is no longer on the team.',
        ],
      },
    ],
  },
  {
    slug: 'vibe-coding-and-how-software-gets-built',
    title: 'Vibe Coding Has Changed How Software Gets Built',
    description:
      'What actually shifted when natural language became a programming input, which parts of the workflow got faster, and which parts quietly became harder.',
    datePublished: '2026-01-15',
    tags: ['AI', 'Product Engineering', 'Vibe Coding'],
    readingTime: '6 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/the-prd-in-vibe-coding-840594221458',
    sections: [
      {
        paragraphs: [
          'The tooling changed faster than the vocabulary did. Most teams now have a working prototype faster than it used to take to write a technical spec, and the bottleneck moved somewhere nobody was watching.',
          'The word "vibe coding" undersells what is genuinely new and overstates how much of the workflow disappeared. Building got dramatically cheaper. Deciding what to build did not.',
        ],
      },
      {
        heading: 'What got faster',
        paragraphs: [
          'Scaffolding, boilerplate, integration glue, and the exploration phase all collapsed. A designer can now produce a working interactive version of an idea instead of a static frame, which changes what a design review is even for.',
          'It also collapsed the distance between a designer and a prototype, which means design quality gets tested earlier and more honestly. That is a genuine gain for the craft.',
        ],
      },
      {
        heading: 'What got harder',
        paragraphs: [
          'Generated code is confident and often wrong, and confidence is expensive. The failure mode is not that nothing works — it is that most of it works, so review becomes the bottleneck instead of writing.',
        ],
        bullets: [
          'Maintenance cost moves. Code that nobody wrote deliberately is code nobody fully understands.',
          'Security and correctness need real verification, not plausible-looking output.',
          'System boundaries, data models, and naming decisions still need a human who owns the consequences.',
        ],
      },
      {
        heading: 'What this means for product teams',
        paragraphs: [
          'The skills that matter shift towards specifying intent precisely, reviewing output critically, and designing the system before generating the parts. In other words, the boring disciplines become the differentiating ones.',
          'Nothing replaces taste or judgement. It just moves the bottleneck to where taste and judgement were always supposed to be applied.',
        ],
      },
    ],
  },
  {
    slug: 'typography-hierarchy',
    title: 'Typography Hierarchy: The Cheapest Way to Make Any Interface Look Designed',
    description:
      'How to build a type scale that creates hierarchy, why most interfaces have too many sizes, and the contrast rules that make hierarchy read instantly.',
    datePublished: '2025-08-14',
    tags: ['Typography', 'Visual Design', 'UI/UX'],
    readingTime: '5 min read',
    mediumUrl:
      'https://medium.com/@omolasoyevictorakinyemi/typography-hierarchy-cf2d6b619556',
    sections: [
      {
        paragraphs: [
          'Most interfaces do not look designed because of layout or colour. They look flat because everything is competing at the same level. Hierarchy in type is a hierarchy of attention, and getting it wrong flattens everything else.',
        ],
      },
      {
        heading: 'Hierarchy comes from four levers',
        paragraphs: [
          'Size is the loudest, and the most overused. Teams reach for it first, then have nothing left to escalate to.',
        ],
        bullets: [
          'Size — the primary signal, and the one you should use first.',
          'Weight — a 600 next to a 400 reads as structure without taking more space.',
          'Colour — most text should be secondary or tertiary grey, not full black. Full black is for the one thing that matters most.',
          'Space — the space above a heading belongs to the heading. This is the cheapest lever and the most neglected.',
        ],
      },
      {
        heading: 'Use fewer sizes than you think',
        paragraphs: [
          'A good interface needs about four or five type sizes, not twelve. Every additional size has to be maintained, and each one that does not map to a real level of importance becomes noise.',
          'Build a scale with a consistent ratio and commit to it. If a value is not on the scale, that is usually a sign the element does not deserve its own level.',
        ],
      },
      {
        heading: 'Contrast, not difference',
        paragraphs: [
          'Adjacent levels need enough difference to be instant. If a heading and its body text are close in size and weight, the reader has to work to work out the relationship, and they will feel it as the page being tiring rather than unclear.',
        ],
      },
    ],
  },
];

export const blogPosts = posts;

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

export function getBlogTags(): string[] {
  const tags = new Set<string>();
  for (const post of posts) for (const tag of post.tags) tags.add(tag);
  return [...tags].sort();
}
