import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const heroWords = ['Marketing', 'Content', 'Code', 'Design', 'Systems'];
const protocolBarHeights = [42, 68, 55, 84, 46, 76, 61, 92, 58, 71, 49, 88];
const partnerLogos = [
  {
    name: 'Collectiv',
    src: '/images/Partners/collectiv_black_transparent.png',
  },
  {
    name: 'Hello Destination Management',
    src: '/images/Partners/hello_destination_management_black_transparent.png',
  },
  {
    name: 'Loyola University Chicago',
    src: '/images/Partners/loyola_university_chicago_black_transparent.png',
  },
  {
    name: 'Mamitas',
    src: '/images/Partners/mamitas_black_transparent.png',
  },
  {
    name: 'Maritz',
    src: '/images/Partners/maritz_black_transparent.png',
  },
  {
    name: 'NC',
    src: '/images/Partners/nc_logo_black_transparent.png',
  },
];
const videoSchedule = [
  { day: 'S', task: 'Planning' },
  { day: 'M', task: 'Scripting' },
  { day: 'T', task: 'Shooting' },
  { day: 'W', task: 'Editing' },
  { day: 'T', task: 'Reviewing' },
  { day: 'F', task: 'Posting' },
  { day: 'S', task: 'Analyzing' },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });

      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: '.main-nav' },
      });

      gsap.from('.manifesto-line', {
        scrollTrigger: {
          trigger: '.manifesto-content',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');
      const processSection = containerRef.current?.querySelector('#process');

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];

          gsap.to(card, {
            y: -18,
            scale: 0.94,
            opacity: 0.55,
            filter: 'blur(4px)',
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 72%',
              end: 'top 28%',
              scrub: 0.8,
            },
          });
        } else if (processSection) {
          gsap.to(card, {
            y: -18,
            scale: 0.94,
            opacity: 0.55,
            filter: 'blur(4px)',
            ease: 'none',
            scrollTrigger: {
              trigger: processSection,
              start: 'bottom 55%',
              end: 'bottom 18%',
              scrub: 0.8,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveWordIndex((currentIndex) => (currentIndex + 1) % heroWords.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!rotatingWordRef.current) {
      return;
    }

    const word = rotatingWordRef.current;
    const glow = word.parentElement?.querySelector('.hero-word-glow');
    const timeline = gsap.timeline();

    timeline.fromTo(
      word,
      {
        y: 80,
        rotateX: -75,
        scale: 0.82,
        opacity: 0,
        filter: 'blur(16px)',
      },
      {
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power4.out',
      }
    );

    if (glow) {
      timeline.fromTo(
        glow,
        {
          scaleX: 0.25,
          opacity: 0.2,
        },
        {
          scaleX: 1,
          opacity: 0.9,
          duration: 0.75,
          ease: 'power3.out',
        },
        0
      );
    }

    return () => {
      timeline.kill();
    };
  }, [activeWordIndex]);

  return (
    <div
      ref={containerRef}
      className="bg-background min-h-screen font-sans selection:bg-accent selection:text-white"
    >
      <nav className="main-nav fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-5xl rounded-full bg-background/60 backdrop-blur-xl border border-text-dark/10 transition-all duration-300">
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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="hover-lift hover:text-accent transition-colors">
            Services
          </a>
          <Link to="/work-index" className="hover-lift hover:text-accent transition-colors">
            Work Index
          </Link>
          <a href="#case-studies" className="hover-lift hover:text-accent transition-colors">
            Case Studies
          </a>
          <a href="#process" className="hover-lift hover:text-accent transition-colors">
            Process
          </a>
        </div>
        <button className="magnetic-btn bg-text-dark text-background px-5 py-2 rounded-full text-sm font-medium group">
          <span className="relative z-10 flex items-center gap-2">
            Contact <span className="text-accent group-hover:text-background transition-colors">↗</span>
          </span>
          <span className="hover-bg bg-accent"></span>
        </button>
      </nav>

      <section className="relative min-h-[100dvh] w-full overflow-hidden flex items-center px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 z-0">
          <img
            src="images/Obskura-Chicago-Marketing-Content.avif"
            alt="Chicago Digital Marketing Content"
            className="w-full h-full object-cover grayscale-[30%] contrast-125 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="hero-content max-w-4xl mx-auto text-center flex flex-col items-center pt-24 md:pt-28">
            <h1 className="text-5xl md:text-7xl lg:text-[5.6rem] leading-[0.92] tracking-tight mb-6 text-balance">
              <span className="block font-bold mb-4">Bridging the gap between</span>
              <span className="hero-word-shell">
                <span className="hero-word-glow" aria-hidden="true"></span>
                <span
                  key={heroWords[activeWordIndex]}
                  ref={rotatingWordRef}
                  className="hero-kinetic-word"
                >
                  {heroWords[activeWordIndex]}
                </span>
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-text-dark/80 font-medium mb-10 leading-relaxed text-balance">
              Obskura is a Chicago digital marketing agency that turns attention into measurable growth. We engineer visibility through technical precision.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-3 group">
                <span className="relative z-10">Book a strategy call</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                <span className="hover-bg bg-text-dark"></span>
              </button>
              <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-text-dark/20 backdrop-blur-sm bg-background/50">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="font-mono text-sm tracking-tight text-text-dark/70 uppercase">
                  Chicago Based
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="partners"
        aria-labelledby="partner-logos-heading"
        className="bg-background px-6 md:px-12 lg:px-24 pt-28 pb-14 md:pt-24 md:pb-16 border-y border-text-dark/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="lg:w-64 shrink-0">
              <h2
                id="partner-logos-heading"
                className="font-mono text-xs uppercase tracking-[0.22em] text-text-dark/45"
              >
                Partners and clients
              </h2>
              <p className="mt-3 text-xl md:text-2xl font-bold tracking-tight max-w-md lg:max-w-none">
                Trusted by teams building memorable moments.
              </p>
            </div>

            <div className="partner-logo-shell flex-1 min-w-0">
              <div className="partner-logo-track" aria-hidden="true">
                {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                  <div className="partner-logo-item" key={`${partner.name}-${index}`}>
                    <img src={partner.src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
              <ul className="sr-only">
                {partnerLogos.map((partner) => (
                  <li key={partner.name}>{partner.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4 flex items-center gap-4">
              <span className="text-accent">01 //</span> Services
            </h2>
            <p className="font-mono text-text-dark/60 max-w-xl">
              Everything you need to look sharp, get noticed, and turn attention into real business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-[#1A1A1A] text-[#F5F3EE] p-8 rounded-2xl border border-[#F5F3EE]/10 shadow-sm transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="text-2xl font-bold font-sans">Video Marketing</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span className="font-mono text-xs text-[#F5F3EE]/50 uppercase tracking-widest relative">
                    Live Feed
                  </span>
                </div>
              </div>
              <div className="flex-1 mt-8 flex flex-col items-center justify-center relative">
                <div className="grid grid-cols-7 gap-2 w-full max-w-[280px] mb-10">
                  {videoSchedule.map((item, i) => (
                    <div key={`${item.day}-${i}`} className="relative flex flex-col items-center">
                      <div
                        className={`video-day-chip h-8 w-full rounded-md flex items-center justify-center font-mono text-xs border ${
                          i === 3
                            ? 'bg-accent text-white border-accent'
                            : 'border-[#F5F3EE]/15 bg-[#111111] text-[#F5F3EE]/55'
                        }`}
                        style={{ animationDelay: `${i * 1.2}s` }}
                      >
                        {item.day}
                      </div>
                      <div
                        className="video-task-popup absolute top-11 px-3 py-1.5 rounded-full border border-[#F5F3EE]/10 bg-[#F5F3EE] text-[#111111] text-[10px] font-mono uppercase tracking-wide whitespace-nowrap shadow-lg"
                        style={{ animationDelay: `${i * 1.2}s` }}
                      >
                        {item.task}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 px-6 py-2 bg-[#F5F3EE] text-[#111111] font-mono text-xs rounded uppercase tracking-wider">
                  Weekly content rhythm
                </div>
              </div>
              <p className="text-[#F5F3EE]/60 mt-6 font-medium">
                We plan, film, edit, and publish content that keeps your brand active and relevant.
              </p>
            </div>

            <div className="group relative bg-primary p-8 rounded-2xl border border-text-dark/10 shadow-sm transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="text-2xl font-bold font-sans">Web Development</h3>
                <span className="font-mono text-xs px-3 py-1 bg-background rounded-full border border-text-dark/10">
                  Systems
                </span>
              </div>
              <div className="flex-1 mt-8 font-mono text-sm leading-relaxed text-text-dark/80 relative flex flex-col justify-end">
                <div className="space-y-2 opacity-60 text-xs mb-4">
                  <p>&gt; Homepage refresh in progress</p>
                  <p>&gt; Contact path being simplified</p>
                  <p>&gt; Mobile experience under review</p>
                </div>
                <p className="text-accent">
                  &gt; Publishing site improvements
                  <span className="animate-pulse inline-block w-2.5 h-4 bg-accent align-middle ml-1"></span>
                </p>
                <div className="absolute right-8 top-8 pointer-events-none animate-[cursorMove_4s_infinite]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-text-dark z-50 drop-shadow-md"
                  >
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    <path d="M13 13l6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-text-dark/70 mt-6 font-medium">
                We build websites that make your business easier to trust, understand, and contact.
              </p>
            </div>

            <div className="group relative bg-primary p-8 rounded-2xl border border-text-dark/10 shadow-sm hover:shadow-md transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 seo-signal-grid opacity-60"></div>
              <div className="absolute inset-x-0 top-0 h-24 seo-signal-glow"></div>
              <div className="flex justify-between items-start mb-auto relative z-10">
                <h3 className="text-2xl font-bold font-sans">SEO</h3>
                <span className="font-mono text-xs px-3 py-1 bg-background rounded-full border border-text-dark/10">
                  Signal Map
                </span>
              </div>
              <div className="relative h-[210px] w-full mt-5 mb-1 flex items-center justify-center overflow-hidden">
                <div className="seo-rings">
                  <span className="seo-ring seo-ring-outer"></span>
                  <span className="seo-ring seo-ring-mid"></span>
                  <span className="seo-ring seo-ring-inner"></span>
                </div>
                <div className="seo-scan-line"></div>
                <div className="seo-node seo-node-core">
                  <span className="seo-node-label">You</span>
                </div>
                <div className="seo-node seo-node-top">
                  <span className="seo-node-label">Search</span>
                </div>
                <div className="seo-node seo-node-left">
                  <span className="seo-node-label">Maps</span>
                </div>
                <div className="seo-node seo-node-right">
                  <span className="seo-node-label">Reviews</span>
                </div>
                <div className="seo-node seo-node-bottom">
                  <span className="seo-node-label">Content</span>
                </div>
                <span className="seo-link seo-link-top"></span>
                <span className="seo-link seo-link-left"></span>
                <span className="seo-link seo-link-right"></span>
                <span className="seo-link seo-link-bottom"></span>
              </div>
              <p className="text-text-dark/70 relative z-10 mt-6 font-medium">
                We help the right customers find you when they are already looking for what you offer.
              </p>
            </div>

            <div className="group relative bg-[#111111] text-[#E8E4DD] p-8 rounded-2xl border border-[#E8E4DD]/10 shadow-sm transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="text-2xl font-bold font-sans">AI Automation</h3>
                <span className="font-mono text-xs px-3 py-1 bg-[#1A1A1A] text-accent rounded-full border border-accent/30">
                  Active
                </span>
              </div>
              <div className="flex-1 mt-6 flex flex-col justify-center gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A] border border-[#E8E4DD]/10">
                  <span className="font-mono text-xs text-[#E8E4DD]/80">Lead Follow-Up</span>
                  <div className="w-8 h-4 rounded-full bg-accent relative">
                    <div className="w-3 h-3 rounded-full bg-[#111111] absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A] border border-[#E8E4DD]/5">
                  <span className="font-mono text-xs text-[#E8E4DD]/40">Review Requests</span>
                  <div className="w-8 h-4 rounded-full bg-[#111111] border border-[#E8E4DD]/20 relative">
                    <div className="w-3 h-3 rounded-full bg-[#E8E4DD]/40 absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded bg-black/50 border border-[#E8E4DD]/5 font-mono text-[10px] text-accent/80">
                  &gt; New inquiry received. Next step sent.
                </div>
              </div>
              <p className="text-[#E8E4DD]/60 mt-6 font-medium">
                We automate the repetitive follow-up work so leads do not slip through the cracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-32 px-6 md:px-12 lg:px-24 bg-primary border-t border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4 flex items-center gap-4">
              <span className="text-accent">02 //</span> Proof With Teeth
            </h2>
            <p className="font-mono text-text-dark/60 max-w-xl">
              We do not deal in hypotheticals. We build architectural assets that command real market share.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl group">
              <img
                src="images/ComfortMovingChicago.webp"
                alt="Comfort Moving Chicago Case Study"
                className="w-full h-full object-cover scale-150 grayscale transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-text-dark/40 group-hover:bg-text-dark/20 transition-colors duration-500"></div>
              <div className="absolute top-6 right-6 font-mono text-xs px-4 py-2 bg-background text-text-dark rounded-full shadow-lg">
                Featured Engagement
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-4xl font-serif italic mb-2">Comfort Moving Chicago</h3>
              <p className="text-xl font-medium text-text-dark/70 border-b border-text-dark/10 pb-6 mb-8">
                Built a stronger local search presence, a custom lead-management system, and a
                paid social pipeline that delivered 8x ROAS in the first two months.
              </p>

              <div className="mb-6">
                <h4 className="font-mono text-sm tracking-widest text-text-dark/50 uppercase mb-3">
                  The Problem
                </h4>
                <p className="font-medium">
                  Low control over lead flow, inconsistent local search visibility, and too much
                  reliance on aggregator platforms that cut into margin and limit long-term brand
                  growth.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-mono text-sm tracking-widest text-text-dark/50 uppercase mb-3">
                  Our Approach
                </h4>
                <ul className="space-y-2 font-medium">
                  <li className="flex gap-3">
                    <span className="text-accent">&rarr;</span> Rebuilt the website around local SEO,
                    service-page intent, and cleaner conversion paths.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">&rarr;</span> Structured neighborhood and service
                    landing pages to capture high-intent Chicago moving searches.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">&rarr;</span> Built a custom CRM and unified website,
                    quote, and Meta ad leads into one pipeline.
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-background rounded-2xl border border-text-dark/10 mb-8">
                <h4 className="font-mono text-sm tracking-widest text-accent uppercase mb-4">
                  The Outcome
                </h4>
                <ul className="space-y-4 font-mono text-sm">
                  <li className="flex justify-between items-center border-b border-text-dark/10 pb-2">
                    <span className="text-text-dark/60">Paid Media Performance</span>
                    <span className="font-bold">8x ROAS</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-text-dark/10 pb-2">
                    <span className="text-text-dark/60">Lead Management</span>
                    <span className="font-bold">Centralized workflow</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-dark/60">Timeline</span>
                    <span className="font-bold">First returns in 2 months</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/case-studies/comfort-moving-chicago"
                className="magnetic-btn bg-text-dark text-background px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-3 group w-fit"
              >
                <span className="relative z-10">See the full case study</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform">&rarr;</span>
                <span className="hover-bg bg-accent"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="relative bg-background py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight flex items-center justify-center gap-4 mb-4">
            <span className="text-accent">03 //</span> How We Work
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-dark/65 font-medium leading-relaxed">
            Full-service creative marketing without the jargon. We help you get clear on the message, create the assets, and keep growth moving.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto min-h-[148vh] protocol-container px-6 md:px-12 lg:px-24">
          <div className="protocol-card sticky top-24 w-full min-h-[32rem] bg-primary rounded-[2rem] border border-text-dark/10 shadow-lg p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center mb-20 overflow-hidden z-10 transition-transform origin-top will-change-transform">
            <div className="flex-1 z-10 max-w-xl">
              <span className="font-mono text-xl text-text-dark/40 block mb-4">001</span>
              <h3 className="text-3xl font-bold font-sans mb-4">Clarify the brand and the offer</h3>
              <p className="text-text-dark/70 font-medium max-w-lg leading-relaxed">
                We start by understanding your business, your customers, and what actually makes you different so your marketing feels focused instead of scattered.
              </p>
            </div>
            <div className="w-full min-h-[240px] md:min-h-[300px] bg-background/50 rounded-xl border border-text-dark/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-32 h-32 border border-text-dark/20 rotate-45 animate-[spin_15s_linear_infinite]"></div>
              <div className="absolute w-24 h-24 border border-text-dark/30 animate-[spin_20s_linear_infinite_reverse]"></div>
              <div className="w-4 h-4 rounded-full bg-accent animate-pulse"></div>
            </div>
          </div>

          <div className="protocol-card sticky top-24 w-full min-h-[32rem] bg-background rounded-[2rem] border border-text-dark/10 shadow-lg p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center mb-20 overflow-hidden z-20 transition-transform origin-top will-change-transform">
            <div className="flex-1 z-10 max-w-xl">
              <span className="font-mono text-xl text-text-dark/40 block mb-4">002</span>
              <h3 className="text-3xl font-bold font-sans mb-4">Create the assets that move people</h3>
              <p className="text-text-dark/70 font-medium max-w-lg leading-relaxed">
                From strategy and messaging to video, websites, content, and campaigns, we build the pieces your business needs to look credible and convert attention into action.
              </p>
            </div>
            <div className="w-full min-h-[240px] md:min-h-[300px] bg-[#1A1A1A] rounded-xl border border-[#1A1A1A]/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_10px_2px_rgba(230,59,46,0.5)] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
            </div>
          </div>

          <div className="protocol-card sticky top-24 w-full min-h-[32rem] bg-[#111111] text-[#E8E4DD] rounded-[2rem] border border-[#E8E4DD]/10 shadow-lg p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center z-30 transition-transform origin-top will-change-transform">
            <div className="flex-1 z-10 max-w-xl">
              <span className="font-mono text-xl text-[#E8E4DD]/40 block mb-4">003</span>
              <h3 className="text-3xl font-bold font-sans mb-4">Manage, improve, and keep momentum</h3>
              <p className="text-[#E8E4DD]/70 font-medium max-w-lg leading-relaxed">
                Once things are live, we keep refining what works, improving what does not, and helping you stay visible without needing to become a marketing expert yourself.
              </p>
            </div>
            <div className="w-full min-h-[240px] md:min-h-[300px] bg-black/40 rounded-xl border border-[#E8E4DD]/10 flex items-center justify-center relative overflow-hidden">
              <div className="flex items-center gap-1 h-20 w-32">
                {protocolBarHeights.map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-accent/80 rounded-full"
                    style={{
                      height: `${height}%`,
                      animation: `pulseWave 1.${i % 3 + 1}s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] text-[#E8E4DD] rounded-t-[4rem] pt-24 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Obskura</h2>
            <p className="text-[#E8E4DD]/60 font-medium text-lg leading-relaxed mb-8">
              Turning attention into measurable growth through technical SEO, video, and web engineering.
            </p>
            <div className="flex items-center gap-3 px-5 py-3 rounded border border-[#E8E4DD]/20 bg-[#1A1A1A]/50 w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
              <span className="font-mono text-xs tracking-tight text-[#E8E4DD]/70 uppercase">
                System Operational
              </span>
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-mono text-sm text-[#E8E4DD]/40 mb-6 uppercase tracking-wider">
                Navigation
              </h4>
              <div className="flex flex-col gap-4 font-medium text-[#E8E4DD]/80">
                <a href="#services" className="hover:text-accent transition-colors">
                  Services
                </a>
                <a href="#case-studies" className="hover:text-accent transition-colors">
                  Case Studies
                </a>
                <Link to="/work-index" className="hover:text-accent transition-colors">
                  Work Index
                </Link>
                <a href="#process" className="hover:text-accent transition-colors">
                  Process
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-mono text-sm text-[#E8E4DD]/40 mb-6 uppercase tracking-wider">
                Locations
              </h4>
              <div className="flex flex-col gap-4 font-medium text-[#E8E4DD]/80">
                <span className="cursor-default">Chicago (HQ)</span>
                <span className="cursor-default text-[#E8E4DD]/40">Remote Options</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#E8E4DD]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#E8E4DD]/40 font-medium">
          <p>© {new Date().getFullYear()} Obskura Digital Marketing. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E8E4DD] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#E8E4DD] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

