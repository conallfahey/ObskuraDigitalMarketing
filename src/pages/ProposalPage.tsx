import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  ClipboardList,
  Film,
  KeyRound,
  LineChart,
  Lock,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRoundCheck,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROPOSAL_PASSWORD = 'umbrella2026';
const STORAGE_KEY = 'obskura-umbrella-proposal-unlocked';

const umbrellaImageBase = '/images/Home - Umbrella Construction & Restoration';

const proposalImages = {
  hero: `${umbrellaImageBase}/umbrella-construction-restoration-hero-bg-2.jpg`,
  heroSlide: `${umbrellaImageBase}/umbrella-construction-restoration-hero-slide-2.jpg`,
  logo: `${umbrellaImageBase}/umbrella-construction-restoration-hero-logo.png`,
  seo: `${umbrellaImageBase}/umbrella-house-renovation-600x300.jpg`,
  local: `${umbrellaImageBase}/House2-600x300.jpg`,
  roofing: `${umbrellaImageBase}/House-renovation-600x300-1-600x300.jpg`,
  content: `${umbrellaImageBase}/interior5-600x300.jpg`,
  ads: `${umbrellaImageBase}/slider01-600x300.jpg`,
  video: `${umbrellaImageBase}/umbrella-construction-drone-inspection-600x300.jpg`,
  reporting: `${umbrellaImageBase}/architecture-426426_1280-600x300.jpg`,
};

const goals = [
  'Increase qualified calls, forms, and inspection requests from the right service area.',
  'Build trust quickly for homeowners making roofing and storm restoration decisions.',
  'Rank for high-intent local searches around roofing, storm damage, inspections, and insurance claim help.',
  'Use practical video ads to make Umbrella feel local, credible, and easy to contact.',
  'Track business outcomes clearly: leads, source, quality, inspections, estimates, jobs, and next actions.',
];

const discoveryQuestions = [
  'Are you currently tracking referral sources for your leads?',
  'Are you adamant about staying on WordPress?',
  'Are you tracking SEO analytics yourself?',
  'What is the primary method you use to manage and follow up with new leads?',
  'Do you have an existing CRM or lead tracking tool in place?',
  'Are there specific geographic areas you want to prioritize or avoid?',
  'Are there any specific competitors you are most concerned about or admire?',
];

const auditIssues = [
  'Some pages appear unfinished or template-based.',
  'Some project pages look like demo content instead of real local work.',
  'The services are not organized clearly enough for Google or customers.',
  'The homepage does not strongly target high-value searches like roofing contractor, storm damage restoration, roof repair, roof replacement, hail damage inspection, or insurance claim help in Algonquin and nearby suburbs.',
  'Contact information and service messaging should be cleaned up and made consistent.',
  'The site needs stronger local pages, real project examples, better calls-to-action, and better proof.',
];

const cleanupItems = [
  'Remove or noindex placeholder pages so Google leaves them out of search results.',
  'Clean up demo project pages.',
  'Fix inconsistent contact information.',
  'Make sure the correct phone number, address, and email are used everywhere.',
  'Remove irrelevant shop, archive, or template pages that do not help generate leads.',
  'Make the service navigation easier to understand.',
  'Improve calls-to-action throughout the site.',
];

const seoPages = [
  'Roofing Contractor in Algonquin, IL',
  'Roof Repair in Algonquin, IL',
  'Roof Replacement in Algonquin, IL',
  'Storm Damage Restoration in Algonquin, IL',
  'Hail Damage Roof Inspection in Algonquin, IL',
  'Wind Damage Roof Repair in Algonquin, IL',
  'Drone Roof Inspections in Algonquin, IL',
  'Insurance Claim Roofing Help in Algonquin, IL',
  'Siding Contractor in Algonquin, IL',
  'Commercial Roofing in Algonquin, IL',
];

const servicePageStructure = [
  'What the service is',
  'Who it is for',
  'Common signs the homeowner needs help',
  'Why timing matters',
  'How Umbrella handles the process',
  'What areas are served',
  'Why the customer should trust Umbrella',
  'How to schedule an inspection',
];

const locationPages = [
  'Roofing Contractor in Lake in the Hills, IL',
  'Roofing Contractor in Crystal Lake, IL',
  'Roofing Contractor in Huntley, IL',
  'Roofing Contractor in Carpentersville, IL',
  'Roofing Contractor in Barrington, IL',
  'Storm Damage Restoration in McHenry County',
  'Roof Repair in Kane County',
];

const caseStudyExamples = [
  'Hail-Damaged Roof Replacement in Algonquin, IL',
  'Wind Damage Roof Repair in Lake in the Hills, IL',
  'Drone Roof Inspection After Storm Damage',
  'Siding and Exterior Restoration After Hail Damage',
  'Commercial Roof Inspection and Repair in the Northwest Suburbs',
];

const caseStudyFields = [
  'Location',
  'Problem',
  'Inspection findings',
  'Scope of work',
  'Before and after photos',
  'Materials used',
  'Timeline',
  'Insurance involvement, if applicable',
  'Final result',
  'Call-to-action',
];

const blogTopics = [
  'What to Do After Hail Damage in Algonquin',
  'How to Tell If Your Roof Has Wind Damage',
  'Does Insurance Cover Roof Replacement After a Storm?',
  'How Drone Roof Inspections Work',
  'Roof Replacement Cost in Algonquin, IL',
  'Hail Damage vs Normal Roof Wear',
  'When Should You Tarp a Roof After Storm Damage?',
  'How Long Does a Roof Insurance Claim Take?',
  'Best Roofing Materials for Illinois Weather',
  'Should You Get a Roof Inspection After a Severe Storm?',
];

const ownerLeadershipItems = [
  'Short expert videos explaining storm damage, roofing decisions, inspections, and insurance-adjacent questions in plain English.',
  'Founder-led posts that make Umbrella feel experienced, local, and accountable instead of faceless.',
  'Commentary after major storms or seasonal weather shifts so homeowners know what to look for and when to call.',
  'Reusable clips and quotes for the website, Google Business Profile, social posts, retargeting ads, and email follow-up.',
];

const photographyNeeds = [
  'Owner and team portraits',
  'Inspection and drone photos',
  'Jobsite process photos',
  'Finished exterior details',
];

