import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroWords = ['Marketing', 'Content', 'Websites', 'Systems'];
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

const caseStudyProofCards = [
  {
    metric: '16x',
    label: 'ROAS',
    detail: 'Meta ads performance in the first two months.',
  },
  {
    metric: 'CRM',
    label: 'Built Custom',
    detail: 'Website, quote, and Meta leads unified into one pipeline.',
  },
  {
    metric: 'SEO',
    label: 'Local Search',
    detail: 'Service and neighborhood pages structured for Chicago moving intent.',
  },
  {
    metric: 'One',
    label: 'Growth System',
    detail: 'Creative, paid media, SEO, and follow-up connected together.',
  },
];

const contactEmail = 'conall@obskuraagency.com';
const investmentPackages = [
  {
    name: 'Foundation',
    format: 'Project investment',
    description: 'A clear website, service pages, and quote forms that help customers get in touch.',
  },
  {
    name: 'Local Growth',
    format: 'Monthly investment',
    description: 'Local SEO, Google Business Profile support, and ongoing website improvements.',
  },
  {
    name: 'Connected Marketing',
    format: 'Monthly investment + setup',
    description: 'Local Growth, plus paid ads, video content, and CRM follow-up working together.',
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [selectedInvestment, setSelectedInvestment] = useState('');
  const contactRedirectUrl = `${window.location.origin}/thank-you`;

  useEffect(() => {
    if (window.location.hash === '#contact') {
      window.setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
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

      <section className="relative min-h-[100dvh] w-full overflow-hidden flex items-center px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 z-0">
          <img
            src="images/Obskura-Chicago-Marketing-Content.avif"
            alt="Chicago Digital Marketing Content"
            className="home-hero-photo w-full h-full object-cover grayscale-[30%] contrast-125 opacity-90"
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
            <p className="max-w-2xl text-lg md:text-xl text-text-dark/80 font-medium mb-4 leading-relaxed text-balance">
              Marketing for home-service businesses. We connect content, ads, websites, and follow-up to help turn local interest into booked jobs.
            </p>
            <img
              src="/images/obskura-hero-mark.svg"
              alt=""
              width="64"
              height="64"
              className="mb-5 size-14 opacity-90 md:size-16"
            />
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="magnetic-btn bg-accent text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-3 group">
                <span className="relative z-10">Book a strategy call</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                <span className="hover-bg bg-text-dark"></span>
              </a>
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
                Creative work. Real business relationships.
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
          <div className="mt-10 border-t border-text-dark/10 pt-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-text-dark/60">
              Across our social content
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-6">
              {[
                ['Views', '20M+'],
                ['Likes', '2M+'],
                ['Shares', '500K+'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col-reverse gap-1">
                  <dt className="font-mono text-xs uppercase tracking-wide text-text-dark/65">{label}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-accent sm:text-4xl">{value}</dd>
                </div>
              ))}
            </dl>
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
              Built for movers, cleaners, contractors, and other home-service teams: get found, earn trust, and make it easier to book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-[#1A1A1A] text-[#F5F3EE] p-8 rounded-2xl border border-[#F5F3EE]/10 shadow-sm transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="text-2xl font-bold font-sans">Content & Paid Ads</h3>
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
                Show your team and your work through video and paid campaigns that help local customers choose your business.
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
                Clear service pages, local proof, and simple quote forms that make it easier for customers to request a job.
              </p>
            </div>

            <div className="group relative bg-primary p-8 rounded-2xl border border-text-dark/10 shadow-sm hover:shadow-md transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 seo-signal-grid opacity-60"></div>
              <div className="absolute inset-x-0 top-0 h-24 seo-signal-glow"></div>
              <div className="flex justify-between items-start mb-auto relative z-10">
                <h3 className="text-2xl font-bold font-sans">Local SEO</h3>
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
                Help nearby customers find your services through local search, service-area pages, and a stronger Google Business Profile.
              </p>
            </div>

            <div className="group relative bg-[#111111] text-[#E8E4DD] p-8 rounded-2xl border border-[#E8E4DD]/10 shadow-sm transition-all overflow-hidden h-[400px] flex flex-col hover:-translate-y-1">
              <div className="flex justify-between items-start mb-auto">
                <h3 className="text-2xl font-bold font-sans">Automation and CRM</h3>
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
                Keep inquiries, quotes, and follow-up in one place so your team can respond quickly and keep jobs moving.
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
              See how we connected content, ads, local search, and follow-up for a Chicago moving company.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 border-y border-text-dark/20 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudyProofCards.map((card, index) => (
              <div
                key={card.label}
                className={`py-5 ${index > 0 ? 'border-t border-text-dark/15' : ''} ${index % 2 === 1 ? 'sm:border-l sm:pl-6' : 'sm:pr-6'} ${index < 2 ? 'sm:border-t-0' : ''} ${index > 0 ? 'lg:border-l lg:border-t-0 lg:pl-6' : ''} lg:pr-6`}
              >
                <p className={`mb-2 leading-none tracking-tight ${index === 0 ? 'font-serif text-4xl italic text-accent md:text-5xl' : 'pt-1 font-sans text-3xl font-semibold text-text-dark md:pt-2 md:text-4xl'}`}>
                  {card.metric}
                </p>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-dark/55">
                  {card.label}
                </p>
                <p className="max-w-[15rem] text-xs leading-relaxed text-text-dark/65">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                Connected ad creative creation, Meta ads management, custom CRM infrastructure,
                and SEO into one growth system that delivered 16x ROAS in the first two months.
              </p>

              <div className="mb-6">
                <h4 className="font-mono text-sm tracking-widest text-text-dark/50 uppercase mb-3">
                  The Problem
                </h4>
                <p className="font-medium">
                  Word-of-mouth referrals and flyers created some momentum, but they were
                  inconsistent and difficult to rely on while local search visibility and lead
                  follow-up needed a stronger system.
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
                  <li className="flex gap-3">
                    <span className="text-accent">&rarr;</span> Created ad assets, managed Meta
                    campaigns, and used CRM data to tighten follow-up.
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
                    <span className="font-bold">16x ROAS</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-text-dark/10 pb-2">
                    <span className="text-text-dark/60">Lead Management</span>
                    <span className="font-bold">Centralized workflow</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-text-dark/60">Timeline</span>
                    <span className="font-bold">Ongoing</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/case-studies/comfort-moving-chicago"
                  className="magnetic-btn bg-text-dark text-background px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-3 group w-fit"
                >
                  <span className="relative z-10">See the full case study</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  <span className="hover-bg bg-accent"></span>
                </Link>
                <Link
                  to="/case-studies/comfort-moving-crm"
                  className="magnetic-btn bg-background text-text-dark border border-text-dark/10 px-8 py-4 rounded-full font-bold inline-flex justify-center items-center gap-3 group w-fit"
                >
                  <span className="relative z-10">View the CRM app</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  <span className="hover-bg bg-primary"></span>
                </Link>
              </div>
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
            A practical marketing plan for your services, your area, and the customers you want to reach.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto min-h-[148vh] protocol-container px-6 md:px-12 lg:px-24">
          <div className="protocol-card sticky top-24 w-full min-h-[32rem] bg-primary rounded-[2rem] border border-text-dark/10 shadow-lg p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center mb-20 overflow-hidden z-10 transition-transform origin-top will-change-transform">
            <div className="flex-1 z-10 max-w-xl">
              <span className="font-mono text-xl text-text-dark/40 block mb-4">001</span>
              <h3 className="text-3xl font-bold font-sans mb-4">Clarify the brand and the offer</h3>
              <p className="text-text-dark/70 font-medium max-w-lg leading-relaxed">
                We learn which jobs you want, where you work, and why customers choose you. Then we build a message and plan around those priorities.
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
                We create the content, service pages, and campaigns that show the quality of your work and give customers a clear way to get a quote.
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
                We review inquiries, campaign results, and follow-up to see what brings useful leads and where the booking process needs work.
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

      <section id="investment" aria-labelledby="investment-heading" className="border-t border-text-dark/10 bg-background px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 id="investment-heading" className="mb-4 flex items-center gap-4 text-4xl font-bold tracking-tight md:text-5xl"><span className="text-accent">04 //</span> Investment</h2>
            <p className="max-w-xl text-lg leading-relaxed text-text-dark/65">Three ways to work together. A clear scope and a custom quote for your business.</p>
          </div>
          <div className="border-t border-text-dark/20">
            {investmentPackages.map(plan => (
              <article key={plan.name} className="grid items-center gap-5 border-b border-text-dark/15 py-7 md:grid-cols-[1fr_1.4fr_auto] md:gap-10 md:py-9">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dark/45">{plan.format}</p>
                  <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
                </div>
                <p className="max-w-lg text-base leading-relaxed text-text-dark/65">{plan.description}</p>
                <a href="#contact" onClick={() => setSelectedInvestment(plan.name)} aria-label={`Discuss ${plan.name}`} className="inline-flex w-fit items-center gap-4 py-2 text-sm font-semibold transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">Let’s talk <span aria-hidden="true" className="text-accent">↗</span></a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-text-dark/50">Pricing and deliverables are agreed before we start. Advertising spend is separate.</p>
        </div>
      </section>

      <section id="contact" className="bg-background px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-accent">
              Contact
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Let's bring more of the right jobs your way.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-text-dark/72">
              Tell us what services you offer, where you work, and what you want to improve.
              We will reply with a clear next step.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-text-dark/10 bg-primary px-5 py-3 font-bold text-text-dark transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={18} />
              {contactEmail}
            </a>
          </div>

          <form
            action={`https://formsubmit.co/${contactEmail}`}
            method="post"
            className="rounded-[2rem] border border-text-dark/10 bg-primary p-5 shadow-sm md:p-8"
          >
            <input type="hidden" name="_subject" value="New Obskura website inquiry" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={contactRedirectUrl} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-text-dark/50">Investment package</span>
                <select name="investment_package" value={selectedInvestment} onChange={event => setSelectedInvestment(event.target.value)} className="w-full rounded-xl border border-text-dark/10 bg-background px-4 py-3 font-medium outline-none transition-colors focus:border-accent">
                  <option value="">Help me choose / custom scope</option>
                  {investmentPackages.map(plan => <option key={plan.name} value={plan.name}>{plan.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-text-dark/50">
                  Name
                </span>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-text-dark/10 bg-background px-4 py-3 font-medium outline-none transition-colors focus:border-accent"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-text-dark/50">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-text-dark/10 bg-background px-4 py-3 font-medium outline-none transition-colors focus:border-accent"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-text-dark/50">
                  Company
                </span>
                <input
                  name="company"
                  className="w-full rounded-xl border border-text-dark/10 bg-background px-4 py-3 font-medium outline-none transition-colors focus:border-accent"
                  placeholder="Business name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-text-dark/50">
                  Project Type
                </span>
                <select
                  name="project_type"
                  className="w-full rounded-xl border border-text-dark/10 bg-background px-4 py-3 font-medium outline-none transition-colors focus:border-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Website</option>
                  <option>Paid ads</option>
                  <option>SEO</option>
                  <option>Video or content</option>
                  <option>CRM or automation</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-text-dark/50">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-text-dark/10 bg-background px-4 py-3 font-medium outline-none transition-colors focus:border-accent"
                  placeholder="What services do you offer, which areas do you serve, and where do you need help?"
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="magnetic-btn group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-bold text-white sm:w-auto"
            >
              <span className="relative z-10">Send inquiry</span>
              <Send className="relative z-10 transition-transform group-hover:translate-x-1" size={18} />
              <span className="hover-bg bg-text-dark"></span>
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#111111] text-[#E8E4DD] rounded-t-[4rem] pt-24 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Obskura</h2>
            <p className="text-[#E8E4DD]/60 font-medium text-lg leading-relaxed mb-8">
              Helping home-service businesses connect local marketing, useful content, and better follow-up.
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
                <a href="#process" className="hover:text-accent transition-colors">
                  Process
                </a>
                <Link to="/team" className="hover:text-accent transition-colors">
                  Team
                </Link>
                <a href="#investment" className="hover:text-accent transition-colors">
                  Investment
                </a>
                <a href="#contact" className="hover:text-accent transition-colors">
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

