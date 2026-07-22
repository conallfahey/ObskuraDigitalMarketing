import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Database,
  FileSignature,
  Filter,
  Gauge,
  ListChecks,
  Lock,
  Mail,
  Megaphone,
  Route,
  Search,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problemQuestions = [
  'Who needs a follow-up today?',
  'Which leads have been quoted but not booked?',
  'Which moves are coming up this week?',
  'Has the contract been signed?',
  'Has the deposit or final payment been handled?',
  'Where did the lead come from?',
  'Who on the team touched the record last?',
];

const stages = ['New Inquiry', 'Quoted', 'Booked', 'Completed'];

const statuses = [
  'new',
  'attempted_contact',
  'quoted',
  'contract_sent',
  'follow_up_needed',
  'booked',
  'lost',
  'spam',
  'archive',
];

const features = [
  {
    title: 'Lead Intake',
    icon: Mail,
    body:
      'The public quote flow captures essential move details while protecting the form with validation, honeypot checks, and a lightweight challenge. Website submissions are processed through a Cloud Function before entering the CRM.',
  },
  {
    title: 'Pipeline Inbox',
    icon: Filter,
    body:
      'The Lead Inbox gives staff a fast view of active opportunities with customer names, phone/email links, referral sources, move dates, statuses, contract state, inline editing, restore/delete controls, and quick access to each record.',
  },
  {
    title: 'Lead Workspace',
    icon: Users,
    body:
      'Each lead has a full workspace for contact information, addresses, route links, move details, service type, crew size, quote ranges, truck or equipment fees, overnight hold notes, internal notes, status changes, booking actions, and activity history.',
  },
  {
    title: 'Contracts',
    icon: FileSignature,
    body:
      'The CRM supports customer-facing contract links, signature capture, contract status tracking, PDF access, resend/regenerate actions, and contract-related activity logging.',
  },
  {
    title: 'Payments',
    icon: CreditCard,
    body:
      'Final payment tools calculate billable time, hourly rate, additional fees, deposits, optional tips, card checkout, processing fee display, and Zelle payment instructions.',
  },
  {
    title: 'Upcoming Moves',
    icon: CalendarDays,
    body:
      'Booked jobs appear in an Upcoming Moves view with customer, date, route, move status, and calendar sync visibility. The team can quickly see what is coming next and whether operational handoff is complete.',
  },
  {
    title: 'Tasks and Follow-Ups',
    icon: ListChecks,
    body:
      'The Tasks page gives the team a simple way to create follow-up work, assign categories, set due dates, and track overdue or recently completed items.',
  },
  {
    title: 'Activity Log',
    icon: Activity,
    body:
      'A searchable activity log records lead creation, notes, emails, quotes, bookings, contracts, payment events, assignment changes, and status updates. It keeps context from disappearing between team members.',
  },
  {
    title: 'Roles and Settings',
    icon: Settings,
    body:
      'The app supports admin, sales, and operations roles. Admins can manage role visibility, notification assignments, Google Calendar connection status, and system utilities for recovering missed inbound leads.',
  },
];

const integrations = [
  { label: 'Firebase Authentication for staff login', icon: Lock },
  { label: 'Firestore for lead, job, task, and activity data', icon: Database },
  { label: 'Cloud Functions for secure intake and automation', icon: Sparkles },
  { label: 'Google Calendar sync for booked moves', icon: CalendarDays },
  { label: 'Email notifications for lead and workflow events', icon: Mail },
  { label: 'Meta lead ingestion for paid social campaigns', icon: Megaphone },
  { label: 'Stripe checkout for card payments', icon: CreditCard },
  { label: 'Zelle instructions for direct payments', icon: CreditCard },
  { label: 'PDF generation and signing flows for contracts', icon: FileSignature },
  { label: 'Google review reminder workflows after completed moves', icon: CheckCircle2 },
];

const visualIdeas = [
  'Sticky pipeline rail that tracks the lead journey as the reader scrolls',
  'Screenshot frames that animate from wireframe placeholders into full UI captures',
  'Status badges that gently transition between CRM states',
  'Timeline entries that appear as the activity log section enters view',
  'Route lines that draw between pickup and drop-off cards',
  'Calendar blocks that slide into the Upcoming Moves section',
  'Contract and payment cards that complete with a satisfying check-state animation',
];

