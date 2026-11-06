import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const screenshots = [
  {
    title: 'One view of the working day',
    file: '154518', width: 2350, height: 1516,
    alt: 'Comfort Moving CRM dashboard showing recent leads, next moves, and completed jobs',
    caption: 'Recent inquiries, upcoming moves, and review follow-ups give the team a clear starting point each day.',
  },
  {
    title: 'Every inquiry has a next step',
    file: '154541', width: 2356, height: 1522,
    alt: 'Comfort Moving lead inbox with lead statuses, signed contracts, and move dates',
    caption: 'The inbox brings contact details, lead sources, quote progress, contract status, and move dates together.',
  },
  {
    title: 'See where demand comes from',
    file: '154825', width: 2521, height: 1594,
    alt: 'Comfort Moving analytics showing lead and booking trends, referral sources, and pipeline statuses',
    caption: 'Lead and booking trends sit alongside referral sources and pipeline status, connecting marketing activity to the sales workflow.',
  },
];

export default function ComfortMovingCaseStudy() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background text-text-dark">
      <main>
        <header className="px-6 pb-14 pt-36 md:px-12 md:pt-44 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <Link to="/#case-studies" className="text-sm font-semibold text-text-dark/60 hover:text-accent">← Back to work</Link>
            <p className="mb-5 mt-10 font-mono text-xs uppercase tracking-[0.24em] text-accent">Case study / Comfort Moving Chicago</p>
            <h1 className="max-w-4xl font-serif text-5xl italic leading-[1.02] tracking-tight md:text-7xl">From first click to booked move.</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-text-dark/75">Local SEO, campaign creative, Meta ads, and a custom CRM connected in one workflow for a Chicago moving company.</p>
            <div className="mt-10 grid gap-6 rounded-3xl bg-text-dark p-7 text-background sm:grid-cols-3 md:p-9">
              <div><p className="text-5xl font-bold text-accent">16x</p><p className="mt-2 text-sm text-background/75">Meta return on ad spend</p></div>
              <div><p className="text-3xl font-bold">2 months</p><p className="mt-2 text-sm text-background/75">First campaign result</p></div>
              <div><p className="text-3xl font-bold">One workflow</p><p className="mt-2 text-sm text-background/75">Inquiry through completed move</p></div>
            </div>
          </div>
        </header>

        <section className="px-6 py-12 md:px-12 lg:px-24" aria-labelledby="challenge-heading">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 id="challenge-heading" className="text-3xl font-bold tracking-tight">The challenge</h2>
            <div className="space-y-4 text-lg leading-relaxed text-text-dark/75">
              <p>Comfort Moving Chicago needed a more reliable source of booked jobs than word of mouth and flyers. Generating demand was only half the problem: inquiries, quotes, contracts, and follow-ups also needed a clear path through the business.</p>
              <p>We connected acquisition and operations so the team could attract local customers, respond to inquiries, and manage the move without losing context between tools.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-text-dark/10 bg-primary px-6 py-14 md:px-12 lg:px-24" aria-labelledby="marketing-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="marketing-heading" className="mb-8 text-3xl font-bold tracking-tight">A website built for local searches.</h2>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <a href="/images/ComfortMovingWebsite.png" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-text-dark/10 bg-background focus-visible:outline-2 focus-visible:outline-accent" aria-label="Open Comfort Moving website screenshot in a new tab">
                <img src="/images/ComfortMovingWebsite.png" alt="Comfort Moving Chicago website design" width={2353} height={1351} loading="lazy" className="h-auto w-full" />
              </a>
              <div className="space-y-7">
                <div><h3 className="mb-2 text-xl font-bold">Website & local SEO</h3><p className="leading-relaxed text-text-dark/75">Service and neighborhood pages were organized around how Chicago customers search. Clear quote forms shortened the path from local search to an inquiry, with website leads flowing into the CRM.</p></div>
                <div><h3 className="mb-2 text-xl font-bold">A practical handoff</h3><p className="leading-relaxed text-text-dark/75">Lead source, move details, and customer history stayed together so the team could pick up the conversation without rebuilding it from scattered messages.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="content-paid-ads" className="scroll-mt-28 px-6 py-14 md:px-12 lg:px-24" aria-labelledby="content-paid-ads-heading">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent">Content & paid ads</p>
            <div className="mb-8 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
              <h2 id="content-paid-ads-heading" className="text-3xl font-bold tracking-tight md:text-4xl">Show the work.<br />Reach the next customer.</h2>
              <p className="text-lg leading-relaxed text-text-dark/75">We created photo and video assets around Comfort Moving’s team and service, then paired that content with managed Meta campaigns to turn attention into moving inquiries.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <figure className="overflow-hidden rounded-2xl border border-text-dark/10 bg-primary">
                <img src="/images/ComfortMovingChicago.webp" alt="Comfort Moving Chicago crew carrying wrapped furniture through a storage facility" width={1800} height={1201} loading="lazy" className="h-auto w-full" />
                <figcaption className="px-5 py-4 text-sm text-text-dark/65">On-location content featuring the people behind the move.</figcaption>
              </figure>
              <div className="space-y-6">
                <div><h3 className="mb-2 text-xl font-bold">Content with a clear purpose</h3><p className="leading-relaxed text-text-dark/75">Photo, video, and influencer partnerships gave the brand a library of creative for paid and organic channels, showing customers the service before they requested a quote.</p></div>
                <div><h3 className="mb-2 text-xl font-bold">Meta campaigns & follow-up</h3><p className="leading-relaxed text-text-dark/75">We tested creative and managed campaigns while connecting Meta leads to the CRM. New inquiries entered the same pipeline as website requests, keeping campaign activity tied to the team’s follow-up.</p></div>
                <div className="flex items-center gap-5 border-t border-text-dark/15 pt-6"><p className="text-5xl font-bold tracking-tight text-accent">16x</p><p className="max-w-56 text-sm leading-relaxed text-text-dark/70">Return on Meta ad spend in the first two months.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="crm" className="scroll-mt-28 px-6 py-14 md:px-12 lg:px-24" aria-labelledby="crm-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-9 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <div><p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent">Inside the CRM</p><h2 id="crm-heading" className="text-3xl font-bold tracking-tight">Built around the move.</h2></div>
              <div className="space-y-4 text-lg leading-relaxed text-text-dark/75">
                <p>A custom React and Firebase application brings lead intake, quotes, bookings, contracts, payments, and follow-ups into one place. Staff work with move dates, routes, crew sizes, and deposits—the details they need to run a moving business.</p>
                <p>Each lead keeps its notes and activity history. Signed contracts, payment requests, upcoming jobs, and review reminders stay connected as the customer moves from inquiry to completion.</p>
              </div>
            </div>
            <div className="space-y-8">
              {screenshots.map(screenshot => (
                <figure key={screenshot.file} className="overflow-hidden rounded-2xl border border-text-dark/10 bg-primary">
                  <figcaption className="px-5 py-5 md:px-7">
                    <h3 className="text-xl font-bold">{screenshot.title}</h3>
                    <p className="mt-2 max-w-3xl leading-relaxed text-text-dark/70">{screenshot.caption}</p>
                  </figcaption>
                  <a href={`/images/Screenshot 2026-07-29 ${screenshot.file}.png`} target="_blank" rel="noreferrer" className="block border-t border-text-dark/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent" aria-label={`Open screenshot: ${screenshot.title} (new tab)`}>
                    <img src={`/images/Screenshot 2026-07-29 ${screenshot.file}.png`} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy" className="h-auto w-full" />
                  </a>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-4 md:px-12 lg:px-24" aria-labelledby="outcome-heading">
          <div className="mx-auto max-w-6xl rounded-3xl bg-text-dark p-8 text-background md:p-12">
            <h2 id="outcome-heading" className="mb-5 text-3xl font-bold tracking-tight">Marketing and operations, connected.</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-background/80">Meta campaigns returned 16x ad spend in the first two months. Alongside that result, Comfort Moving gained a stronger local search foundation and a central workspace for managing demand through booked jobs, payments, and post-move follow-up.</p>
            <Link to="/#contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 font-bold text-white hover:bg-background hover:text-text-dark">Talk about your business <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-text-dark/10 px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm"><Link to="/" className="font-bold">Obskura</Link><Link to="/work-index" className="hover:text-accent">Explore more work →</Link></div>
      </footer>
    </div>
  );
}
