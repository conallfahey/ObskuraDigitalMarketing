import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const team = [
  { first: 'Conall', last: 'Fahey', photo: 'conall' },
  { first: 'Teddy', last: 'Demask', photo: 'teddy' },
  { first: 'Max', last: 'Peckinpaugh', photo: 'max' },
];

export default function TeamPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'The Team | Obskura';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-text-dark selection:bg-accent selection:text-white">

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-12 md:pt-40 lg:px-24">
        <header className="mb-16 grid items-end gap-8 lg:mb-24 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-accent">Obskura / The team</p>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.8rem]">
              The people<br />behind <span className="font-serif font-normal italic text-accent">the work.</span>
            </h1>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-text-dark/65 lg:pb-2">
            Meet the Obskura team. Content, marketing, and systems, brought together for the businesses we work with.
          </p>
        </header>

        <section aria-label="Team members" className="border-t border-text-dark/25">
          {team.map((person, index) => (
            <article key={person.photo} className="grid grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-text-dark/20 py-9 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-6 md:py-12">
              <span aria-hidden="true" className="self-start pt-2 font-mono text-xs text-accent md:pt-3">0{index + 1}</span>
              <h2 className="text-2xl font-medium leading-[1.1] tracking-[-0.035em] sm:text-4xl md:text-5xl lg:text-6xl">
                {person.first} <span className="font-serif font-normal italic">{person.last}</span>
              </h2>
              <div className="size-16 overflow-hidden rounded-full bg-primary ring-1 ring-text-dark/15 sm:size-24 md:size-28">
                <img
                  src={`/images/team/${person.photo}.webp`}
                  alt=""
                  width="512"
                  height="512"
                  className="size-full origin-[50%_36%] scale-150 object-cover"
                />
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 flex flex-col items-start justify-between gap-8 md:mt-20 md:flex-row md:items-center" aria-labelledby="team-contact-heading">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-dark/45">Let’s work together</p>
            <h2 id="team-contact-heading" className="text-3xl font-medium tracking-tight md:text-4xl">Your next chapter starts with a conversation.</h2>
          </div>
          <Link to="/#contact" className="inline-flex shrink-0 items-center gap-5 rounded-full bg-accent px-7 py-4 font-bold text-white transition-colors hover:bg-text-dark">
            Talk to the team <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </section>
      </main>

      <footer className="border-t border-text-dark/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 text-sm text-text-dark/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Obskura Digital Marketing.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/" className="hover:text-accent">Home</Link>
            <a href="mailto:conall@obskuraagency.com" className="hover:text-accent">Email us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
