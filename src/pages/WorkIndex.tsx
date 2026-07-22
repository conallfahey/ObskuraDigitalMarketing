import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Film, LayoutGrid, PenLine, Play, Sparkles, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredWork = [
  {
    title: 'Dearly Beloved Campaign Still',
    type: 'Content',
    scope: 'Ad Creative / Still Direction / Social Cuts',
    image: '/images/Gallery/Dearly Beloved - Ad Still Primary.png',
    summary:
      'A polished campaign visual built to give paid and organic channels a stronger first impression.',
  },
  {
    title: 'Good Night John Boy Campaign',
    type: 'Video',
    scope: 'Instagram Reel / Paid Social / Campaign Creative',
    image: "/images/Gallery/GoodNight John Boy - Let's go to the disco ad.png",
    viewer: 'instagram' as const,
    summary:
      'A social-first campaign spot packaged for an Instagram-style viewing experience.',
  },
  {
    title: 'Comfort Moving CRM',
    type: 'App',
    scope: 'CRM / Pipeline / Automation',
    image: '/images/Gallery/Comfort Moving CRM.png',
    caseStudyUrl: '/case-studies/comfort-moving-crm',
    summary:
      'A custom operating view that keeps inbound leads, follow-up, quote status, and campaign attribution in one place.',
  },
];

const workTiles = [
  {
    title: 'Well Studios Creative',
    category: 'Content',
    image: '/images/Gallery/Well Studios - Creative.jpg',
  },
  {
    title: 'Tzuco Event Capture',
    category: 'Content',
    image: '/images/Gallery/Tzuco.JPG',
  },
  {
    title: 'Mamitas Windy City Smokeout',
    category: 'Content',
    image: '/images/Gallery/Mamitas_WindyCitySmokeout2.jpg',
  },
  {
    title: 'Interior Design Ad',
    category: 'Design',
    image: '/images/Gallery/Interior-Design-Ad.png',
  },
  {
    title: 'Good Night John Boy Campaign',
    category: 'Content',
    image: "/images/Gallery/GoodNight John Boy - Let's go to the disco ad.png",
    viewer: 'instagram' as const,
  },
  {
    title: 'Fahey Wedding Films Ads',
    category: 'Content',
    image: '/images/Gallery/Fahey Wedding Films Ads.png',
  },
  {
    title: 'EVRGREEN Web Direction',
    category: 'Design',
    image: '/images/Gallery/EVRGREEN - Hero page Design.png',
  },
  {
    title: 'Delight Construction Web Direction',
    category: 'Design',
    image: '/images/Gallery/Delight Construcrtion - Hero Web Design.png',
  },
  {
    title: 'Dearly Beloved Ad Still',
    category: 'Content',
    image: '/images/Gallery/Dearly Beloved - Ad Still.png',
  },
  {
    title: 'Comfort Moving Hero Design',
    category: 'Design',
    image: '/images/Gallery/Comfort Moving - Hero Web Design.png',
  },
  {
    title: 'Comfort Moving CRM',
    category: 'App',
    image: '/images/Gallery/Comfort Moving CRM.png',
  },
];

type ViewerItem = {
  title: string;
  category?: string;
  type?: string;
  image: string;
  caseStudyUrl?: string;
  viewer?: 'image' | 'instagram';
};

const lanes = [
  {
    icon: Film,
    label: 'Content',
    detail: 'Video concepts, scripts, shoot direction, edits, stills, and social-first creative.',
  },
  {
    icon: PenLine,
    label: 'Design',
    detail: 'Campaign pages, identity systems, layout direction, conversion paths, and launch visuals.',
  },
  {
    icon: Code2,
    label: 'Apps',
    detail: 'Dashboards, CRMs, automations, internal tools, and client-facing workflow systems.',
  },
];

