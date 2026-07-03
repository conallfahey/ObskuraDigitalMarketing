import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Database, MapPinned, Megaphone, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const systemCards = [
  {
    title: 'SEO Foundation',
    label: 'SEO',
    image: '/images/Gallery/Comfort Moving - Hero Web Design.png',
    description:
      'Service pages, neighborhood landing pages, and local search signals were structured around how Chicago moving customers actually search.',
  },
  {
    title: 'Custom CRM Workflow',
    label: 'CRM',
    image: '/images/Gallery/Comfort Moving CRM.png',
    description:
      'A moving-company-specific backend organized lead intake, payments, contracts, review follow-ups, and client progress in one place.',
  },
  {
    title: 'Ad Creative and Meta Ads',
    label: 'Meta',
    image: '/images/ComfortMovingChicago.webp',
    description:
      'Photo, video, and influencer-driven assets were created, tested, and managed inside Meta campaigns built to convert attention into booked moves.',
  },
];

const executionTimeline = [
  {
    phase: 'Phase 1',
    title: 'Reframed the acquisition problem',
    body:
      'The engagement started with a clear objective: move beyond inconsistent word-of-mouth referrals and flyers by building a direct-response engine the company could measure and control.',
  },
  {
    phase: 'Phase 2',
    title: 'Rebuilt the website around intent',
    body:
      'We reorganized service and location pages around local SEO structure, cleaner internal linking, and shorter conversion paths for quote-ready visitors.',
  },
  {
    phase: 'Phase 3',
    title: 'Connected demand to operations',
    body:
      'A custom CRM was built to capture website forms, quote requests, Meta ad responses, and client progress inside one workflow so follow-up stayed fast.',
  },
  {
    phase: 'Phase 4',
    title: 'Scaled Meta ads with usable data',
    body:
      'With ad creative, Meta ads management, and backend infrastructure in place, qualified inbound demand could flow directly into the company pipeline with less lead leakage.',
  },
];