const campaignTypes = [
  {
    title: 'Storm Response',
    body: 'For periods after hail, wind, or heavy storms.',
    message:
      'Recent hail or wind in the area? Your roof may have damage you cannot see from the ground. Schedule a no-cost roof inspection with a local Algonquin restoration contractor.',
    creative: [
      'Drone footage over a roof',
      'Close-up shots of shingle damage',
      'Quick explanation from the owner or inspector',
      'Before and after roof repair visuals',
      'Map-style local service area visual',
    ],
    cta: 'Book a No-Cost Roof Inspection',
  },
  {
    title: 'Drone Roof Inspection',
    body: 'A strong visual hook and clear differentiator.',
    message:
      'We can inspect your roof safely and quickly with drone technology, document potential storm damage, and help you understand the next step.',
    creative: [
      'Drone launching from driveway',
      'Drone footage of a residential roof',
      'On-screen examples of what inspectors look for',
      'Voiceover explaining that damage is not always visible from the ground',
    ],
    cta: 'Schedule a Drone Roof Inspection',
  },
  {
    title: 'Insurance Education',
    body: 'Build trust with homeowners confused about storm damage and insurance.',
    message:
      'Not sure if your roof damage is worth an insurance claim? We can inspect the damage, document what we find, and explain the process in plain English.',
    creative: [
      'Short talking-head video',
      'Simple step-by-step graphics',
      'Inspect, document, review findings, help with next steps',
      'Avoid legal or insurance guarantees',
    ],
    cta: 'Talk to a Local Roofing Specialist',
  },
  {
    title: 'Before and After',
    body: 'Simple, effective construction proof.',
    message:
      'Storm damage repaired. Roof replaced. Home protected. See how Umbrella helps local homeowners restore their properties after severe weather.',
    creative: [
      'Before/after roof shots',
      'Siding damage before/after',
      'Quick project recap',
      'Customer testimonial if available',
    ],
    cta: 'Request an Inspection',
  },
  {
    title: 'Financing',
    body: 'Help convert homeowners worried about cost.',
    message:
      'Need roof or exterior work but want flexible payment options? Umbrella offers financing options for qualifying projects.',
    creative: ['Clean roof/home exterior graphic', 'Short video explaining financing availability'],
    cta: 'Ask About Financing',
  },
  {
    title: 'Retargeting',
    body: 'Follow up with people who visited, watched, or clicked but did not contact the company.',
    message:
      'Still need a roof inspection? Umbrella Construction & Restoration serves Algonquin and nearby suburbs with roofing, storm damage restoration, siding, and exterior repairs.',
    creative: [
      'Owner message',
      'Review or testimonial graphic',
      'Completed project photo',
      'Schedule your inspection reminder',
    ],
    cta: 'Schedule Your Inspection',
  },
];

const videoConcepts = [
  {
    title: 'After the Storm',
    length: '15 seconds',
    beats: [
      'Open on damaged shingles or storm clouds',
      'Voiceover: after hail or high winds, roof damage is not always visible from the ground',
      'Drone shot over roof',
      'Umbrella offers no-cost roof inspections in Algonquin and nearby suburbs',
      'CTA: Schedule your inspection today',
    ],
  },
  {
    title: 'Drone Inspection',
    length: '30 seconds',
    beats: [
      'Inspector or drone setup',
      'Drone footage of roof',
      'Close-up of damage',
      'Screen recording or visual of inspection notes',
      'Explain that the inspection helps document damage and determine next steps',
      'CTA: Book a drone roof inspection',
    ],
  },
  {
    title: 'Insurance Confusion',
    length: '30 seconds',
    beats: [
      'Owner or team member talking directly to camera',
      'Explain that many homeowners are not sure what to do after storm damage',
      'Umbrella inspects, documents findings, and explains the next step clearly',
      'Add simple text overlays',
      'CTA: Call Umbrella for a no-cost inspection',
    ],
  },
  {
    title: 'Before and After',
    length: '15 seconds',
    beats: [
      'Before roof shot',
      'Quick transition',
      'After roof shot',
      'Text: Roof replacement after storm damage',
      'Text: Algonquin, IL and nearby suburbs',
      'CTA: Request an inspection',
    ],
  },
  {
    title: 'Why Umbrella',
    length: '30 seconds',
    beats: [
      'Show team, truck, and jobsite',
      'Mention local service, experience, inspections, restoration, and exterior work',
      'Keep the message simple and human',
      'CTA: Call or schedule online',
    ],
  },
];

const reportingItems = [
  'Website traffic from real channels',
  'Organic search and ranking movement',
  'Calls, form submissions, and Meta leads',
  'Cost per lead and lead quality',
  'Ads and pages that generated the best leads',
  'What changed this month and what improves next',
];

const timeline = [
  {
    range: 'Month 1',
    title: 'Cleanup and foundation',
    items: [
      'Clean up website issues found in the audit',
      'Fix contact information and trust signals',
      'Improve homepage messaging',
      'Build or improve the main service page structure',
      'Set up proper tracking for calls, forms, and ad leads',
      'Prepare first Meta campaign structure',
      'Create first video ad concepts',
      'Launch initial ads with controlled budget',
    ],
  },
  {
    range: 'Month 2',
    title: 'Service pages and ad testing',
    items: [
      'Build priority SEO service pages',
      'Improve internal linking',
      'Create first local case study pages if project photos/details are available',
      'Test storm damage, drone inspection, insurance claim help, roof inspection, and before/after ad angles',
      'Adjust targeting, creative, and budget',
      'Review lead quality',
    ],
  },
  {
    range: 'Month 3',
    title: 'Local growth and optimization',
    items: [
      'Build additional service/location pages',
      'Add educational blog content',
      'Add project proof and before/after assets',
      'Expand winning ads',
      'Pause weak campaigns',
      'Improve conversion points on the website',
      'Review SEO ranking movement and lead quality',
      'Create the next 90-day plan',
    ],
  },
];

const willNotDo = [
  'Buy fake traffic',
  'Use bots to inflate analytics',
  'Report meaningless numbers as success',
  'Promise guaranteed rankings',
  'Hide ad spend or campaign performance',
  'Use confusing reports to make weak performance look strong',
  'Build low-quality copy-paste SEO pages',
  'Run ads without explaining what they are trying to accomplish',
];