const screenshotSet = [
  {
    file: 'dashboard.png',
    caption:
      'Dashboard with recent leads, upcoming moves, potential revenue, lead trends, referral breakdown, and status charts.',
  },
  {
    file: 'lead-inbox.png',
    caption:
      'Active pipeline table with statuses, contract badges, contact links, referral source, and move dates.',
  },
  {
    file: 'manual-lead-entry.png',
    caption: 'Staff-created lead flow for phone calls, referrals, and walk-ins.',
  },
  {
    file: 'lead-detail.png',
    caption: 'Full sales and operations workspace for one customer.',
  },
  {
    file: 'contract-flow.png',
    caption: 'Contract generation, sent/signed status, PDF access, and customer signing view.',
  },
  {
    file: 'payment-flow.png',
    caption:
      'Final payment request with time, fees, deposit credit, tip, card checkout, and Zelle instructions.',
  },
  {
    file: 'upcoming-moves.png',
    caption: 'Booked moves view with route and calendar sync status.',
  },
  {
    file: 'tasks.png',
    caption: 'Follow-up task board with due dates and team categories.',
  },
  {
    file: 'activity-log.png',
    caption: 'Searchable timeline of notes, bookings, payments, contracts, and status changes.',
  },
  {
    file: 'settings.png',
    caption: 'Role management, notifications, calendar connection, and system utilities.',
  },
];

const timelineItems = [
  'Website quote request received',
  'Lead normalized in Firestore',
  'Sales note added',
  'Contract sent',
  'Move booked',
  'Final payment prepared',
  'Review reminder queued',
];