export default function WorkIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeViewerItem, setActiveViewerItem] = useState<ViewerItem | null>(null);

  const openViewer = (item: ViewerItem) => {
    setActiveViewerItem(item);
  };

  const closeViewer = () => {
    setActiveViewerItem(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.work-hero-content > *', {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });

      gsap.from('.work-feature-card', {
        scrollTrigger: {
          trigger: '.work-feature-grid',
          start: 'top 75%',
        },
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.work-tile', {
        scrollTrigger: {
          trigger: '.work-tile-grid',
          start: 'top 78%',
        },
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeViewerItem) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeViewer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeViewerItem]);

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
          <Link to="/work-index" className="hover-lift text-accent transition-colors">
            Work Index
          </Link>
          <Link to="/#case-studies" className="hover-lift hover:text-accent transition-colors">
            Case Studies
          </Link>
        </div>
        <button className="magnetic-btn bg-accent text-white px-5 py-2 rounded-full text-sm font-medium group">
          <span className="relative z-10 flex items-center gap-2">
            Contact <ArrowRight size={14} />
          </span>
          <span className="hover-bg bg-text-dark"></span>
        </button>
      </nav>

      <section className="relative isolate min-h-[92dvh] overflow-hidden px-6 md:px-12 lg:px-24 pt-36 pb-16 flex items-end border-b border-text-dark/10">
        <div className="absolute inset-0">
          <img
            src="/images/Obskura-Chicago-Sunset.jpg"
            alt="Chicago skyline at sunset"
            className="h-full w-full object-cover grayscale-[10%] contrast-110 opacity-70"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(230,59,46,0.28),transparent_30%),linear-gradient(180deg,rgba(245,243,238,0.14),rgba(245,243,238,0.95)_82%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="work-hero-content grid grid-cols-1 lg:grid-cols-[1fr_0.72fr] gap-12 items-end">
            <div>
              <span className="font-mono text-sm tracking-widest text-accent uppercase mb-6 block">
                Work Index // Content / Design / Apps
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif italic leading-[0.9] tracking-tight mb-7 max-w-5xl">
                Proof, in motion.
              </h1>
              <p className="max-w-3xl text-xl md:text-2xl text-text-dark/78 font-medium leading-relaxed">
                A living index of the things we make: content systems, design moments, app
                interfaces, and the small sharp assets that turn strategy into something people
                can see.
              </p>
            </div>

            <div className="bg-[#111111] text-[#E8E4DD] rounded-[2rem] border border-[#E8E4DD]/10 p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs tracking-[0.24em] uppercase text-[#E8E4DD]/45">
                  Current Mix
                </span>
                <Sparkles className="text-accent" size={20} />
              </div>
              <div className="space-y-5">
                {lanes.map((lane) => {
                  const Icon = lane.icon;

                  return (
                    <div key={lane.label} className="grid grid-cols-[2.5rem_1fr] gap-4 items-start">
                      <div className="h-10 w-10 rounded-full bg-[#E8E4DD] text-[#111111] flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-bold mb-1">{lane.label}</p>
                        <p className="text-sm leading-relaxed text-[#E8E4DD]/62">{lane.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-4">
                <span className="text-accent">01 //</span> Featured Signals
              </h2>
              <p className="font-mono text-text-dark/60 max-w-2xl">
                Selected examples of the outputs clients actually need in market.
              </p>
            </div>
            <Link
              to="/#case-studies"
              className="magnetic-btn bg-text-dark text-background px-6 py-3 rounded-full font-bold inline-flex justify-center items-center gap-3 group w-fit"
            >
              <span className="relative z-10">View case studies</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={17} />
              <span className="hover-bg bg-accent"></span>
            </Link>
          </div>

          <div className="work-feature-grid grid grid-cols-1 lg:grid-cols-3 gap-7">
            {featuredWork.map((item, index) => (
              <article
                key={item.title}
                className={`work-feature-card group overflow-hidden rounded-[2rem] border border-text-dark/10 shadow-sm bg-background ${
                  index === 1 ? 'lg:translate-y-10' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => openViewer(item)}
                  className="relative block aspect-[4/5] w-full overflow-hidden bg-text-dark text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/78 via-[#111111]/10 to-transparent"></div>
                  <div className="absolute left-5 top-5 rounded-full bg-background/92 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-dark">
                    {item.type}
                  </div>
                  {item.viewer === 'instagram' && (
                    <div className="absolute right-5 top-5 h-11 w-11 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                      <Play size={18} fill="currentColor" />
                    </div>
                  )}
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-background/58 mb-2">
                      {item.scope}
                    </p>
                    <h3 className="text-3xl font-bold text-background leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </button>
                <div className="p-6">
                  <p className="text-text-dark/72 leading-relaxed font-medium">{item.summary}</p>
                  {item.caseStudyUrl && (
                    <Link
                      to={item.caseStudyUrl}
                      onClick={(event) => event.stopPropagation()}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-text-dark px-4 py-2 text-sm font-bold text-background transition-colors hover:bg-accent"
                    >
                      Read case study <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-4">
              <span className="text-accent">02 //</span> Snapshot Wall
            </h2>
            <p className="font-mono text-text-dark/60 max-w-2xl">
              Quick fragments from the kind of assets that stack into a serious marketing system.
            </p>
          </div>

          <div className="work-tile-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workTiles.map((tile, index) => (
              <button
                key={tile.title}
                type="button"
                onClick={() => openViewer(tile)}
                className={`work-tile group relative overflow-hidden rounded-[1.5rem] border border-text-dark/10 bg-primary shadow-sm ${
                  index === 0 || index === 5 ? 'sm:row-span-2' : ''
                } text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background`}
              >
                <div className={`${index === 0 || index === 5 ? 'aspect-[4/5] h-full' : 'aspect-[4/3]'} overflow-hidden`}>
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/76 via-[#111111]/5 to-transparent"></div>
                <div className="absolute left-5 right-5 bottom-5">
                  <span className="mb-3 inline-flex rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                    {tile.category}
                  </span>
                  {tile.viewer === 'instagram' && (
                    <span className="mb-3 ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-text-dark align-top">
                      <Play size={13} fill="currentColor" />
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-background leading-tight">{tile.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 pb-24 bg-background">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-[#111111] text-[#E8E4DD] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-10 items-center overflow-hidden relative">
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 bg-[linear-gradient(rgba(245,243,238,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.16)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="relative">
            <LayoutGrid className="text-accent mb-5" size={28} />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Built to become a real portfolio.
            </h2>
            <p className="text-lg text-[#E8E4DD]/68 leading-relaxed">
              These placeholders can be swapped for live screenshots, social cuts, campaign
              stills, and internal app captures as the work archive grows.
            </p>
          </div>
          <div className="relative grid grid-cols-3 gap-3 min-h-[260px]">
            {workTiles.slice(0, 6).map((tile, index) => (
              <button
                key={`${tile.title}-mini`}
                type="button"
                onClick={() => openViewer(tile)}
                className={`overflow-hidden rounded-xl border border-[#E8E4DD]/10 ${
                  index === 1 || index === 4 ? 'translate-y-8' : ''
                } cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
              >
                <img src={tile.image} alt="" className="h-full w-full object-cover grayscale-[20%]" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] text-[#E8E4DD] py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">Obskura</span>
            <span className="text-[#E8E4DD]/40">© {new Date().getFullYear()}</span>
          </div>
          <Link to="/" className="hover:text-accent transition-colors">
            Back to home
          </Link>
        </div>
      </footer>

      {activeViewerItem && (
        <div
          className="fixed inset-0 z-[100] bg-[#111111]/88 backdrop-blur-md px-4 py-6 md:px-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeViewerItem.title} preview`}
          onClick={closeViewer}
        >
          <button
            type="button"
            onClick={closeViewer}
            className="absolute right-5 top-5 z-10 h-11 w-11 rounded-full bg-background text-text-dark flex items-center justify-center shadow-xl transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close preview"
          >
            <X size={22} />
          </button>

          {activeViewerItem.viewer === 'instagram' ? (
            <div
              className="w-full max-w-[430px] overflow-hidden rounded-[2rem] bg-black shadow-2xl border border-white/10"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 text-white border-b border-white/10">
                <div>
                  <p className="font-bold text-sm">obskura</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    Instagram Reel
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-accent"></span>
              </div>
              <div className="relative bg-[#050505]" style={{ height: 'min(78dvh, 760px)' }}>
                <img
                  src={activeViewerItem.image}
                  alt={activeViewerItem.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/10"></div>
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/18 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  <Play size={34} fill="currentColor" />
                </div>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="font-bold text-xl leading-tight">{activeViewerItem.title}</p>
                  <p className="mt-2 text-sm text-white/70">
                    Instagram-style video preview. Drop in the final Reel/video URL when ready.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative max-h-[88dvh] w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeViewerItem.image}
                alt={activeViewerItem.title}
                className="mx-auto max-h-[88dvh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
              <div className="absolute left-4 right-4 bottom-4 rounded-xl bg-black/70 px-5 py-4 text-white backdrop-blur-md md:left-1/2 md:right-auto md:-translate-x-1/2 md:min-w-[360px]">
                <p className="font-bold">{activeViewerItem.title}</p>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/55">
                  {activeViewerItem.type ?? activeViewerItem.category ?? 'Preview'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
