import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { pillars, designInitiatives } from "../data/company";
import { EASE } from "../lib/motion";

/* ---------- WHAT DRIVES US ----------
   Numbered plates on a tinted ground. The number sits large and pale
   behind the title, and the whole plate shifts to white on hover —
   no borders, no growing rules. */
function Pillars() {
  return (
    <Stagger className="mt-8 grid grid-cols-2 gap-px overflow-hidden bg-hairline lg:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
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

      {/* ---------- DESIGN INITIATIVES ---------- */}
      <Container className="mt-14 md:mt-16">
        <SectionHeading kicker="Design" title="Key initiatives" tone="ink" />
        <Initiatives />
      </Container>
    </section>
  );
}