export default function ComfortMovingCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.case-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });

      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      gsap.from('.system-card', {
        scrollTrigger: {
          trigger: '.system-grid',
          start: 'top 75%',
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateActiveTimelineItem = () => {
      const markers = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>('[data-timeline-marker]') ?? []
      );

      if (markers.length === 0) {
        return;
      }

      const activationLine = window.innerHeight * 0.48;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      markers.forEach((marker, index) => {
        const markerRect = marker.getBoundingClientRect();
        const markerCenter = markerRect.top + markerRect.height / 2;
        const distance = Math.abs(markerCenter - activationLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveTimelineIndex(closestIndex);
    };

    let animationFrame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveTimelineItem);
    };

    updateActiveTimelineItem();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    ScrollTrigger.addEventListener('refresh', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      ScrollTrigger.removeEventListener('refresh', scheduleUpdate);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-background min-h-screen font-sans selection:bg-accent selection:text-white"
    >
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-5xl rounded-full bg-background/90 backdrop-blur-xl border border-text-dark/20 shadow-md transition-all duration-300">
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
          <Link to="/#services" className="hover-lift hover:text-accent transition-colors">
            Services
          </Link>
          <Link to="/#case-studies" className="hover-lift text-accent transition-colors">
            Case Studies
          </Link>
          <Link to="/#process" className="hover-lift hover:text-accent transition-colors">
            Process
          </Link>
        </div>
        <button className="magnetic-btn bg-accent text-white px-5 py-2 rounded-full text-sm font-medium group">
          <span className="relative z-10 flex items-center gap-2">
            Contact <ArrowRight size={14} />
          </span>
          <span className="hover-bg bg-text-dark"></span>
        </button>
      </nav>

      <section className="relative isolate overflow-hidden pt-40 pb-20 px-6 md:px-12 lg:px-24 border-b border-text-dark/10">
        <div className="absolute inset-0">
          <img
            src="/images/ChicagoSkylineNorthside.png"
            alt="Chicago skyline from the north side"
            className="h-full w-full object-cover object-center grayscale-[10%] contrast-110 opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,59,46,0.12),transparent_44%),linear-gradient(180deg,rgba(245,243,238,0.28),rgba(245,243,238,0.84))]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="case-hero-content grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-text-dark/10 bg-background/92 px-4 py-2 font-mono text-xs tracking-widest text-accent uppercase shadow-sm backdrop-blur-sm">
                Case Study // Local Services
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic leading-[0.95] mb-6">
                Comfort Moving Chicago
              </h1>
              <p className="text-xl md:text-2xl font-medium text-text-dark/80 max-w-3xl leading-relaxed">
                Connected ad creative creation, Meta ads management, custom CRM infrastructure,
                and SEO into one growth system that delivered 16x ROAS in the first campaign.
              </p>
            </div>

            <div className="rounded-[2rem] border border-text-dark/10 bg-background/85 backdrop-blur-md p-6 md:p-8 shadow-xl">
              <p className="font-mono text-xs tracking-[0.24em] uppercase text-text-dark/45 mb-5">
                Engagement Snapshot
              </p>
              <p className="text-lg text-text-dark/75 leading-relaxed mb-6">
                We do not sell vague growth promises. We build local search systems,
                high-conversion websites, paid acquisition pipelines, and backend
                infrastructure that turn demand into booked jobs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary border border-text-dark/10 p-4">
                  <span className="font-mono text-xs text-text-dark/50 uppercase block mb-1">
                    Primary Goal
                  </span>
                  <span className="font-semibold leading-snug">
                    Build reliable acquisition
                  </span>
                </div>
                <div className="rounded-2xl bg-primary border border-text-dark/10 p-4">
                  <span className="font-mono text-xs text-text-dark/50 uppercase block mb-1">
                    Early Result
                  </span>
                  <span className="font-semibold leading-snug">16x ROAS in two months</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="overflow-hidden rounded-2xl border border-text-dark/10 bg-primary">
                  <img
                    src="/images/Gallery/Comfort Moving - Hero Web Design.png"
                    alt="Comfort Moving website hero design"
                    className="h-32 w-full object-cover object-top"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-text-dark/10 bg-primary">
                  <img
                    src="/images/Gallery/Comfort Moving CRM.png"
                    alt="Comfort Moving CRM dashboard"
                    className="h-32 w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-12 border-b border-text-dark/10">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-text-dark/10 bg-background p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.4fr_1fr] lg:divide-x lg:divide-text-dark/10">
              <div className="lg:pr-8">
                <p className="font-mono text-xs tracking-[0.24em] text-text-dark/45 uppercase mb-3">
                  Client
                </p>
                <p className="text-2xl font-bold tracking-tight">Comfort Moving Chicago</p>
                <p className="mt-2 text-text-dark/60">Local services growth system</p>
              </div>

              <div className="lg:px-8">
                <p className="font-mono text-xs tracking-[0.24em] text-text-dark/45 uppercase mb-4">
                  Scope
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
    'SEO',
    'Website conversion',
    'Ad creative',
    'Meta ads',
    'Influencer partnerships',
    'Custom CRM',
    'Automation',
  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-text-dark/10 bg-primary px-4 py-2 text-sm font-semibold text-text-dark/78"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:pl-8">
                <p className="font-mono text-xs tracking-[0.24em] text-accent uppercase mb-4">
                  Highlights
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dark/45">
                      Paid Media
                    </p>
                    <p className="text-2xl font-bold">16x ROAS</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dark/45">
                      Pipeline
                    </p>
                    <p className="text-lg font-bold">Centralized CRM</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dark/45">
                      Timeline
                    </p>
                    <p className="text-lg font-bold">2 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-14">
            <div>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-accent text-xl">01</span> The Problem
              </h2>
              <p className="text-lg text-text-dark/80 leading-relaxed mb-4">
                Comfort Moving needed more than a prettier website. The company had to create a
                dependable inbound system in one of Chicago&apos;s most competitive service
                categories, where weak local visibility and inconsistent offline acquisition made
                growth harder to forecast.
              </p>
              <p className="text-lg text-text-dark/72 leading-relaxed">
                Word-of-mouth referrals and flyers had value, but they were inconsistent and could
                not be relied on as the company scaled. The issue was not demand. The issue was
                building the infrastructure to attract, capture, follow up with, and convert that
                demand predictably.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-accent text-xl">02</span> Our Approach
              </h2>
              <p className="text-lg text-text-dark/80 leading-relaxed mb-6">
                Instead of chasing isolated tactics, we treated Comfort Moving like an operating
                system. The website, local search footprint, CRM, content production, and paid
                media all had to work as one connected growth engine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-text-dark/10 bg-background p-5">
                  <MapPinned className="text-accent mb-4" size={22} />
                  <p className="font-semibold mb-2">Local search capture</p>
                  <p className="text-text-dark/70">
                    Rebuilt service and neighborhood landing pages to match high-intent Chicago
                    moving searches.
                  </p>
                </div>
                <div className="rounded-2xl border border-text-dark/10 bg-background p-5">
                  <Database className="text-accent mb-4" size={22} />
                  <p className="font-semibold mb-2">Custom CRM infrastructure</p>
                  <p className="text-text-dark/70">
                    Built a backend tailored for a local moving company to track leads, quotes,
                    Meta responses, and client progress.
                  </p>
                </div>
                <div className="rounded-2xl border border-text-dark/10 bg-background p-5 sm:col-span-2">
                  <Megaphone className="text-accent mb-4" size={22} />
                  <p className="font-semibold mb-2">Creative plus paid acquisition</p>
                  <p className="text-text-dark/70">
                    Produced video and photo assets for paid social, launched Meta campaigns, and
                    unified website inquiries, quote requests, and ad responses into one follow-up
                    workflow.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-accent text-xl">03</span> System Buildout
              </h2>
              <p className="text-lg text-text-dark/72 leading-relaxed mb-8 max-w-3xl">
                The work centered on four connected services: SEO created durable local visibility,
                ad creative gave the brand trust-building assets, influencer partnerships helped
                multiply reach, Meta ads generated immediate demand, and the CRM made sure every
                inquiry had a place to go.
              </p>
              <div className="system-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
                {systemCards.map((card) => (
                  <article
                    key={card.title}
                    className="system-card overflow-hidden rounded-[1.75rem] border border-text-dark/10 bg-primary shadow-sm"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-text-dark/60 via-text-dark/10 to-transparent"></div>
                      <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-dark">
                        {card.label}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                      <p className="text-text-dark/72 leading-relaxed">{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-accent text-xl">04</span> CRM Built to Scale
              </h2>
              <p className="text-lg text-text-dark/80 leading-relaxed mb-6">
                Comfort Moving needed more than a place to store leads. The CRM was built as an
                operating layer for the business: flexible enough to support current workflows and
                structured enough to scale as lead volume, crews, and service areas expanded.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-text-dark/10 bg-primary p-5">
                  <p className="font-semibold mb-2">Lead and web form intake</p>
                  <p className="text-text-dark/70">
                    Website forms, quote requests, and Meta ad leads were routed into one
                    manageable pipeline for faster response.
                  </p>
                </div>
                <div className="rounded-2xl border border-text-dark/10 bg-primary p-5">
                  <p className="font-semibold mb-2">Automated review requests</p>
                  <p className="text-text-dark/70">
                    Post-job follow-ups helped turn completed moves into new trust signals for
                    search, ads, and future customers.
                  </p>
                </div>
                <div className="rounded-2xl border border-text-dark/10 bg-primary p-5">
                  <p className="font-semibold mb-2">Payments and contracts</p>
                  <p className="text-text-dark/70">
                    Payment processing and contract handling were brought into the workflow so
                    admin steps stayed connected to each customer record.
                  </p>
                </div>
                <div className="rounded-2xl border border-text-dark/10 bg-primary p-5">
                  <p className="font-semibold mb-2">Visualized analytics</p>
                  <p className="text-text-dark/70">
                    Pipeline data, lead sources, and performance insights were made easier to read
                    so the team could see what was driving booked jobs.
                  </p>
                </div>
              </div>
            </div>

            <div className="timeline-container">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-accent text-xl">05</span> Execution Timeline
              </h2>

              <div className="relative space-y-8 before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-text-dark/20 before:to-transparent md:before:left-1/2">
                {executionTimeline.map((item, index) => (
                  <div
                    key={item.title}
                    className="timeline-item relative grid grid-cols-[2rem_1fr] gap-6 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-8"
                  >
                    <div
                      data-timeline-marker
                      className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background shadow transition-colors duration-300 md:col-start-2 md:row-start-1 ${
                        activeTimelineIndex === index ? 'border-accent' : 'border-text-dark/30'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                          activeTimelineIndex === index ? 'bg-accent' : 'bg-transparent'
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`rounded-2xl border border-text-dark/10 bg-primary p-6 shadow-sm md:row-start-1 ${
                        index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-3'
                      }`}
                    >
                      <span className="font-mono text-xs text-text-dark/50 mb-2 block">
                        {item.phase}
                      </span>
                      <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                      <p className="text-text-dark/70 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-accent text-xl">06</span> The Outcome
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-text-dark text-background p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-background/45 mb-3">
                    Local Search Foundation
                  </p>
                  <p className="text-lg text-background/85 leading-relaxed">
                    A stronger organic footprint across Chicago service and neighborhood intent.
                  </p>
                </div>
                <div className="rounded-3xl bg-primary border border-text-dark/10 p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-dark/45 mb-3">
                    Paid Media Performance
                  </p>
                  <p className="text-lg text-text-dark/80 leading-relaxed">
                    Meta ads produced 16x ROAS within the first two months.
                  </p>
                </div>
                <div className="rounded-3xl bg-primary border border-text-dark/10 p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-dark/45 mb-3">
                    Expanded Reach
                  </p>
                  <p className="text-lg text-text-dark/80 leading-relaxed">
                    Influencer partnerships helped multiply creative reach and gave paid campaigns
                    more trust-building content to amplify.
                  </p>
                </div>
                <div className="rounded-3xl bg-primary border border-text-dark/10 p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-dark/45 mb-3">
                    Conversion Infrastructure
                  </p>
                  <p className="text-lg text-text-dark/80 leading-relaxed">
                    Faster follow-up and a smoother path from inquiry to booked move through one
                    centralized backend workflow.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-text-dark text-background rounded-3xl mt-2">
              <h2 className="text-2xl font-bold mb-4">System Synthesis</h2>
              <p className="text-lg text-background/80 leading-relaxed mb-8">
                This was not a one-channel campaign. Ad creative creation, Meta ads management,
                influencer partnerships, custom CRM infrastructure, and SEO worked together to make
                demand easier to generate, capture, track, and convert.
              </p>
              <button className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-3 group w-full sm:w-auto">
                <span className="relative z-10">Book a strategy call</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
                <span className="hover-bg bg-background"></span>
              </button>
            </div>
          </div>
      </section>

      <footer className="bg-[#111111] text-[#E8E4DD] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">Obskura</span>
            <span className="text-[#E8E4DD]/40">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded border border-[#E8E4DD]/20 bg-[#1A1A1A]">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
            <span className="font-mono text-[10px] tracking-tight text-[#E8E4DD]/70 uppercase">
              System Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
