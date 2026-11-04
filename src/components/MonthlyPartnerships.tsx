export const partnershipNames = ['Market Foundation', 'Market Growth', 'Custom Partnership'] as const;

export default function MonthlyPartnerships({ onSelect }: { onSelect: (name: string) => void }) {
  return (
    <section id="investment" aria-labelledby="investment-heading" className="border-t border-text-dark/10 bg-background px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Monthly partnerships
        </div>
        <h2 id="investment-heading" className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Three ways to work together.</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-dark/70">Choose your monthly capacity. Every plan includes production, social management, advertising management, and local SEO. Ad spend is separate.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="flex flex-col rounded-3xl border border-text-dark/15 p-6 sm:p-8">
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-text-dark/65">01 / Foundation
            </div>
            <h3 className="text-xl font-bold">Market Foundation</h3>
            <div className="my-4 text-4xl font-bold tracking-tight text-accent">$15K <small className="text-sm font-medium text-text-dark/70">/ month</small>
            </div>
            <p>A consistent presence.<br />A focused marketing plan.</p>
            <ul className="my-5 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li><strong>2 filming days</strong> / month</li>
              <li><strong>4 short-form videos</strong> / month</li>
              <li><strong>2 ad variations</strong> / month</li>
              <li>Social account setup and management</li>
              <li>Meta <strong>or</strong> Google Ads management</li>
              <li>Local SEO and website improvements</li>
              <li>Monthly strategy and reporting</li>
            </ul>
            <a className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-text-dark/20 px-4 py-2 font-semibold hover:border-accent hover:text-accent" href="#contact" onClick={() => onSelect(partnershipNames[0])}>Explore Foundation <span>↗</span></a>
          </article>
          <article className="flex flex-col rounded-3xl border border-text-dark/15 p-6 sm:p-8 border-accent/60 bg-primary">
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-text-dark/65">02 / Growth
            </div>
            <h3 className="text-xl font-bold">Market Growth</h3>
            <div className="my-4 text-4xl font-bold tracking-tight text-accent">$30K <small className="text-sm font-medium text-text-dark/70">/ month</small>
            </div>
            <p>More campaign capacity.<br />More room to test and improve.</p>
            <ul className="my-5 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li><strong>4 filming days</strong> / month</li>
              <li><strong>8 short-form videos</strong> / month</li>
              <li><strong>4 ad variations</strong> / month</li>
              <li>Social account setup and management</li>
              <li>Meta <strong>and</strong> Google Ads management</li>
              <li>Expanded SEO and landing-page work</li>
              <li>Weekly campaign review</li>
            </ul>
            <a className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 font-semibold text-white hover:bg-text-dark" href="#contact" onClick={() => onSelect(partnershipNames[1])}>Explore Growth <span>↗</span></a>
          </article>
          <article className="flex flex-col rounded-3xl border border-text-dark/15 p-6 sm:p-8">
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-text-dark/65">03 / Custom
            </div>
            <h3 className="text-xl font-bold">Custom Partnership</h3>
            <div className="my-4 text-4xl font-bold tracking-tight text-accent">$75K+ <small className="text-sm font-medium text-text-dark/70">/ month</small>
            </div>
            <p>Custom plans starting at $75K/month.<br />Built around your business needs.</p>
            <ul className="my-5 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li><strong>10 filming days</strong> / month</li>
              <li><strong>16 short-form videos</strong> / month</li>
              <li><strong>8 ad variations</strong> / month</li>
              <li>Social account setup and management</li>
              <li>Advanced Meta and Google Ads management</li>
              <li>Custom SEO and conversion program</li>
              <li>Weekly reviews and quarterly planning</li>
            </ul>
            <a className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-text-dark/20 px-4 py-2 font-semibold hover:border-accent hover:text-accent" href="#contact" onClick={() => onSelect(partnershipNames[2])}>Discuss your scope <span>↗</span></a>
          </article>
        </div>
        <div className="mt-8 grid gap-3 rounded-2xl bg-primary p-6 md:grid-cols-[1fr_2fr] md:items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Social accounts, explained
            </div>
            <h3 className="text-xl font-bold">Social management, included.</h3>
          </div>
          <p>We create or set up your company accounts and handle content planning, captions, scheduling, publishing, and day-to-day management. Instagram, Facebook, TikTok, and YouTube—up to four accounts, selected together. You keep ownership; we handle the work. Cross-posting one video does not increase your video count.</p>
        </div>
        <details className="mt-6 rounded-2xl border border-text-dark/15 p-5">
          <summary className="cursor-pointer font-bold">Compare the partnership scope +</summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm [&_td]:border-t [&_td]:border-text-dark/10 [&_td]:p-3 [&_th]:p-3">
              <thead>
                <tr><th>Monthly capacity</th><th>Foundation / $15K</th><th>Growth / $30K</th><th>Custom / $75K+</th></tr>
              </thead>
              <tbody>
                <tr><td>Filming days</td><td>2</td><td>4</td><td>10</td></tr>
                <tr><td>Unique short-form videos, 15–60 sec.</td><td>4</td><td>8</td><td>16</td></tr>
                <tr><td>Ad variations, using new or existing footage</td><td>2</td><td>4</td><td>8</td></tr>
                <tr><td>Creative development</td><td>Monthly content planning</td><td>Campaign concepts + testing</td><td>Custom creative strategy</td></tr>
                <tr><td>Social account setup and management</td><td>Setup, planning, captions &amp; publishing</td><td>Setup, planning, captions &amp; publishing</td><td>Setup, planning, captions &amp; publishing</td></tr>
                <tr><td>Paid advertising</td><td>Meta OR Google Ads</td><td>Meta + Google Ads</td><td>Custom campaign program</td></tr>
                <tr><td>Website and local search</td><td>Priority improvements</td><td>Expanded implementation</td><td>Custom implementation plan</td></tr>
                <tr><td>Strategy and review</td><td>Monthly</td><td>Weekly campaigns + monthly strategy</td><td>Weekly operations + quarterly planning</td></tr>
              </tbody>
            </table>
          </div>
        </details>
        <details className="mt-4 space-y-4 rounded-2xl border border-text-dark/15 p-5">
          <summary className="cursor-pointer font-bold">Engagement details +</summary>
          <p>All retainers include creative planning, production, social management, paid advertising management, and local SEO. Website and search work is prioritized around your actual needs; the proposal defines the implementation workload. Custom partnerships start at $75K/month, with final pricing tailored to your agreed campaign and production needs.</p>
          <p>Proposed initial term: 6 months, then monthly with 30 days’ notice. One company or branch and one website form the starting scope, with geography and production logistics agreed together. Additional branches and markets are quoted separately. Media spend, travel outside the agreed production area, CRM/call-tracking subscriptions, full website rebuilds, and specialist production costs are additional.</p>
          <p>Two consolidated revision rounds per asset. Monthly allowances do not roll over. Short-form content is part of the included video count; cross-posts do not increase the count. Ad variations may reuse footage with different hooks, offers, or calls to action. Final availability and scope are confirmed in the signed agreement.</p>
        </details>
      </div>
    </section>
  );
}