const needsFromUmbrella = [
  'Access to the website',
  'Access to Google Business Profile, if applicable',
  'Access to Google Search Console and Google Analytics, if available',
  'Access to Meta Business Manager and ad account',
  'List of preferred service areas',
  'List of highest-value services',
  'Real project photos and videos',
  'Existing customer reviews or testimonials',
  'Certifications, licenses, insurance details, or manufacturer partnerships',
  'Basic lead feedback each month: which leads were good, which were not, and which turned into appointments or jobs',
];

const focusAngles = [
  'Local roofing contractor',
  'Storm damage restoration',
  'Hail and wind damage inspections',
  'Drone roof inspections',
  'Insurance claim support',
  'Exterior restoration',
  'Before and after project proof',
  'No-cost inspection CTA',
];

const investmentItems = [
  'SEO strategy and implementation',
  'Website cleanup and on-page optimization',
  'Service page creation or improvement',
  'Local SEO improvements',
  'Meta ads management',
  'Ad creative planning',
  'Short-form video ad creation',
  'Monthly reporting',
  'Lead-quality review and optimization',
];

const growthExpansionServices = [
  {
    title: 'Custom CRM Creation',
    status: 'Currently test driving',
    body:
      'A custom CRM could help Umbrella capture website forms, inspection requests, Meta leads, follow-up status, estimate progress, lead source, and monthly lead-quality notes in one place.',
    fit:
      'Best fit if lead volume increases and the team wants a clearer workflow from new inquiry to inspection, estimate, job, review request, and future follow-up.',
    examples: [
      'Lead intake and source tracking',
      'Inspection and estimate pipeline',
      'Follow-up reminders',
      'Simple reporting by service area and lead quality',
    ],
  },
  {
    title: 'Google Ads',
    status: 'Currently test driving',
    body:
      'Google Ads could be tested after the SEO and tracking foundation are cleaned up, especially for high-intent searches where homeowners are actively looking for roofing, storm damage, or inspection help.',
    fit:
      'Best fit if search demand is strong, the landing pages are ready, and Umbrella wants to compare paid search leads against Meta leads and organic SEO opportunities.',
    examples: [
      'Roof inspection search campaigns',
      'Storm damage and hail damage campaigns',
      'Service-area landing page tests',
      'Lead quality comparison against Meta campaigns',
    ],
  },
];

const proposalSections = [
  {
    number: '01',
    title: 'Overview',
    image: proposalImages.heroSlide,
    summary:
      'Build a clearer local acquisition system for roofing, storm damage, inspection, and exterior restoration work.',
    points: ['No vanity metrics', 'No inflated reporting', 'Lead quality over empty clicks'],
  },
  {
    number: '02',
    title: 'Marketing Goals',
    image: proposalImages.local,
    summary:
      'Position Umbrella as practical, local, trustworthy, and easy to contact when homeowners need help.',
    points: ['Qualified local leads', 'Trust-first messaging', 'High-intent local search'],
  },
  {
    number: '03',
    title: 'SEO Scope',
    image: proposalImages.seo,
    summary:
      'Clean up unfinished pages, organize services for Google and customers, and make the site more specific to the work Umbrella wants to sell.',
    points: ['Website cleanup', 'Service page buildout', 'Local SEO pages'],
  },
  {
    number: '04',
    title: 'Project Proof',
    image: proposalImages.roofing,
    summary:
      'Turn completed work into case studies that show local relevance, inspection findings, materials, timelines, and final results.',
    points: ['Real project examples', 'Before and after media', 'Conversion-focused calls-to-action'],
  },
  {
    number: '05',
    title: 'Education Content',
    image: proposalImages.content,
    summary:
      'Capture homeowners searching for answers before they are ready to book an inspection.',
    points: ['Hail damage guides', 'Insurance claim explainers', 'Drone inspection education'],
  },
  {
    number: '06',
    title: 'Meta Ads Strategy',
    image: proposalImages.ads,
    summary:
      'Run local, direct, trustworthy Facebook and Instagram campaigns built around inspection requests and retargeting.',
    points: ['Storm response', 'Drone inspection', 'Retargeting'],
  },
  {
    number: '07',
    title: 'Video Creative',
    image: proposalImages.video,
    summary:
      'Translate real industry knowledge into short, human video ads that explain what homeowners should do next.',
    points: ['15-second hooks', '30-second explainers', 'Before and after proof'],
  },
  {
    number: '08',
    title: 'Tracking and Reporting',
    image: proposalImages.reporting,
    summary:
      'Make performance readable: what was spent, what leads came in, which were qualified, and what changes next.',
    points: ['Calls and forms', 'Cost per lead', 'Lead quality review'],
  },
];

function SectionKicker({
  number,
  label,
  invert = false,
}: {
  number: string;
  label: string;
  invert?: boolean;
}) {
  return (
    <p
      className={`proposal-section-kicker font-mono text-xs uppercase tracking-[0.24em] mb-4 ${
        invert ? 'text-[#E8E4DD]/45' : 'text-text-dark/45'
      }`}
    >
      <span className="text-accent">Section {number}</span> / {label}
    </p>
  );
}

