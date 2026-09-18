import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import { processSteps } from "../data/company";
import { processImages, hasMedia } from "../data/media";

const TOTAL = processSteps.length;

/**
 * Connector geometry. The SVG uses a 100x100 viewBox with
 * preserveAspectRatio="none", so every coordinate is a percentage of
 * the container and the dotted line stays attached to the cards at any
 * width. Odd cards sit lower, so the line steps down and back up.
 */
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
  const start = index / (TOTAL + 0.8);

  const opacity = useTransform(progress, [start - 0.1, start + 0.05], [0.45, 1], {
    clamp: true,
  });

  const image = processImages[step.slug];

  return (
    <motion.article
      style={{ opacity }}
      className={clsx(
        "group relative mx-auto w-full max-w-[132px]",
        index % 2 === 0 ? "md:-translate-y-8" : "md:translate-y-8"
      )}
     
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {hasMedia(image) ? (
          <motion.img
            src={image}
            alt={step.name}
            loading="lazy"
           
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-white/10" />
        )}

      
      </div>

      <div className="mt-3 text-center">
        <span className="text-[0.58rem] font-semibold tracking-[0.14em] text-green">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-1 text-[0.66rem] font-semibold uppercase leading-snug tracking-[0.05em] text-white">
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
    offset: ["start 0.85", "end 0.7"],
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
          {/* static dotted connector — desktop only */}
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