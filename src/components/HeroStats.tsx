import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const stats = [
  { label: 'Views', value: 20, unit: 'M', bars: [20, 35, 28, 46, 39, 58, 51, 72, 65, 90, 81, 100] },
  { label: 'Likes', value: 2, unit: 'M', bars: [15, 26, 22, 38, 48, 40, 60, 56, 76, 70, 92, 100] },
  { label: 'Shares', value: 500, unit: 'K', bars: [12, 20, 32, 27, 45, 40, 57, 68, 59, 82, 91, 100] },
];

export default function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const numbers = ref.current?.querySelectorAll<HTMLElement>('[data-stat-number]');
      numbers?.forEach((number, index) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stats[index].value,
          duration: 2,
          delay: 0.8 + index * 0.15,
          ease: 'power3.out',
          onUpdate: () => { number.textContent = Math.round(counter.value).toString(); },
          onComplete: () => { number.textContent = stats[index].value.toString(); },
        });
      });
      gsap.from(ref.current?.querySelectorAll('.hero-stat-bar') ?? [], {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1.4,
        delay: 0.8,
        stagger: 0.025,
        ease: 'power3.out',
      });
      return () => {
        numbers?.forEach((number, index) => { number.textContent = stats[index].value.toString(); });
      };
    }, ref);
    return () => media.revert();
  }, []);

  return (
    <div ref={ref} className="mt-10 w-full max-w-2xl rounded-2xl border border-text-dark/10 bg-background/65 px-3 py-5 backdrop-blur-md sm:mt-12 sm:px-6 sm:py-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dark/60 sm:text-xs">Across our social content</p>
      <dl className="mt-5 grid grid-cols-3 divide-x divide-text-dark/10">
        {stats.map(({ label, value, unit, bars }) => (
          <div key={label} className="relative flex flex-col-reverse items-center px-2 sm:px-5">
            <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-dark/65 sm:text-xs">{label}</dt>
            <dd className="text-3xl font-bold tabular-nums tracking-tight text-accent sm:text-5xl" aria-label={`${value}${unit}+`}>
              <span aria-hidden="true"><span data-stat-number>{value}</span>{unit}+</span>
            </dd>
            <div aria-hidden="true" className="hero-stat-chart mb-3 flex w-full items-end justify-center gap-1">
              {bars.map((height, index) => <span key={index} className="hero-stat-bar" style={{ height: `${height}%` }} />)}
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
