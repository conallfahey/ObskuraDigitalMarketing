import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text-dark selection:bg-accent selection:text-white">
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
        <Link
          to="/work-index"
          className="hidden font-medium transition-colors hover:text-accent md:inline-flex"
        >
          Work Index
        </Link>
      </nav>

      <main className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-32 md:px-12 lg:px-24">
        <div className="absolute inset-0">
          <img
            src="/images/Obskura-Chicago-Sunset.jpg"
            alt=""
            className="h-full w-full object-cover opacity-35 grayscale-[10%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(230,59,46,0.18),transparent_34%),linear-gradient(180deg,rgba(245,243,238,0.7),rgba(245,243,238,0.98)_74%)]"></div>
        </div>

        <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-text-dark/10 bg-background/90 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent shadow-sm backdrop-blur-sm">
              <CheckCircle2 size={16} />
              Inquiry Received
            </span>
            <h1 className="mb-6 font-serif text-5xl italic leading-[0.95] tracking-tight md:text-7xl">
              Thanks, we got it.
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-text-dark/78 md:text-2xl">
              Your message is on its way. We usually reply within one business day with a clear
              next step.
            </p>
          </div>

          <div className="rounded-[2rem] border border-text-dark/10 bg-background/90 p-6 shadow-xl backdrop-blur-md md:p-8">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-text-dark/45">
              What happens next
            </p>
            <div className="space-y-4">
              {[
                'We review the project details and goals.',
                'We reply with the best next step, question, or call time.',
                'If there is a fit, we map scope, timeline, and priorities.',
              ].map((item, index) => (
                <div key={item} className="grid grid-cols-[2rem_1fr] gap-4 rounded-2xl bg-primary p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="font-semibold leading-relaxed text-text-dark/76">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="magnetic-btn inline-flex items-center justify-center gap-3 rounded-full bg-text-dark px-6 py-3 font-bold text-background"
              >
                Back home <ArrowRight size={16} />
                <span className="hover-bg bg-accent"></span>
              </Link>
              <a
                href="mailto:conall@obskuraagency.com"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-text-dark/10 bg-primary px-6 py-3 font-bold text-text-dark transition-colors hover:border-accent hover:text-accent"
              >
                <Mail size={16} />
                Email directly
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