function RotatingSearchList({
  eyebrow,
  title,
  items,
  helperText,
  modalTitle,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  helperText?: string;
  modalTitle: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = items[activeIndex] ?? '';
  const visibleText = activeItem.slice(0, typedLength);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const delay = typedLength >= activeItem.length ? 1350 : 42;
    const timeoutId = window.setTimeout(() => {
      if (typedLength >= activeItem.length) {
        setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
        setTypedLength(0);
        return;
      }

      setTypedLength((currentLength) => currentLength + 1);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [activeItem.length, items.length, typedLength]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className="proposal-animate-card rounded-[1.25rem] border border-text-dark/10 bg-background p-7 md:p-8 transition-transform duration-300 hover:-translate-y-1">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-4">
          {eyebrow}
        </p>
        <h3 className="text-3xl font-serif italic leading-tight mb-5">{title}</h3>
        <div className="rounded-2xl border border-text-dark/10 bg-primary p-4 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl border border-text-dark/10 bg-background px-4 py-4">
            <Search className="shrink-0 text-accent" size={18} />
            <p className="min-h-[1.75rem] flex-1 text-base font-semibold text-text-dark/78 md:text-lg">
              {visibleText}
              <span className="ml-0.5 inline-block h-5 w-px translate-y-1 bg-accent"></span>
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dark/45">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-text-dark px-4 py-2 text-sm font-bold text-background transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              View all <ArrowRight size={15} />
            </button>
          </div>
        </div>
        {helperText && <p className="mt-5 text-text-dark/64 leading-relaxed">{helperText}</p>}
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#111111]/72 px-5 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${eyebrow.replace(/\W+/g, '-').toLowerCase()}-modal-title`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="max-h-[86dvh] w-full max-w-3xl overflow-hidden rounded-[1.25rem] border border-[#E8E4DD]/12 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5 border-b border-text-dark/10 p-5 md:p-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-2">
                  Full List
                </p>
                <h4
                  id={`${eyebrow.replace(/\W+/g, '-').toLowerCase()}-modal-title`}
                  className="text-2xl font-bold"
                >
                  {modalTitle}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-text-dark/10 bg-primary text-text-dark transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close list"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[62dvh] overflow-y-auto p-5 md:p-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((item, index) => (
                  <div key={item} className="rounded-xl border border-text-dark/10 bg-primary p-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="font-semibold leading-relaxed text-text-dark/76">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim() === PROPOSAL_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, 'true');
      onUnlock();
      return;
    }

    setError('That password did not match. Please check the client password and try again.');
  };

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-x-hidden bg-[#111111] px-4 py-8 text-[#E8E4DD] sm:px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 opacity-35">
        <img
          src={proposalImages.hero}
          alt=""
          className="h-full w-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(230,59,46,0.34),transparent_32%),linear-gradient(90deg,#111111_0%,rgba(17,17,17,0.84)_48%,rgba(17,17,17,0.62)_100%)]"></div>
      </div>

      <section className="relative grid w-full max-w-5xl grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-[1fr_0.75fr] lg:gap-10">
        <div>
          <Link to="/" className="mb-8 inline-flex items-center gap-3 sm:mb-10 lg:mb-12">
            <img
              src="/images/Obskura - Black Stroke SVG - NO BG.svg"
              alt="Obskura"
              className="h-8 object-contain invert sm:h-9"
            />
            <span className="text-lg font-bold tracking-tight sm:text-xl">Obskura</span>
          </Link>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent sm:text-xs sm:tracking-[0.26em]">
            Private Proposal
          </p>
          <h1 className="mb-5 max-w-[11ch] font-serif text-[3rem] italic leading-[0.92] sm:max-w-none sm:text-5xl md:text-7xl">
            Umbrella Construction & Restoration
          </h1>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-[#E8E4DD]/72 sm:text-lg md:text-xl">
            A focused SEO, Meta ads, video creative, and lead-quality tracking plan for local
            roofing and storm restoration growth.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-[1.25rem] border border-[#E8E4DD]/12 bg-[#111111]/78 p-5 shadow-2xl backdrop-blur-xl sm:p-6 md:rounded-[1.5rem] md:p-8"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white sm:mb-8 sm:h-13 sm:w-13">
            <Lock size={20} />
          </div>
          <h2 className="mb-3 text-2xl font-bold">Unlock the proposal</h2>
          <p className="mb-6 text-sm leading-relaxed text-[#E8E4DD]/58 sm:mb-7">
            This page is password protected for client review.
          </p>
          <label htmlFor="proposal-password" className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8E4DD]/45 sm:text-xs sm:tracking-[0.2em]">
            Password
          </label>
          <div className="mt-3 flex gap-2.5 sm:gap-3">
            <input
              id="proposal-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError('');
              }}
              className="min-w-0 flex-1 rounded-full border border-[#E8E4DD]/15 bg-[#E8E4DD] px-4 py-3 text-[#111111] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40 sm:px-5"
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="magnetic-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]"
              aria-label="Unlock proposal"
            >
              <ArrowRight className="relative z-10 group-hover:translate-x-0.5 transition-transform" size={18} />
              <span className="hover-bg bg-[#E8E4DD]"></span>
            </button>
          </div>
          {error && <p className="mt-4 text-sm text-accent">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default function ProposalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(() => window.localStorage.getItem(STORAGE_KEY) === 'true');

  const proposalDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date()),
    []
  );

  useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.proposal-hero-content > *', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.proposal-section').forEach((section) => {
        const headingElements = section.querySelectorAll(
          '.proposal-section-icon, .proposal-section-kicker, .proposal-section-title, .proposal-section-copy'
        );
        const cards = section.querySelectorAll('.proposal-animate-card');

        if (headingElements.length) {
          gsap.from(headingElements, {
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
            },
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
            y: 28,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isUnlocked]);

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-text-dark font-sans selection:bg-accent selection:text-white"
    >
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-6xl rounded-full bg-background/90 backdrop-blur-xl border border-text-dark/20 shadow-md transition-all duration-300">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/images/Obskura - Black Stroke SVG - NO BG.svg"
              alt="Obskura Logo"
              className="h-9 object-contain saturate-200"
            />
          </Link>
          <Link to="/" className="text-xl font-bold tracking-tight">
            Obskura
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-dark">
          <a href="#scope" className="hover-lift hover:text-accent transition-colors">
            Scope
          </a>
          <a href="#plan" className="hover-lift hover:text-accent transition-colors">
            Plan
          </a>
          <a href="#next-steps" className="hover-lift hover:text-accent transition-colors">
            Next Steps
          </a>
        </div>
      </nav>

      <section className="relative isolate min-h-[72dvh] md:min-h-[78dvh] overflow-hidden px-6 md:px-12 lg:px-24 pt-28 md:pt-30 pb-12 md:pb-14 flex items-start md:items-center border-b border-text-dark/10">
        <div className="absolute inset-0">
          <img
            src={proposalImages.hero}
            alt="Roofing crew working on a residential roof"
            className="h-full w-full object-cover object-center grayscale-[18%] contrast-110 opacity-72"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(230,59,46,0.28),transparent_30%),linear-gradient(90deg,rgba(245,243,238,0.98)_0%,rgba(245,243,238,0.9)_42%,rgba(245,243,238,0.28)_100%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="proposal-hero-content max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-text-dark/10 bg-background/92 px-4 py-2 shadow-sm backdrop-blur-sm">
                <img
                  src={proposalImages.logo}
                  alt="Umbrella Construction & Restoration"
                  className="h-7 w-auto object-contain"
                />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-text-dark/10 bg-background/90 px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase text-accent shadow-sm backdrop-blur-sm">
                <ShieldCheck size={14} /> Private Proposal
              </span>
              <span className="rounded-full border border-text-dark/10 bg-background/80 px-4 py-2 font-mono text-xs tracking-[0.18em] uppercase text-text-dark/55 shadow-sm backdrop-blur-sm">
                {proposalDate}
              </span>
            </div>
            <p className="font-mono text-xs tracking-[0.24em] uppercase text-text-dark/50 mb-5">
              Prepared for
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[6.6rem] font-serif italic leading-[0.9] tracking-tight mb-7">
              Umbrella Construction & Restoration
            </h1>
            <p className="max-w-3xl text-xl md:text-2xl text-text-dark/78 font-medium leading-relaxed">
              SEO, Meta ads management, video ad creative, reporting, and lead-quality tracking
              built around real inspection requests instead of inflated marketing noise.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              {['SEO foundation', 'Meta lead engine', 'Video creative'].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-text-dark/10 bg-background/88 px-5 py-4 shadow-sm backdrop-blur-sm"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-2">
                    Included
                  </p>
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-16 bg-primary border-b border-text-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.72fr_1fr] gap-12 items-start">
          <div>
            <SectionKicker number="01" label="Strategy Thesis" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-serif italic leading-tight mb-5">
              Simple reporting.
            </h2>
            <p className="proposal-section-copy text-lg text-text-dark/70 leading-relaxed">
              Because Umbrella has had a bad experience with marketing reporting before, this plan
              is structured around transparency. If something is working, we show it. If something
              is not working, we show that too and explain what changes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <div
                key={goal}
                className={
                  index === 0
                    ? 'proposal-animate-card rounded-[1.15rem] border border-[#E8E4DD]/10 bg-[#111111] p-5 text-[#E8E4DD] shadow-sm sm:col-span-2 transition-transform duration-300 hover:-translate-y-1'
                    : 'proposal-animate-card rounded-[1.15rem] border border-text-dark/10 bg-background p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1'
                }
              >
                <span className="font-mono text-xs text-accent mb-3 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className={`font-semibold leading-relaxed ${index === 0 ? 'text-[#E8E4DD]/86' : 'text-text-dark/78'}`}>
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-20 bg-background border-b border-text-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-10 items-start">
          <div>
            <SectionKicker number="02" label="Discovery Questions" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-serif italic leading-tight mb-5">
              The proposal starts with the operating questions.
            </h2>
            <p className="proposal-section-copy text-lg text-text-dark/70 leading-relaxed">
              These answers shape tracking, reporting, platform decisions, service area focus, and
              the first campaign build. The goal is to understand how leads are currently captured,
              followed up with, and judged before we scale spend or content.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {discoveryQuestions.map((question, index) => (
              <div
                key={question}
                className={`proposal-animate-card rounded-xl border border-text-dark/10 p-5 transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 ? 'sm:col-span-2 bg-[#111111] text-[#E8E4DD]' : 'bg-primary'
                }`}
              >
                <span className="font-mono text-xs text-accent mb-3 block">
                  Q{String(index + 1).padStart(2, '0')}
                </span>
                <p className={`font-semibold leading-relaxed ${index === 0 ? 'text-[#E8E4DD]/82' : 'text-text-dark/76'}`}>
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="scope" className="proposal-section py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionKicker number="03" label="Proposal Pages" />
              <h2 className="proposal-section-title text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Proposal Pages
              </h2>
              <p className="proposal-section-copy font-mono text-text-dark/60 max-w-2xl">
                Each section turns the original proposal deck into a client-readable page with a
                matching image and a clear business purpose.
              </p>
            </div>
            <div className="proposal-animate-card rounded-full border border-text-dark/10 bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-text-dark/58">
              Prepared by Conall Fahey / Obskura Studios
            </div>
          </div>

          <div className="proposal-page-stack grid grid-cols-1 lg:grid-cols-2 gap-6">
            {proposalSections.map((section, index) => (
              <article
                key={section.title}
                className={`proposal-animate-card proposal-page-card overflow-hidden rounded-[1.25rem] border border-text-dark/10 bg-primary shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 || index === 5 ? 'lg:col-span-2 grid lg:grid-cols-[0.86fr_1fr]' : ''
                }`}
              >
                <div className={`${index === 0 || index === 5 ? 'lg:order-2' : ''} relative aspect-[4/3] overflow-hidden bg-text-dark`}>
                  <img
                    src={section.image}
                    alt={`${section.title} proposal visual`}
                    className="h-full w-full object-cover grayscale-[14%] contrast-110 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/62 via-transparent to-transparent"></div>
                  <span className="absolute left-5 top-5 rounded-full bg-background/92 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-dark shadow-sm">
                    Page {section.number}
                  </span>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-4">
                      {section.number} / {section.title}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-serif italic leading-tight mb-5">
                      {section.title}
                    </h3>
                    <p className="text-lg text-text-dark/74 leading-relaxed font-medium">
                      {section.summary}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {section.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-text-dark/10 bg-background px-4 py-2 text-sm font-semibold text-text-dark/72"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-24 bg-primary border-y border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <Search className="proposal-section-icon text-accent mb-5" size={30} />
              <SectionKicker number="04" label="SEO Scope" />
              <h2 className="proposal-section-title text-4xl md:text-5xl font-bold tracking-tight mb-5">
                SEO scope in full.
              </h2>
              <p className="proposal-section-copy text-lg text-text-dark/70 leading-relaxed">
                SEO is focused on making the site more useful, more local, and more specific to
                the services Umbrella wants to sell. The biggest opportunity is that the business
                already has the ingredients for good local marketing, but the site needs to be
                cleaned up and rebuilt around the searches that generate real calls.
              </p>
            </div>
            <div className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-7 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-5">
                Website Audit Notes
              </p>
              <div className="space-y-4">
                {auditIssues.map((issue) => (
                  <div key={issue} className="flex items-start gap-3">
                    <Check className="mt-1 shrink-0 text-accent" size={16} />
                    <p className="text-[#E8E4DD]/72 leading-relaxed">{issue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="proposal-animate-card rounded-[1.25rem] border border-text-dark/10 bg-background p-7 md:p-8 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-4">
                A. Website Cleanup
              </p>
              <h3 className="text-3xl font-serif italic leading-tight mb-5">
                Make the site feel real, local, and trustworthy.
              </h3>
              <div className="space-y-3">
                {cleanupItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                    <p className="font-semibold text-text-dark/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <RotatingSearchList
              eyebrow="B. Service Page Buildout"
              title="Build pages around how customers search."
              items={seoPages}
              helperText="Dedicated service pages make it easier for Google and homeowners to understand exactly what Umbrella offers, where the work is available, and which page should rank for each high-intent roofing or restoration search."
              modalTitle="Service Page Buildout Queries"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-6">
            <RotatingSearchList
              eyebrow="Page Anatomy"
              title="Every service page should answer the real buying questions."
              items={servicePageStructure}
              helperText="Google ranks individual pages, not just the homepage. If someone searches for hail damage roof inspection in Algonquin, the site needs a page specifically built around that topic."
              modalTitle="Service Page Questions"
            />

            <RotatingSearchList
              eyebrow="C. Local SEO Pages"
              title="Expand into nearby service areas without copy-paste pages."
              items={locationPages}
              helperText="These pages should feel specific and useful. They should not be thin pages where only the city name changes."
              modalTitle="Local SEO Page Queries"
            />
          </div>

        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-24 bg-primary border-b border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-4xl">
            <SectionKicker number="05" label="Project Proof and Education" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-serif italic leading-tight mb-5">
              Build trust before the homeowner is ready to call.
            </h2>
            <p className="proposal-section-copy text-lg text-text-dark/70 leading-relaxed">
              The site should show real work and answer real homeowner questions. Project pages
              create proof; educational content creates confidence before someone asks for an
              inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_0.96fr] gap-6 items-stretch">
            <article className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-7 md:p-9 overflow-hidden relative transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[linear-gradient(rgba(245,243,238,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.16)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-4">
                  Dedicated Project Proof
                </p>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Turn completed work into local credibility.
                </h3>
                <p className="text-lg text-[#E8E4DD]/70 leading-relaxed mb-8">
                  Each finished job can become a useful sales asset: what happened, what Umbrella
                  found, how the repair or replacement was handled, and what the finished result
                  looked like.
                </p>
                <div className="space-y-3 mb-8">
                  {caseStudyExamples.map((example) => (
                    <div key={example} className="flex items-start gap-3">
                      <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                      <p className="font-semibold text-[#E8E4DD]/72">{example}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {caseStudyFields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full border border-[#E8E4DD]/10 bg-[#1A1A1A] px-3 py-1.5 text-sm font-semibold text-[#E8E4DD]/68"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <RotatingSearchList
              eyebrow="Dedicated Educational Content"
              title="Answer the questions that happen before the lead."
              items={blogTopics}
              helperText="These articles can rank for long-tail searches and give ads or service pages stronger supporting material when homeowners are still comparing options."
              modalTitle="Educational Content Topics"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-6 items-stretch">
            <article className="proposal-animate-card rounded-[1.25rem] border border-text-dark/10 bg-background p-7 md:p-9 transition-transform duration-300 hover:-translate-y-1">
              <UserRoundCheck className="text-accent mb-5" size={30} />
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-4">
                Owner-Led Authority
              </p>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight mb-6">
                Position Umbrella&apos;s owners as trusted voices in the industry.
              </h3>
              <p className="text-lg text-text-dark/70 leading-relaxed mb-8">
                Beyond ranking pages, the brand should make the people behind Umbrella visible:
                credible, helpful, and confident enough to teach homeowners what matters before
                they choose a contractor.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ownerLeadershipItems.map((item) => (
                  <div key={item} className="rounded-xl bg-primary border border-text-dark/10 p-4">
                    <p className="font-semibold leading-relaxed text-text-dark/72">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-7 md:p-9 overflow-hidden relative transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[linear-gradient(rgba(245,243,238,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.16)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative">
                <Camera className="text-accent mb-5" size={30} />
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-4">
                  Photography Support
                </p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                  Build a stronger library for the website and socials.
                </h3>
                <p className="text-lg text-[#E8E4DD]/70 leading-relaxed mb-7">
                  A focused photo session would give Umbrella more real visual proof for service
                  pages, social posts, ads, project recaps, and owner-led content.
                </p>
                <div className="space-y-3">
                  {photographyNeeds.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                      <p className="font-semibold text-[#E8E4DD]/72">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-24 bg-background border-b border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-4xl">
            <SectionKicker number="06" label="Growth Expansion Services" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-serif italic leading-tight mb-5 max-w-3xl">
              Additional systems we can test if the fit is right.
            </h2>
            <p className="proposal-section-copy text-lg text-text-dark/70 leading-relaxed max-w-3xl">
              These are services we are currently test driving with other clients and could bring
              into Umbrella&apos;s growth system if the early lead data, tracking needs, or search
              demand point in that direction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {growthExpansionServices.map((addOn, index) => (
              <article
                key={addOn.title}
                className={`proposal-animate-card rounded-[1.25rem] border p-7 md:p-8 transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0
                    ? 'border-[#E8E4DD]/10 bg-[#111111] text-[#E8E4DD]'
                    : 'border-text-dark/10 bg-primary text-text-dark'
                }`}
              >
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] ${
                      index === 0
                        ? 'bg-[#1A1A1A] text-accent border border-[#E8E4DD]/10'
                        : 'bg-background text-accent border border-text-dark/10'
                    }`}
                  >
                    {addOn.status}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-45">
                    Expansion Lane
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                  {addOn.title}
                </h3>
                <p className={`text-lg leading-relaxed mb-6 ${index === 0 ? 'text-[#E8E4DD]/70' : 'text-text-dark/72'}`}>
                  {addOn.body}
                </p>
                <div
                  className={`rounded-xl border p-5 mb-6 ${
                    index === 0
                      ? 'border-[#E8E4DD]/10 bg-[#1A1A1A]'
                      : 'border-text-dark/10 bg-background'
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
                    Fit Signal
                  </p>
                  <p className={`font-semibold leading-relaxed ${index === 0 ? 'text-[#E8E4DD]/76' : 'text-text-dark/76'}`}>
                    {addOn.fit}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOn.examples.map((example) => (
                    <div key={example} className="flex items-start gap-3">
                      <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                      <p className={`font-semibold ${index === 0 ? 'text-[#E8E4DD]/66' : 'text-text-dark/68'}`}>
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proposal-section py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <SectionKicker number="07" label="Campaign System" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Campaign System
            </h2>
            <p className="proposal-section-copy font-mono text-text-dark/60 max-w-2xl">
              Meta ads should answer homeowner questions directly and move qualified prospects
              toward inspections.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch">
            <div className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-7 md:p-9 overflow-hidden relative">
              <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(245,243,238,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.13)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative">
                <Megaphone className="text-accent mb-7" size={30} />
                <h3 className="text-4xl md:text-5xl font-serif italic leading-tight mb-6">
                  Local ads that feel useful before they feel polished.
                </h3>
                <p className="text-lg text-[#E8E4DD]/68 leading-relaxed mb-8">
                  The creative should answer: Is my roof damaged? Will insurance cover this? Do I
                  need to act quickly? Can I trust this company?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {campaignTypes.map((campaign) => (
                    <div key={campaign.title} className="rounded-xl border border-[#E8E4DD]/10 bg-[#1A1A1A] p-5 transition-transform duration-300 hover:-translate-y-1">
                      <p className="font-bold mb-2">{campaign.title}</p>
                      <p className="text-sm leading-relaxed text-[#E8E4DD]/58 mb-4">
                        {campaign.body}
                      </p>
                      <div className="rounded-xl bg-black/35 border border-[#E8E4DD]/10 p-4 mb-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-2">
                          Example Message
                        </p>
                        <p className="text-sm leading-relaxed text-[#E8E4DD]/72">
                          {campaign.message}
                        </p>
                      </div>
                      <div className="space-y-2 mb-4">
                        {campaign.creative.map((idea) => (
                          <div key={idea} className="flex items-start gap-2">
                            <Check className="mt-0.5 shrink-0 text-accent" size={13} />
                            <p className="text-xs leading-relaxed text-[#E8E4DD]/58">{idea}</p>
                          </div>
                        ))}
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8E4DD]/42">
                        CTA: <span className="text-accent">{campaign.cta}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="proposal-animate-card rounded-[1.25rem] border border-text-dark/10 bg-primary p-7">
                <Film className="text-accent mb-5" size={28} />
                <h3 className="text-3xl font-bold mb-3">Video ad creation</h3>
                <p className="text-text-dark/68 leading-relaxed mb-6">
                  Roofing and restoration are visual services. The videos should be short, clear,
                  practical, and built from Umbrella&apos;s real industry knowledge.
                </p>
                <div className="space-y-4">
                  {videoConcepts.map((concept) => (
                  <div key={concept.title} className="rounded-xl bg-background p-5 border border-text-dark/10 transition-transform duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <p className="font-bold text-xl">{concept.title}</p>
                        <span className="shrink-0 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                          {concept.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {concept.beats.map((beat) => (
                          <div key={beat} className="flex items-start gap-3">
                            <Sparkles className="mt-0.5 shrink-0 text-accent" size={15} />
                            <p className="text-sm leading-relaxed text-text-dark/70">{beat}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="proposal-animate-card overflow-hidden rounded-[1.25rem] border border-text-dark/10 bg-primary">
                <img
                  src={proposalImages.video}
                  alt="Camera filming construction work"
                  className="h-80 w-full object-cover grayscale-[12%] contrast-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-24 bg-primary border-y border-text-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 items-center">
          <div>
            <BarChart3 className="proposal-section-icon text-accent mb-5" size={30} />
            <SectionKicker number="08" label="Tracking and Reporting" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-serif italic leading-tight mb-6">
              Report what matters. Improve what works.
            </h2>
            <p className="proposal-section-copy text-lg text-text-dark/72 leading-relaxed mb-8">
              Monthly reporting should be understandable without technical SEO or ad knowledge:
              spend, leads, source, quality, booked appointments, best-performing creative, and
              next-month changes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reportingItems.map((item) => (
                <div key={item} className="proposal-animate-card rounded-xl bg-background border border-text-dark/10 p-4 flex gap-3 items-start transition-transform duration-300 hover:-translate-y-1">
                  <LineChart className="text-accent shrink-0 mt-0.5" size={17} />
                  <p className="font-semibold text-text-dark/76">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-6 md:p-8 shadow-xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#E8E4DD]/42 mb-6">
              Example Monthly Readout
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ['Meta Spend', '$X'],
                ['Lead Volume', 'X'],
                ['Avg. CPL', '$X'],
                ['Booked', 'X'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#E8E4DD]/10 bg-[#1A1A1A] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8E4DD]/42 mb-2">
                    {label}
                  </p>
                  <p className="text-3xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-[#E8E4DD]/68 leading-relaxed">
              The best-performing ad was the drone inspection video. Next month, we increase that
              creative and test a storm damage version while reviewing lead quality by service area.
            </p>
          </div>
        </div>
      </section>

      <section className="proposal-section px-6 md:px-12 lg:px-24 py-24 bg-background border-b border-text-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-10 items-start">
          <div>
            <SectionKicker number="09" label="Boundaries" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-serif italic leading-tight mb-5">
              Transparency is part of the scope.
            </h2>
            <p className="proposal-section-copy text-lg text-text-dark/70 leading-relaxed">
              The work should stay clean, measurable, and tied to actual business outcomes. This
              means avoiding tactics that make reports look better while making the business no
              stronger.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {willNotDo.map((item, index) => (
              <div
                key={item}
                className={`proposal-animate-card rounded-xl border border-text-dark/10 p-5 transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 ? 'sm:col-span-2 bg-[#111111] text-[#E8E4DD]' : 'bg-primary'
                }`}
              >
                <span className="font-mono text-xs text-accent mb-3 block">
                  Boundary {String(index + 1).padStart(2, '0')}
                </span>
                <p className={`font-semibold leading-relaxed ${index === 0 ? 'text-[#E8E4DD]/80' : 'text-text-dark/74'}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="proposal-section proposal-timeline py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionKicker number="10" label="First 90 Days" />
              <h2 className="proposal-section-title text-4xl md:text-5xl font-bold tracking-tight mb-4">
                First 90 Days
              </h2>
              <p className="proposal-section-copy font-mono text-text-dark/60 max-w-2xl">
                A practical rollout that fixes the foundation first, then scales what the lead
                quality data proves.
              </p>
            </div>
            <TimerReset className="proposal-section-icon text-accent" size={34} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {timeline.map((phase, index) => (
              <article
                key={phase.range}
                className={`proposal-animate-card timeline-panel rounded-[1.25rem] border border-text-dark/10 p-6 md:p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 ? 'bg-[#111111] text-[#E8E4DD]' : 'bg-primary'
                }`}
              >
                <p className={`font-mono text-xs uppercase tracking-[0.22em] mb-4 ${index === 0 ? 'text-accent' : 'text-text-dark/45'}`}>
                  {phase.range}
                </p>
                <h3 className="text-2xl font-bold mb-5">{phase.title}</h3>
                <div className="space-y-3">
                  {phase.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                      <p className={index === 0 ? 'text-[#E8E4DD]/70' : 'text-text-dark/70'}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="next-steps" className="proposal-section px-6 md:px-12 lg:px-24 pb-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <SectionKicker number="11" label="Needs, Focus, Investment" />
            <h2 className="proposal-section-title text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Needs, Focus, Investment
            </h2>
            <p className="proposal-section-copy font-mono text-text-dark/60 max-w-2xl">
              The proposal closes by clarifying what access is needed, what message should lead
              the marketing, and what the monthly package includes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 items-start mb-6">
            <div className="proposal-animate-card rounded-[1.25rem] border border-text-dark/10 bg-primary p-7 md:p-9 transition-transform duration-300 hover:-translate-y-1">
              <ClipboardList className="text-accent mb-5" size={30} />
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight mb-6">
                What we need from Umbrella.
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {needsFromUmbrella.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-background border border-text-dark/10 p-4">
                    <KeyRound className="mt-0.5 shrink-0 text-accent" size={16} />
                    <p className="font-semibold text-text-dark/74">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-text-dark/64 leading-relaxed">
                That feedback is important. Ads and SEO improve much faster when we know which
                leads are actually valuable.
              </p>
            </div>

            <div className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-7 md:p-9 overflow-hidden relative transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[linear-gradient(rgba(245,243,238,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.16)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-5">
                  Recommended Focus
                </p>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Identify, document, and repair storm-related exterior damage.
                </h3>
                <p className="text-lg text-[#E8E4DD]/70 leading-relaxed mb-8">
                  Umbrella Construction & Restoration helps local homeowners and property owners
                  identify, document, and repair roofing and exterior damage after storms. This
                  positions Umbrella as practical, trustworthy, and local while matching the search
                  and ad angles most likely to generate real leads.
                </p>
                <div className="flex flex-wrap gap-2">
                  {focusAngles.map((angle) => (
                    <span
                      key={angle}
                      className="rounded-full border border-[#E8E4DD]/10 bg-[#1A1A1A] px-4 py-2 text-sm font-semibold text-[#E8E4DD]/72"
                    >
                      {angle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 items-stretch">
            <div className="proposal-animate-card rounded-[1.25rem] border border-text-dark/10 bg-primary p-7 md:p-9 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-4">
                Investment
              </p>
              <h3 className="text-3xl font-serif italic leading-tight mb-6">
                Recommended monthly package.
              </h3>
              <div className="space-y-3 mb-7">
                {investmentItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                    <p className="font-semibold text-text-dark/72">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-background border border-text-dark/10 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-dark/45 mb-3">
                  Pricing Placeholders
                </p>
                <p className="font-semibold text-text-dark/78 leading-relaxed">
                  Monthly management fee: [$X/month]
                  <br />
                  Recommended starting ad budget: [$X/month]
                  <br />
                  Video production: [Included / billed separately depending on shoot scope]
                </p>
              </div>
              <p className="mt-5 text-text-dark/64 leading-relaxed">
                Final pricing can be adjusted based on how aggressive the first 90 days should be
                and how much content already exists.
              </p>
            </div>

            <div className="proposal-animate-card rounded-[1.25rem] bg-[#111111] text-[#E8E4DD] p-7 md:p-9 overflow-hidden relative transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[linear-gradient(rgba(245,243,238,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.16)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent mb-5">
                  Closing
                </p>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  A clearer online presence and a measurable lead engine.
                </h3>
                <p className="text-lg text-[#E8E4DD]/70 leading-relaxed mb-5">
                  Umbrella does not need inflated traffic or complicated marketing reports. The
                  company needs a cleaner website, stronger local SEO, better service pages, clear
                  ad creative, and simple tracking that shows whether real leads are coming in.
                </p>
                <p className="text-lg text-[#E8E4DD]/70 leading-relaxed mb-5">
                  The first priority is fixing the foundation. The second is launching focused
                  campaigns around roofing, storm damage, inspections, and insurance-related
                  homeowner questions. The third is improving based on real lead quality, not fake
                  engagement or vanity numbers.
                </p>
                <p className="text-lg text-[#E8E4DD]/70 leading-relaxed">
                  If executed correctly, Umbrella should have a clearer online presence, stronger
                  local visibility, stronger trust with homeowners, and a more reliable flow of
                  qualified inspection requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] text-[#E8E4DD] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">Obskura</span>
            <span className="text-[#E8E4DD]/40">Private proposal for Umbrella Construction & Restoration</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded border border-[#E8E4DD]/20 bg-[#1A1A1A]">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(230,59,46,0.6)]"></div>
            <span className="font-mono text-[10px] tracking-tight text-[#E8E4DD]/70 uppercase">
              Lead Quality First
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
