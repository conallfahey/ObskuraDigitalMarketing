import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Database, MapPinned, Megaphone, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const systemCards = [
  {
    title: 'Local Search Architecture',
    label: 'SEO',
    image: '/images/Gallery/Comfort Moving - Hero Web Design.png',
    description:
      'Service pages and neighborhood landing pages were rebuilt to align with how Chicago moving customers actually search.',
  },
  {
    title: 'Custom CRM Workflow',
    label: 'CRM',
    image: '/images/Gallery/Comfort Moving CRM.png',
    description:
      'A moving-company-specific backend organized quote requests, website inquiries, Meta leads, and client progress in one place.',
  },
  {
    title: 'Paid Social Creative',
    label: 'Media',
    image: '/images/ComfortMovingChicago.webp',
    description:
      'Photo and video assets were produced to build trust fast and give paid campaigns creative built for response, not vanity.',
  },
];

const executionTimeline = [
  {
    phase: 'Phase 1',
    title: 'Reframed the acquisition problem',
    body:
      'The engagement started with a clear objective: reduce reliance on aggregator platforms and build a direct-response engine the company actually owned.',
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
    title: 'Scaled paid social with usable data',
    body:
      'With creative assets and backend infrastructure in place, Meta campaigns could drive qualified inbound demand directly into the company pipeline with less lead leakage.',
  },
];

export default function ComfortMovingCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      className="bg-background min-h-screen font-sans selection:bg-accent selection:text-white"
    >
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-5xl rounded-full bg-background/90 backdrop-blur-xl border border-text-dark/20 shadow-md transition-all duration-300">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/images/ObskuraDots.png"
              alt="Obskura Logo"
              className="h-8 object-contain saturate-200"
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
            src="/images/Gallery/Comfort Moving - Hero Web Design.png"
            alt="Comfort Moving Chicago website design"
            className="h-full w-full object-cover object-top grayscale-[18%] contrast-105 opacity-18 blur-[1px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,59,46,0.16),transparent_42%),linear-gradient(180deg,rgba(245,243,238,0.62),rgba(245,243,238,0.98))]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="case-hero-content grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
            <div>
              <span className="font-mono text-sm tracking-widest text-accent uppercase mb-6 block">
                Case Study // Local Services
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic leading-[0.95] mb-6">
                Comfort Moving Chicago
              </h1>
              <p className="text-xl md:text-2xl font-medium text-text-dark/80 max-w-3xl leading-relaxed">
                Built a stronger local search presence, a custom lead-management system, and a
                paid social pipeline that delivered 8x ROAS in the first two months.
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
                    Reduce aggregator dependence
                  </span>
                </div>
                <div className="rounded-2xl bg-primary border border-text-dark/10 p-4">
                  <span className="font-mono text-xs text-text-dark/50 uppercase block mb-1">
                    Early Result
                  </span>
                  <span className="font-semibold leading-snug">8x ROAS in two months</span>
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

      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <aside className="md:col-span-4 flex flex-col gap-8 md:pr-8 md:border-r md:border-text-dark/10">
            <div>
              <h4 className="font-mono text-xs tracking-widest text-text-dark/50 uppercase mb-3">
                Client
              </h4>
              <p className="font-bold text-lg">Comfort Moving Chicago</p>
            </div>

            <div>
              <h4 className="font-mono text-xs tracking-widest text-text-dark/50 uppercase mb-3">
                Scope
              </h4>
              <ul className="space-y-2 font-medium text-text-dark/80">
                <li>Local SEO and landing page structure</li>
                <li>Website conversion path rebuild</li>
                <li>Custom CRM and lead workflow</li>
                <li>Meta ads and paid social creative</li>
              </ul>
            </div>

            <div className="p-6 bg-primary rounded-2xl border border-text-dark/10">
              <h4 className="font-mono text-xs tracking-widest text-accent uppercase mb-4">
                Outcome Highlights
              </h4>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex flex-col border-b border-text-dark/10 pb-3">
                  <span className="text-text-dark/60 mb-1">Paid Media Performance</span>
                  <span className="font-bold text-lg">8x ROAS</span>
                </li>
                <li className="flex flex-col border-b border-text-dark/10 pb-3">
                  <span className="text-text-dark/60 mb-1">Lead Management</span>
                  <span className="font-bold text-lg">Centralized workflow</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-text-dark/60 mb-1">Timeline</span>
                  <span className="font-bold text-lg">First major returns in 2 months</span>
                </li>
              </ul>
            </div>
          </aside>

          <div className="md:col-span-8 flex flex-col gap-14">
            <div>
              <h2 className="text-3xl font-bold mb-5 flex items-center gap-3">
                <span className="text-accent text-xl">01</span> The Problem
              </h2>
              <p className="text-lg text-text-dark/80 leading-relaxed mb-4">
                Comfort Moving needed more than a prettier website. The company had to create a
                dependable inbound system in one of Chicago&apos;s most competitive service
                categories, where weak local visibility and third-party lead dependence made
                growth harder to control.
              </p>
              <p className="text-lg text-text-dark/72 leading-relaxed">
                Low control over lead flow, inconsistent local search visibility, and too much
                reliance on aggregator platforms were limiting margin and long-term brand equity.
                The issue was not demand. The issue was infrastructure.
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

            <div className="timeline-container">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-accent text-xl">04</span> Execution Timeline
              </h2>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-text-dark/20 before:to-transparent">
                {executionTimeline.map((item, index) => (
                  <div
                    key={item.title}
                    className="relative timeline-item flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${
                        index === 0 ? 'border-accent' : 'border-text-dark/30 group-hover:border-accent'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-accent' : 'bg-transparent group-hover:bg-accent'
                        }`}
                      ></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-primary border border-text-dark/10 shadow-sm">
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
                <span className="text-accent text-xl">05</span> The Outcome
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
                    Meta ads produced 8x ROAS within the first two months.
                  </p>
                </div>
                <div className="rounded-3xl bg-primary border border-text-dark/10 p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-dark/45 mb-3">
                    Qualified Inbound Leads
                  </p>
                  <p className="text-lg text-text-dark/80 leading-relaxed">
                    A cleaner pipeline for capturing and organizing quote-ready prospects.
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
                This was not a one-channel campaign. It was a stronger local search presence, a
                custom lead-management system, and a paid social pipeline working together to make
                demand easier to capture, track, and convert.
              </p>
              <button className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-3 group w-full sm:w-auto">
                <span className="relative z-10">Book a strategy call</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
                <span className="hover-bg bg-background"></span>
              </button>
            </div>
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
