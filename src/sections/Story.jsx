import { Quote } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Stagger from "../components/Stagger";
import { ceoMessage, history, company } from "../data/company";
import { about as aboutMedia, hasMedia } from "../data/media";

export default function Story() {
  return (
    <section id="story" className="surface-blue py-16 md:py-24">
      {/* ---------- CHAIRMAN ---------- */}
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
          {hasMedia(aboutMedia.ceoPortrait) && (
            <Reveal as="right" className="mx-auto w-full max-w-[260px] md:mx-0 md:max-w-none">
              <div className="relative">
                <img
                  src={aboutMedia.ceoPortrait}
                  alt={`${company.founder}, ${company.founderTitle}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                {/* offset frame — one flat green edge, no gradient */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full border-2 border-green"
                />
              </div>
            </Reveal>
          )}

          <div>


            <Reveal as="up" delay={0.06}>
              <Quote className="h-8 w-8 text-green" strokeWidth={1.75} aria-hidden="true" />
              <blockquote className="mt-4 text-balance text-[1.15rem] font-medium leading-[1.6] text-white md:text-[1.4rem]">
                {ceoMessage.quote}
              </blockquote>
            </Reveal>

               <Reveal as="up" delay={0.12}>
              <p className="mt-6 text-[0.85rem] leading-[1.9] text-fg-muted">
                {ceoMessage.statement}
              </p>
            </Reveal>

            <Reveal as="up" delay={0.18}>
              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span className="h-[2px] w-10 shrink-0 bg-green" />
                <div>
                  <p className="text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-white">
                    {company.founder}
                  </p>
                  <p className="mt-1 text-[0.78rem] text-fg-muted">{company.founderTitle}</p>
                </div>
              </div>
            </Reveal>

         
          </div>
        </div>
      </Container>

      {/* ---------- HISTORY ---------- */}
      <Container className="mt-20 md:mt-24">
        <Reveal as="up" className="max-w-2xl">
          <p className="eyebrow mb-4">Our history</p>
          <h2 className="section-title text-balance">Two decades of advancement</h2>
        </Reveal>

        {/* horizontal rail with the year markers sitting on it */}
        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-line lg:block"
          />

          <Stagger className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
            {history.map((entry) => (
              <Stagger.Item key={entry.year} as="up" className="group relative">
                {/* marker */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[3px] hidden h-2.5 w-2.5 bg-green transition-transform duration-300 group-hover:scale-125 lg:block"
                />
                {/* mobile rule */}
                <span aria-hidden="true" className="block h-[2px] w-8 bg-green lg:hidden" />

                <p className="mt-4 text-[1.1rem] font-bold leading-none text-green lg:mt-7">
                  {entry.year}
                </p>
                <h3 className="mt-2.5 text-[0.78rem] font-semibold uppercase leading-snug tracking-[0.06em] text-white">
                  {entry.title}
                </h3>
                <p className="mt-2 text-[0.76rem] leading-[1.75] text-fg-muted">
                  {entry.description}
                </p>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}