function ScreenshotPlaceholder({
  title,
  caption,
  variant = 'dashboard',
}: {
  title: string;
  caption: string;
  variant?: 'dashboard' | 'inbox' | 'lead' | 'form' | 'contract' | 'moves' | 'activity' | 'map';
}) {
  return (
    <figure className="screenshot-frame overflow-hidden rounded-[1.75rem] border border-text-dark/10 bg-background shadow-sm">
      <div className="border-b border-text-dark/10 bg-primary px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-dark/45">
              Screenshot Placeholder
            </p>
            <h3 className="mt-1 text-xl font-bold">{title}</h3>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-text-dark/20"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-text-dark/20"></span>
          </div>
        </div>
      </div>
      <div className="relative min-h-[280px] overflow-hidden bg-[#111111] p-5 text-[#E8E4DD]">
        <div className="crm-grid-bg absolute inset-0 opacity-35"></div>
        <div className="relative grid h-full min-h-[240px] grid-cols-12 gap-3">
          <div className="col-span-12 rounded-xl border border-[#E8E4DD]/10 bg-[#1A1A1A]/82 p-4 lg:col-span-3">
            <div className="mb-5 h-3 w-20 rounded-full bg-accent"></div>
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((item) => (
                <div key={item} className="h-8 rounded-lg bg-[#E8E4DD]/8"></div>
              ))}
            </div>
          </div>
          <div className="col-span-12 rounded-xl border border-[#E8E4DD]/10 bg-[#1A1A1A]/72 p-4 lg:col-span-9">
            {variant === 'inbox' && (
              <div className="space-y-3">
                {['New', 'Quoted', 'Contract Sent', 'Follow Up'].map((status, index) => (
                  <div
                    key={status}
                    className="crm-row flex items-center justify-between rounded-lg bg-[#E8E4DD]/8 px-4 py-3"
                    style={{ animationDelay: `${index * 0.16}s` }}
                  >
                    <span className="h-3 w-28 rounded-full bg-[#E8E4DD]/22"></span>
                    <span className="rounded-full bg-accent/90 px-3 py-1 font-mono text-[10px] uppercase">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {variant === 'lead' && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-[#E8E4DD]/8 p-4">
                  <Route className="mb-6 text-accent" size={24} />
                  <div className="h-3 w-4/5 rounded-full bg-[#E8E4DD]/22"></div>
                  <div className="mt-3 h-3 w-2/3 rounded-full bg-[#E8E4DD]/14"></div>
                </div>
                <div className="rounded-lg bg-[#E8E4DD]/8 p-4">
                  <div className="mb-4 h-8 w-8 rounded-full bg-accent"></div>
                  <div className="space-y-2">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="h-3 rounded-full bg-[#E8E4DD]/16"></div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-[#E8E4DD]/8 p-4 md:col-span-2">
                  <div className="activity-line h-1 rounded-full bg-accent/80"></div>
                </div>
              </div>
            )}
            {variant === 'form' && (
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-12 rounded-lg border border-[#E8E4DD]/10 bg-[#E8E4DD]/8"></div>
                ))}
                <div className="col-span-2 h-12 rounded-full bg-accent"></div>
              </div>
            )}
            {variant === 'contract' && (
              <div className="flex h-full min-h-[180px] items-center justify-center">
                <div className="contract-flip w-full max-w-sm rounded-xl border border-[#E8E4DD]/10 bg-[#E8E4DD] p-5 text-text-dark shadow-2xl">
                  <FileSignature className="mb-8 text-accent" size={32} />
                  <div className="mb-3 h-3 w-4/5 rounded-full bg-text-dark/18"></div>
                  <div className="h-3 w-1/2 rounded-full bg-text-dark/12"></div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-accent">
                    <CheckCircle2 size={18} />
                    Signed
                  </div>
                </div>
              </div>
            )}
            {variant === 'moves' && (
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 21 }).map((_, index) => (
                  <div
                    key={index}
                    className={`calendar-cell aspect-square rounded-lg ${
                      index === 8 || index === 12 || index === 17 ? 'bg-accent' : 'bg-[#E8E4DD]/8'
                    }`}
                    style={{ animationDelay: `${index * 0.03}s` }}
                  ></div>
                ))}
              </div>
            )}
            {variant === 'activity' && (
              <div className="space-y-4">
                {timelineItems.slice(0, 5).map((item, index) => (
                  <div key={item} className="activity-pop grid grid-cols-[1rem_1fr] gap-3" style={{ animationDelay: `${index * 0.14}s` }}>
                    <span className="mt-1.5 h-3 w-3 rounded-full bg-accent"></span>
                    <div>
                      <div className="h-3 w-2/3 rounded-full bg-[#E8E4DD]/20"></div>
                      <p className="mt-2 text-xs text-[#E8E4DD]/52">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {variant === 'map' && (
              <div className="relative h-full min-h-[190px]">
                <div className="integration-node left-[8%] top-[18%]">Website</div>
                <div className="integration-node right-[10%] top-[12%]">Meta</div>
                <div className="integration-node left-[38%] top-[44%] bg-accent text-white">CRM</div>
                <div className="integration-node bottom-[12%] left-[10%]">Calendar</div>
                <div className="integration-node bottom-[14%] right-[8%]">Stripe</div>
                <span className="integration-path integration-path-a"></span>
                <span className="integration-path integration-path-b"></span>
                <span className="integration-path integration-path-c"></span>
              </div>
            )}
            {variant === 'dashboard' && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[Gauge, Users, CalendarDays, CreditCard].map((Icon, index) => (
                  <div key={index} className="rounded-lg bg-[#E8E4DD]/8 p-4">
                    <Icon className="mb-8 text-accent" size={22} />
                    <div className="h-3 w-3/4 rounded-full bg-[#E8E4DD]/22"></div>
                  </div>
                ))}
                <div className="col-span-2 h-24 rounded-lg bg-[#E8E4DD]/8 md:col-span-4">
                  <div className="crm-chart-bars flex h-full items-end gap-2 px-5 pb-4">
                    {[38, 62, 48, 76, 54, 84, 68].map((height, index) => (
                      <span
                        key={index}
                        className="w-full rounded-t bg-accent/80"
                        style={{ height: `${height}%`, animationDelay: `${index * 0.1}s` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <figcaption className="bg-background px-5 py-4 text-sm font-medium leading-relaxed text-text-dark/68">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function ComfortMovingCrmCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.crm-hero-content > *', {
        y: 42,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });

      gsap.from('.crm-reveal', {
        scrollTrigger: {
          trigger: '.crm-reveal-start',
          start: 'top 76%',
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 78%',
        },
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
      });

      gsap.from('.screenshot-frame', {
        scrollTrigger: {
          trigger: '.screenshot-gallery',
          start: 'top 78%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStageIndex((currentIndex) => (currentIndex + 1) % stages.length);
    }, 1700);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background font-sans text-text-dark selection:bg-accent selection:text-white"
    >
      <nav className="fixed left-1/2 top-6 z-50 flex w-[90%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-text-dark/20 bg-background/90 px-6 py-3 shadow-md backdrop-blur-xl transition-all duration-300">
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
        <div className="hidden items-center gap-8 text-sm font-medium text-text-dark md:flex">
          <Link to="/#services" className="hover-lift hover:text-accent transition-colors">
            Services
          </Link>
          <Link to="/work-index" className="hover-lift hover:text-accent transition-colors">
            Work Index
          </Link>
          <Link to="/#case-studies" className="hover-lift text-accent transition-colors">
            Case Studies
          </Link>
        </div>
        <button className="magnetic-btn group rounded-full bg-accent px-5 py-2 text-sm font-medium text-white">
          <span className="relative z-10 flex items-center gap-2">
            Contact <ArrowRight size={14} />
          </span>
          <span className="hover-bg bg-text-dark"></span>
        </button>
      </nav>

      <section className="relative isolate overflow-hidden border-b border-text-dark/10 px-6 pb-20 pt-40 md:px-12 lg:px-24">
        <div className="absolute inset-0">
          <img
            src="/images/Gallery/Comfort Moving CRM.png"
            alt="Comfort Moving CRM interface"
            className="h-full w-full object-cover object-top opacity-22 grayscale"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(230,59,46,0.18),transparent_30%),linear-gradient(180deg,rgba(245,243,238,0.72),rgba(245,243,238,0.98)_76%)]"></div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="crm-hero-content grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-text-dark/10 bg-background/92 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent shadow-sm backdrop-blur-sm">
                Case Study // Custom CRM App
              </span>
              <h1 className="mb-7 max-w-5xl font-serif text-5xl italic leading-[0.9] tracking-tight md:text-7xl lg:text-[6.75rem]">
                Comfort Moving CRM
              </h1>
              <p className="max-w-3xl text-xl font-medium leading-relaxed text-text-dark/80 md:text-2xl">
                Comfort Moving needed a CRM that matched the speed and messiness of a real moving
                business: quote requests arriving from the website, phone calls, Meta leads,
                follow-ups, contracts, deposits, final payments, calendar handoffs, and review
                reminders. Generic CRMs were too broad, too expensive, or too disconnected from how
                the team actually books and completes moves.
              </p>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-text-dark/70">
                I built a custom CRM that turns those scattered touchpoints into one focused
                operating system for the business. The app gives the team a clean command center for
                managing every lead from first inquiry to completed move.
              </p>
            </div>

            <div className="rounded-[2rem] border border-text-dark/10 bg-background/88 p-5 shadow-xl backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-text-dark/45">
                  Lead Journey
                </p>
                <Sparkles className="text-accent" size={19} />
              </div>
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div
                    key={stage}
                    className={`grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-xl border p-3 transition-all duration-500 ${
                      activeStageIndex === index
                        ? 'border-accent bg-accent text-white shadow-lg'
                        : 'border-text-dark/10 bg-primary text-text-dark'
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-sm font-bold text-text-dark">
                      {index + 1}
                    </span>
                    <span className="font-bold">{stage}</span>
                    <ArrowRight size={16} />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-medium leading-relaxed text-text-dark/62">
                A lead card flows from "New Inquiry" to "Quoted" to "Booked" to "Completed," with
                each stage lighting up as the surrounding dashboard metrics update.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="crm-reveal-start border-b border-text-dark/10 bg-primary px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="crm-reveal">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              The Problem
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Moving companies do not just need a contact database.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-text-dark/72">
              Before the CRM, those answers were spread across inboxes, spreadsheets, calendars,
              payment links, notes, and manual reminders. That created friction at the exact moments
              where speed and clarity matter most.
            </p>
          </div>

          <div className="crm-reveal grid grid-cols-1 gap-3 sm:grid-cols-2">
            {problemQuestions.map((question, index) => (
              <div
                key={question}
                className={`rounded-2xl border border-text-dark/10 p-5 ${
                  index === 0 ? 'bg-text-dark text-background sm:col-span-2' : 'bg-background'
                }`}
              >
                <Search className={index === 0 ? 'mb-5 text-accent' : 'mb-5 text-text-dark/42'} size={21} />
                <p className="font-bold leading-snug">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              The Solution
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              A Firebase-powered React application built around the company's actual sales and
              operations workflow.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-text-dark/76">
              It combines lead intake, pipeline management, booking, contract tracking, payment
              preparation, task management, activity history, and calendar visibility in one
              internal tool.
            </p>
            <p className="mt-5 text-lg font-medium leading-relaxed text-text-dark/72">
              Instead of forcing the team into a generic CRM model, the app uses moving-company
              language and moving-company actions: move dates, routes, crew size, truck fees,
              overnight holds, quote ranges, deposits, final payment requests, completed moves, and
              review reminders.
            </p>
          </div>

          <ScreenshotPlaceholder
            title="Dashboard"
            caption="CRM dashboard with revenue cards, lead trends, upcoming moves, and status charts."
          />
        </div>
      </section>

      <section className="border-y border-text-dark/10 bg-primary px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
                Core Workflow
              </p>
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                From intake to booked move, in one structure.
              </h2>
              <p className="text-lg font-medium leading-relaxed text-text-dark/76">
                Leads can enter the system through the public quote form, manual staff entry, Meta
                lead ingestion, or phone/walk-in sources. Each lead is normalized into the same CRM
                structure with customer details, route information, service type, move date, move
                size, referral source, quote details, status, notes, and activity history.
              </p>
              <p className="mt-5 text-lg font-medium leading-relaxed text-text-dark/72">
                Staff can move leads through statuses such as{' '}
                {statuses.map((status, index) => (
                  <span key={status}>
                    <code className="rounded bg-background px-1.5 py-0.5 text-sm">{status}</code>
                    {index < statuses.length - 1 ? ' ' : ''}
                  </span>
                ))}
                . Once a lead is booked, it becomes an upcoming move and can be tracked
                operationally through completion.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <ScreenshotPlaceholder
                title="Lead Inbox"
                caption="Lead inbox table with statuses, contact links, contract badges, referral sources, and move dates."
                variant="inbox"
              />
              <p className="rounded-2xl border border-text-dark/10 bg-background p-5 text-sm font-medium leading-relaxed text-text-dark/66">
                Inbox rows subtly sort into status lanes while badges pulse for high-priority states
                like "New," "Follow Up Needed," and "Contract Sent."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
                Key Features
              </p>
              <h2 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
                The operational pieces a moving company actually needs.
              </h2>
            </div>
            <div className="max-w-sm rounded-2xl bg-text-dark p-5 text-background">
              <p className="text-sm font-medium leading-relaxed text-background/72">
                The lead detail page opens with a split motion: customer context slides in from the
                left, operational details settle on the right, and the activity timeline builds
                upward like a living record.
              </p>
            </div>
          </div>

          <div className="feature-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="feature-card rounded-2xl border border-text-dark/10 bg-primary p-6 shadow-sm"
                >
                  <Icon className="mb-8 text-accent" size={24} />
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-text-dark/68">
                    {feature.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="screenshot-gallery bg-primary px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
                Product Screens
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Placeholder slots for the real app captures.
              </h2>
            </div>
            <p className="text-lg font-medium leading-relaxed text-text-dark/72">
              These are intentionally framed as screenshot placeholders so the marketing page can
              launch now, then swap in authenticated app screenshots when ready.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ScreenshotPlaceholder
              title="Public Quote Form"
              caption="Public quote form with move details, contact fields, referral source, and spam protection."
              variant="form"
            />
            <ScreenshotPlaceholder
              title="Lead Detail"
              caption="Full lead detail page showing customer info, route, quote fields, contract actions, payment actions, notes, and activity timeline."
              variant="lead"
            />
            <ScreenshotPlaceholder
              title="Contracts"
              caption="Contract status area with signed/pending state, resend controls, PDF link, and customer signing preview."
              variant="contract"
            />
            <ScreenshotPlaceholder
              title="Upcoming Moves"
              caption="Upcoming moves list with route details, move dates, and calendar sync indicators."
              variant="moves"
            />
            <ScreenshotPlaceholder
              title="Activity Log"
              caption="Activity log with filters, timestamped events, notes, booking updates, and payment/contract activity."
              variant="activity"
            />
            <ScreenshotPlaceholder
              title="Integration Map"
              caption="Integration map showing website, Meta, Firebase, Google Calendar, Stripe, contracts, and review reminders feeding the CRM."
              variant="map"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-text-dark/10 bg-background p-5 text-sm font-medium leading-relaxed text-text-dark/66">
            A contract card flips from "Sent" to "Signed," then drops a stamped PDF icon into the
            lead activity timeline. Thin animated paths carry small "lead," "contract," "payment,"
            and "review" tokens between the website, CRM, calendar, Stripe, and customer-facing
            pages.
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              Integrations
            </p>
            <h2 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl">
              The CRM connects the tools Comfort Moving already needs.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {integrations.map((integration) => {
              const Icon = integration.icon;

              return (
                <div
                  key={integration.label}
                  className="rounded-2xl border border-text-dark/10 bg-primary p-5"
                >
                  <Icon className="mb-7 text-accent" size={22} />
                  <p className="text-sm font-bold leading-snug">{integration.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-text-dark/10 bg-[#111111] px-6 py-24 text-[#E8E4DD] md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              Product Design Direction
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              A working tool, not a decorative dashboard.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-[#E8E4DD]/70">
              The interface is designed to feel like a working tool, not a decorative dashboard.
              The emphasis is on scanability, clear states, fast action, and low cognitive load.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {visualIdeas.map((idea, index) => (
              <div
                key={idea}
                className="rounded-2xl border border-[#E8E4DD]/10 bg-[#1A1A1A] p-5"
              >
                <p className="mb-4 font-mono text-xs text-accent">0{index + 1}</p>
                <p className="font-bold leading-snug">{idea}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              Impact
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              One practical workflow replaced scattered tools.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-text-dark/76">
              The CRM replaced scattered tools with one practical workflow. It helps Comfort Moving
              respond faster, preserve sales context, reduce missed follow-ups, track booked moves,
              keep contract and payment status visible, and close the loop with review requests
              after completed jobs.
            </p>
            <p className="mt-5 text-lg font-medium leading-relaxed text-text-dark/72">
              The app is intentionally lightweight. Firebase keeps authentication, hosting, data,
              and functions in one ecosystem, while React keeps the interface fast and maintainable.
              The result is a custom operating layer with the parts the business needs and none of
              the clutter it does not.
            </p>
          </div>

          <div className="rounded-[2rem] bg-primary p-6">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-text-dark/45">
              Activity Timeline
            </p>
            <div className="space-y-5">
              {timelineItems.map((item, index) => (
                <div key={item} className="grid grid-cols-[2rem_1fr] gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="border-b border-text-dark/10 pb-5">
                    <p className="font-bold">{item}</p>
                    <p className="mt-1 text-sm text-text-dark/58">
                      Context remains attached to the customer record.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              Suggested Screenshot Set
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              The capture list for the final polished version.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {screenshotSet.map((item, index) => (
              <div
                key={item.file}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-text-dark/10 bg-background p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-text-dark font-mono text-sm text-background">
                  {index + 1}
                </div>
                <div>
                  <p className="mb-1 font-mono text-xs text-accent">{item.file}</p>
                  <p className="font-medium leading-relaxed text-text-dark/72">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-text-dark p-8 text-background md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
                Future Enhancements
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Built as a foundation, not a one-off.
              </h2>
            </div>
            <div>
              <p className="text-lg font-medium leading-relaxed text-background/78">
                Future improvements could include deeper pipeline filtering, duplicate lead
                detection, automated follow-up sequences, richer quote templates, dispatch and crew
                assignment tools, mobile-first field workflows, calendar conflict warnings, payment
                reconciliation, lead source close-rate reporting, and a more polished customer portal
                for contracts and final payments.
              </p>
              <p className="mt-6 text-lg font-medium leading-relaxed text-background/78">
                Long term, the CRM can grow into a full operating system for Comfort Moving: lead
                capture, quoting, booking, dispatch, payment, review generation, and performance
                analytics in one controlled platform.
              </p>
              <Link
                to="/case-studies/comfort-moving-chicago"
                className="magnetic-btn group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-bold text-white sm:w-auto"
              >
                <span className="relative z-10">View the growth case study</span>
                <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" size={18} />
                <span className="hover-bg bg-background"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] px-6 py-12 text-[#E8E4DD] md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-sm font-medium md:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">Obskura</span>
            <span className="text-[#E8E4DD]/40">© {new Date().getFullYear()}</span>
          </div>
          <Link to="/work-index" className="transition-colors hover:text-accent">
            Back to work index
          </Link>
        </div>
      </footer>
    </div>
  );
}
