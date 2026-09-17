import clsx from "clsx";
import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  lede,
  align = "left",
  tone = "blue",
  plainKicker = false,
  className,
}) {
  const isCenter = align === "center";
  return (
    <div className={clsx("max-w-2xl", isCenter && "mx-auto text-center", className)}>
      {kicker && (
        <Reveal as="fade" duration={0.5}>
          <p className={clsx("eyebrow mb-4", plainKicker && "eyebrow-plain", isCenter && "justify-center")}>
            {kicker}
          </p>
        </Reveal>
      )}
      <Reveal as="up" delay={0.05}>
        <h2 className={clsx("text-balance", tone === "ink" ? "section-title-dark" : "section-title")}>
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal as="up" delay={0.1}>
          <p className="mt-5 text-[0.92rem] leading-[1.8] text-fg-muted">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
