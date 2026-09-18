import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Stagger from "../components/Stagger";
import { production, groupStats } from "../data/company";
import { productionImage, hasMedia } from "../data/media";
import { EASE } from "../lib/motion";

function MarketBars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="space-y-2.5">
      {production.markets.map((market, i) => (
        <div key={market.name}>
          <div className="flex items-baseline justify-between">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.06em] text-white">
              {market.name}
            </span>
            <span className="text-[0.7rem] font-bold text-green">{market.share}%</span>
          </div>
          <div className="mt-1 h-[3px] w-full bg-white/15">
            <motion.span
              className="block h-full bg-green"
              initial={{ width: 0 }}
              animate={inView ? { width: `${market.share}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Production() {
  const turnover = groupStats.find((s) => s.label === "Group turnover");

  return (
    <section id="production" className="surface-light py-10 md:py-12">
      <Container>
        <Reveal as="up" className="max-w-2xl">
          <p className="eyebrow mb-2.5">Production</p>
          <h2 className="section-title text-balance">Vast capacity, short lead times</h2>
        </Reveal>

        {/* items-stretch + h-full on both columns keeps the two bottom
            edges on the same line whatever the image does */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          {/* left: capacity figures, then the image filling what remains */}
          <div className="flex flex-col">
            <Stagger className="grid grid-cols-3 gap-px border border-line bg-hairline">
              {production.volumes.map((volume) => (
                <Stagger.Item key={volume.label} as="up" className="bg-white px-3 py-4">
                  <p className="text-xl font-bold leading-none text-blue md:text-2xl">
                    {volume.value}
                    <span className="ml-1 align-top text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle">
                      M
                    </span>
                  </p>
                  <p className="mt-1.5 text-[0.62rem] font-semibold uppercase leading-snug tracking-[0.05em] text-ink">
                    {volume.label}
                  </p>
                </Stagger.Item>
              ))}
            </Stagger>

            <p className="mt-2 text-[0.6rem] text-fg-subtle">
              {production.volumeUnit} — {production.volumeNote.toLowerCase()}
            </p>

            <div className="relative mt-4 min-h-[150px] flex-1">
              {hasMedia(productionImage) ? (
                <img
                  src={productionImage}
                  alt="Finished garments ready for shipment"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border border-line object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center border border-dashed border-line-strong bg-page text-[0.6rem] uppercase tracking-[0.1em] text-fg-subtle">
                  Production image
                </div>
              )}

              {turnover && (
                <div className="absolute bottom-0 left-0 bg-blue px-4 py-3">
                  <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                    {turnover.label} {turnover.note}
                  </p>
                  <p className="mt-0.5 text-base font-bold leading-none text-white md:text-lg">
                    {turnover.value}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* right: data panel */}
          <div className="surface-blue flex h-full flex-col justify-center p-5">
            <p className="mb-3 flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
              <Clock size={11} strokeWidth={2.2} className="text-green" />
              Lead times
            </p>

            <Stagger className="space-y-2">
              {production.leadTimes.map((lead) => (
                <Stagger.Item
                  key={lead.days}
                  as="up"
                  className="flex items-baseline gap-3 border-b border-line pb-2"
                >
                  <span className="w-[3.6rem] shrink-0 text-base font-bold leading-none text-green">
                    {lead.days}
                    <span className="ml-1 text-[0.52rem] font-medium uppercase tracking-[0.08em] text-white/50">
                      days
                    </span>
                  </span>
                  <span className="text-[0.68rem] leading-snug text-fg-muted">
                    {lead.basis}
                  </span>
                </Stagger.Item>
              ))}
            </Stagger>

            <p className="mb-2.5 mt-5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
              Export markets
            </p>
            <MarketBars />
          </div>
        </div>
      </Container>
    </section>
  );
}