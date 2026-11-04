import { Plus } from 'lucide-react';

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-y border-text-dark/10 bg-primary px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">Before we get started</p>
          <h2 id="faq-heading" className="text-4xl font-bold tracking-tight md:text-5xl">Good questions.<br />Clear answers.</h2>
        </div>
        <div className="border-t border-text-dark/15">
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                Is advertising spend included in the retainer?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">No. You pay the platforms directly. Retainers cover the agreed strategy, production, management, and optimization. Your media budget is approved separately before launch.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                Where do you work?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">We’re based in Chicago and work with home service businesses beyond our home market. Production coverage, travel, and any additional branches are agreed as part of your scope.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                Can you build us a new website?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">Yes. We can design and build a new website for your business, with clear service information, strong visuals, and an easy path for customers to contact you. New website builds are scoped and priced separately from the monthly marketing partnerships.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                What does local SEO include?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">We improve your Google Business Profile and website so homeowners can better understand what you do and where you work. That can include clearer service pages, real project stories, useful homeowner answers, technical fixes, and a review request process. Your proposal defines the work based on your current website and priorities. Rankings take time and cannot be guaranteed.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                Can you report ROI from ads and SEO?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">We track costs and customer inquiries, then connect them to appointments, sold jobs, and revenue when your sales records allow. Ads reporting can include return on ad spend; SEO reporting looks at organic-search outcomes over time. A true ROI assessment also needs margins and total marketing costs. We agree on measurement up front and explain gaps instead of promising a specific return.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                What do you need from our team?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">A decision-maker, filming access, timely approvals, account permissions, and reliable lead follow-up. For revenue reporting, your team must keep appointment and sold-job information current in your CRM.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                Can you create social media pages if we don’t have them?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">Yes. If your business doesn’t already have social media pages, we can create and set them up on the agreed platforms. Every partnership includes social account setup and management, including content planning, captions, scheduling, and publishing. You retain ownership; we handle the day-to-day content calendar. We’ll need your business information, access, and approvals to get started.</p>
            </details>
            <details className="group border-b border-text-dark/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                What types of videos do you create?
                <Plus size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-text-dark/70">We create project highlights, customer testimonials, educational videos, brand stories, and advertising creative. Short-form content for social media is also included within each tier’s video allowance. The mix follows your business goals and campaign priorities.</p>
            </details>
        </div>
      </div>
    </section>
  );
}
