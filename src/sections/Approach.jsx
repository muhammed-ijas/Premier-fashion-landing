import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { pillars, designInitiatives, categories, ownDesignShare } from "../data/company";
import { categoryImages, hasMedia } from "../data/media";
import { EASE } from "../lib/motion";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* ---------- WHAT DRIVES US ----------
   Numbered plates on a tinted ground. The number sits large and pale
   behind the title, and the whole plate shifts to white on hover —
   no borders, no growing rules. */
function Pillars() {
  return (
    <Stagger className="mt-8 grid grid-cols-1 gap-px overflow-hidden bg-hairline sm:grid-cols-2 lg:grid-cols-5">
      {pillars.map((pillar, i) => (
        <Stagger.Item key={pillar.title} as="up" className="h-full">
          <article className="group relative h-full overflow-hidden bg-white px-5 pb-6 pt-7 transition-colors duration-300 hover:bg-blue">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 -top-3 text-[3.4rem] font-bold leading-none text-ink/[0.06] transition-colors duration-300 group-hover:text-white/15"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="relative text-[0.78rem] font-semibold uppercase leading-snug tracking-[0.06em] text-ink transition-colors duration-300 group-hover:text-white">
              {pillar.title}
            </h3>
            <p className="relative mt-3 text-[0.78rem] leading-[1.75] text-fg-muted transition-colors duration-300 group-hover:text-white/80">
              {pillar.description}
            </p>
          </article>
        </Stagger.Item>
      ))}
    </Stagger>
  );
}

/* ---------- KEY INITIATIVES ----------
   An accordion: one open at a time, the rest collapsed to a line.
   Reads as a considered list rather than four equal boxes. */
function Initiatives() {
  const [open, setOpen] = useState(0);

  const titles = [
    "West and East, together",
    "Season-by-season development",
    "Close to the buyer",
    "Our own US showroom",
  ];

  return (
    <div className="mt-8 border-t border-line">
      {designInitiatives.map((point, i) => {
        const isOpen = open === i;

        return (
          <div key={i} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-4 py-4 text-left"
            >
              <span
                className={clsx(
                  "text-[0.62rem] font-semibold tracking-[0.12em] transition-colors duration-300",
                  isOpen ? "text-green" : "text-fg-subtle"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={clsx(
                  "flex-1 text-[0.85rem] font-semibold uppercase tracking-[0.05em] transition-colors duration-300",
                  isOpen ? "text-blue" : "text-ink"
                )}
              >
                {titles[i] ?? `Initiative ${i + 1}`}
              </span>

              <Plus
                size={15}
                strokeWidth={2.2}
                className={clsx(
                  "shrink-0 transition-all duration-300",
                  isOpen ? "rotate-45 text-green" : "text-fg-subtle"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 pl-9 text-[0.82rem] leading-[1.85] text-fg-muted">
                    {point}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Approach() {
  return (
    <section id="approach" className="surface-sky py-14 md:py-16">
      {/* ---------- COMMITMENTS ---------- */}
      <Container>
        <SectionHeading
          kicker="What drives us"
          title="Five commitments behind every order"
          tone="ink"
        />
        <Pillars />
      </Container>

      {/* ---------- CATEGORY MIX ---------- */}
      <Container className="mt-14 md:mt-16">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading kicker="Category mix" title="A diverse range" tone="ink" />

          <Reveal as="up" delay={0.1} className="shrink-0">
            <p className="text-3xl font-bold leading-none text-green md:text-4xl">
              {ownDesignShare}
            </p>
            <p className="mt-2 max-w-[15rem] text-[0.78rem] leading-[1.7] text-fg-muted">
              of turnover is business booked on Premier&rsquo;s own design.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const image = categoryImages[slugify(cat)];
            const hasImage = hasMedia(image);

            return (
              <Stagger.Item key={cat} as="scale">
                <article
                  className={clsx(
                    "group relative flex aspect-[3/4] items-end overflow-hidden transition-colors duration-300",
                    hasImage ? "bg-ink" : "border border-line bg-white"
                  )}
                >
                  {hasImage && (
                    <>
                      <img
                        src={image}
                        alt={cat}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[rgb(8_14_20/0.42)] transition-colors duration-300 group-hover:bg-[rgb(8_14_20/0.58)]"
                      />
                    </>
                  )}

                  <p
                    className={clsx(
                      "relative w-full px-2 py-3 text-center text-[0.66rem] font-semibold uppercase tracking-[0.06em]",
                      hasImage ? "text-white" : "text-ink"
                    )}
                  >
                    {cat}
                  </p>
                </article>
              </Stagger.Item>
            );
          })}
        </Stagger>
      </Container>

      {/* ---------- DESIGN INITIATIVES ---------- */}
      <Container className="mt-14 md:mt-16">
        <SectionHeading kicker="Design" title="Key initiatives" tone="ink" />
        <Initiatives />
      </Container>
    </section>
  );
}