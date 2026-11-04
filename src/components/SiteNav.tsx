import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { label: 'Services', to: '/#services' },
  { label: 'Case Studies', to: '/#case-studies' },
  { label: 'Process', to: '/#process' },
  { label: 'Investment', to: '/#investment' },
  { label: 'Team', to: '/team' },
];

export default function SiteNav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    if (location.pathname === '/' && location.hash) {
      const timer = window.setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }, 150);
      return () => window.clearTimeout(timer);
    } else if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const isActive = (to: string) => to === '/#case-studies'
    ? location.pathname.startsWith('/case-studies/') || `${location.pathname}${location.hash}` === to
    : `${location.pathname}${location.hash}` === to;

  return (
    <nav aria-label="Main navigation" className="main-nav fixed left-1/2 top-6 z-50 flex w-[90%] max-w-5xl -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-text-dark/15 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-xl md:px-6">
      <Link to="/" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight md:gap-3" aria-label="Obskura home">
        <img src="/images/Obskura - Black Stroke SVG - NO BG.svg" alt="" className="h-9 w-9" />
        Obskura
      </Link>
      <div className="hidden items-center gap-5 text-sm font-medium md:flex">
        {links.map(link => (
          <Link key={link.to} to={link.to} aria-current={isActive(link.to) ? 'location' : undefined} className={`transition-colors hover:text-accent ${isActive(link.to) ? 'text-accent' : ''}`}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link to="/#contact" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 rounded-full bg-text-dark px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent md:px-5">
          Contact <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)} className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-accent md:hidden">
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-[calc(100%+12px)] flex flex-col rounded-3xl border border-text-dark/15 bg-background p-3 shadow-lg md:hidden">
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} aria-current={isActive(link.to) ? 'location' : undefined} className={`rounded-xl px-4 py-3 font-medium hover:bg-primary ${isActive(link.to) ? 'text-accent' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
