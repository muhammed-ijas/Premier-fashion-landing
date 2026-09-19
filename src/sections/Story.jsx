import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import { ceoMessage, history, company } from "../data/company";
import { about as aboutMedia, hasMedia } from "../data/media";
import { EASE } from "../lib/motion";

/* ---------- HISTORY ----------
   Desktop: years run across a single row; clicking one opens its detail
   in the panel to the right. Phones: the same years stack as an
   accordion, opening downward. Everything starts closed.             */
function History() {
  const [openYear, setOpenYear] = useState(history[0].year);
  const active = history.find((h) => h.year === openYear) ?? null;

  return (
    <div>
      {/* ---- desktop: years on a rule, detail in a fixed slot below ----
           The slot is a fixed height, so opening a year swaps the text
           without moving anything on the page. */}
      <div className="hidden md:block">
        <div className="flex flex-wrap items-stretch border-b border-line">
          {history.map((entry) => {
            const isActive = entry.year === openYear;

            return (
              <button
                key={entry.year}
                type="button"
                onClick={() => setOpenYear(entry.year)}
                aria-expanded={isActive}
                className="group relative cursor-pointer px-4 py-3 first:pl-0"
              >
                <span
                  className={clsx(
                    "text-[0.82rem] font-bold tracking-[0.02em] transition-colors duration-300",
                    isActive ? "text-green" : "text-white/70 group-hover:text-white"
                  )}
                >
                  {entry.year}
                </span>

                {/* underline sits on the rule, grows from the centre */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute inset-x-2 bottom-0 h-[2px] origin-center bg-green transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* fixed slot — nothing below this ever moves */}
        <div className="relative h-[104px]">
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                key={active.year}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute inset-0 flex items-start gap-6 pt-6"
              >
                <span className="shrink-0 text-2xl font-bold leading-none text-green">
                  {active.year}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.88rem] font-semibold uppercase leading-snug tracking-[0.05em] text-white">
                    {active.title}
                  </h3>
                  <p className="mt-1.5 max-w-3xl text-[0.8rem] leading-[1.8] text-fg-muted">
                    {active.description}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* ---- phones ---- */}
      <div className="border-t border-line md:hidden">
        {history.map((entry) => {
          const isActive = entry.year === openYear;
          return (
            <div key={entry.year} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpenYear(entry.year)}
                aria-expanded={isActive}
                className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left"
              >
                <span
                  className={clsx(
                    "text-[0.85rem] font-bold transition-colors duration-250",
                    isActive ? "text-green" : "text-white"
                  )}
                >
                  {entry.year}
                </span>
                <span className="flex-1 truncate text-[0.72rem] uppercase tracking-[0.05em] text-fg-muted">
                  {entry.title}
                </span>
                <ChevronDown
                  size={15}
                  strokeWidth={2.2}
                  className={clsx(
                    "shrink-0 transition-transform duration-300",
                    isActive ? "rotate-180 text-green" : "text-fg-subtle"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-[0.78rem] leading-[1.85] text-fg-muted">
                      {entry.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Story() {
  return (
    <>
      <section id="story" className="surface-light py-14 md:py-20">
      {/* ---------- CHAIRMAN ----------
           Cut-out portrait overlapping a raised panel. The image is a
           transparent PNG anchored to the panel's bottom edge and allowed
           to rise above it, so it reads as stepping out of the card. */}
      <Container>
        <Reveal as="up" className="max-w-2xl">
          <p className="eyebrow mb-3">Leadership</p>
          <h2 className="section-title-dark text-balance">A message from our CEO</h2>
        </Reveal>

        <Reveal as="up" delay={0.08} className="mt-16 md:mt-20">
          <div className="relative bg-page px-6 pb-8 pt-28 sm:px-8 md:px-10 md:pb-10 md:pt-10">
            {/* faint quote glyph, sized as a graphic rather than an icon */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-2 select-none font-sans text-[7rem] leading-none text-ink/[0.07] md:text-[9rem]"
            >
              &rdquo;
            </span>

            <div className="relative md:grid md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr]">
              {/* portrait — absolute on desktop so it can overflow upward */}
              {hasMedia(aboutMedia.ceoPortrait) && (
                <img
                  src={aboutMedia.ceoPortrait}
                  alt={`${company.founder}, ${company.founderTitle}`}
                  loading="lazy"
                  className="absolute bottom-0 left-1/2 h-[calc(100%+6rem)] w-auto max-w-none -translate-x-1/2 object-contain object-bottom md:left-0 md:h-[calc(100%+5rem)] md:translate-x-0"
                />
              )}

              {/* spacer holds the portrait's column on desktop */}
              <div aria-hidden="true" className="hidden md:block" />

              <div className="pt-2 md:pt-0">
                <blockquote className="text-balance text-[1.1rem] font-medium leading-[1.5] text-ink md:text-[1.4rem]">
                  {ceoMessage.quote}
                </blockquote>

                <div className="mt-5 flex items-center gap-3">
                  <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-green" />
                  <div>
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-ink">
                      {company.founder}
                    </p>
                    <p className="mt-0.5 text-[0.7rem] text-body">
                      {company.founderTitle}
                    </p>
                  </div>
                </div>

                <p className="mt-6 border-t border-hairline pt-5 text-[0.8rem] leading-[1.95] text-body">
                  {ceoMessage.statement}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      </section>

      <section className="surface-blue py-14 md:py-20">
        {/* ---------- HISTORY ---------- */}
        <Container>
        <Reveal as="up" className="max-w-2xl">
          <p className="eyebrow mb-3">Our history</p>
          <h2 className="section-title text-balance">Two decades of advancement</h2>
        </Reveal>

        <Reveal as="up" delay={0.08} className="mt-7">
          <History />
        </Reveal>
        </Container>
      </section>
    </>
  );
}