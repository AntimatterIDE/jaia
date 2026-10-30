import { rightFit } from "@/content/site";

export function RightFit() {
  return (
    <section aria-labelledby="right-fit-heading" className="bg-canvas-soft w-full px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="eyebrow-label">{rightFit.eyebrow}</p>
        <h2
          id="right-fit-heading"
          className="font-display text-brand-ink mt-5 max-w-3xl text-[clamp(2.25rem,1.4rem+2.4vw,3.75rem)] leading-[1.05] font-medium tracking-tight"
        >
          {rightFit.heading}
        </h2>
        <p className="text-brand-slate mt-6 max-w-xl text-lg leading-relaxed">{rightFit.body}</p>
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow-label">{rightFit.forLabel}</p>
            <ul className="border-brand-mist mt-5 border-t">
              {rightFit.forItems.map((item) => (
                <li key={item} className="border-brand-mist text-brand-ink font-display border-b py-5 text-2xl leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow-label">{rightFit.notLabel}</p>
            <ul className="border-brand-mist mt-5 border-t">
              {rightFit.notItems.map((item) => (
                <li key={item} className="border-brand-mist text-brand-slate font-display border-b py-5 text-2xl leading-snug line-through decoration-brand-mist">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
