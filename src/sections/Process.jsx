import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import { processSteps } from "../data/company";
import { processImages, hasMedia } from "../data/media";
import { EASE } from "../lib/motion";

const TOTAL = processSteps.length;
const cx = (i) => ((i + 0.5) / TOTAL) * 100;
const cy = (i) => (i % 2 === 0 ? 32 : 68);

const connectorPath = processSteps
  .map((_, i) =>
    i === 0
      ? `M ${cx(0)} ${cy(0)}`
      : `C ${cx(i - 1) + 8} ${cy(i - 1)}, ${cx(i) - 8} ${cy(i)}, ${cx(i)} ${cy(i)}`
  )
  .join(" ");

function StepCard({ step, index, progress }) {
  // Each card has its own slice of the scroll range: it rises, settles
  // and its rule fills as that slice passes. Works the same on phones,
  // where the cards are stacked two-up.
  const start = index / (TOTAL + 1.2);
  const mid = start + 0.16;

  const y = useTransform(progress, [start, mid], [26, 0], { clamp: true });
  const opacity = useTransform(progress, [start, mid], [0.25, 1], { clamp: true });
  const scale = useTransform(progress, [start, mid], [0.94, 1], { clamp: true });
  const rule = useTransform(progress, [start, mid + 0.06], [0, 1], { clamp: true });

  const image = processImages[step.slug];

  return (
    <motion.article
      style={{ y, opacity, scale }}
      className={clsx(
        "group relative mx-auto w-full max-w-[132px]",
        index % 2 === 0 ? "md:-translate-y-8" : "md:translate-y-8"
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {hasMedia(image) ? (
          <img
            src={image}
            alt={step.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-white/10" />
        )}
      </div>

      {/* rule fills as this step's turn arrives */}
      <div className="relative mx-auto mt-3 h-[2px] w-8 bg-white/20">
        <motion.span
          style={{ scaleX: rule }}
          className="absolute inset-0 origin-left bg-green"
        />
      </div>

      <div className="mt-2.5 text-center">
        <span className="text-[0.56rem] font-semibold tracking-[0.14em] text-green">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-1 text-[0.64rem] font-semibold uppercase leading-snug tracking-[0.05em] text-white">
          {step.name}
        </h3>
      </div>
    </motion.article>
  );
}

export default function Process() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="surface-blue py-14 md:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <Reveal as="up" className="max-w-xl">
            <p className="eyebrow mb-3">Service &amp; support</p>
            <h2 className="section-title text-balance">From concept to container</h2>
          </Reveal>

          <Reveal as="up" delay={0.08}>
            <p className="max-w-sm text-[0.82rem] leading-[1.75] text-fg-muted">
              Six stages, one vendor — every step handled in-house or by partners we
              have worked with for years.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-10 md:mt-16">
          {/* dotted connector, desktop only */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <path
              d={connectorPath}
              fill="none"
              stroke="rgb(255 255 255 / 0.35)"
              strokeWidth="1.5"
              strokeDasharray="1 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6 md:gap-x-6">
            {processSteps.map((step, i) => (
              <StepCard key={step.slug} step={step} index={i} progress={progress} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}