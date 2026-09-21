import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Globe2 } from "lucide-react";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { production, groupStats } from "../data/company";
import { productionImage, hasMedia } from "../data/media";
import { EASE } from "../lib/motion";

function MarketBars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="space-y-4">
      {production.markets.map((market, i) => (
        <div key={market.name}>
          <div className="flex items-baseline justify-between">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white">
              {market.name}
            </span>
            <span className="text-[0.8rem] font-bold text-green">{market.share}%</span>
          </div>
          <div className="mt-2 h-[4px] w-full bg-white/15">
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
  const turnover = groupStats.find((s) => s.label === "Group Turnover");

  return (
    <section id="production" className="surface-light py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Production"
          title="Vast capacity, short lead times"
          lede={production.statement}
        />

        {/* items-stretch keeps both columns' bottom edges aligned */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">

          {/* ── left: capacity figures + image ── */}
          <div className="flex flex-col">
            <Stagger className="grid grid-cols-3 gap-px border border-line bg-line">
              {production.volumes.map((volume) => (
                <Stagger.Item key={volume.label} as="up" className="bg-white px-4 py-6 md:px-6">
                  <p className="text-2xl font-bold leading-none text-blue md:text-3xl">
                    {volume.value}
                    <span className="ml-1 align-top text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle">
                      M
                    </span>
                  </p>
                  <p className="mt-3 text-[0.66rem] font-semibold uppercase leading-snug tracking-[0.05em] text-ink md:text-[0.72rem]">
                    {volume.label}
                  </p>
                </Stagger.Item>
              ))}
            </Stagger>

            <p className="mt-3 text-[0.68rem] text-fg-subtle">
              {production.volumeUnit} — {production.volumeNote.toLowerCase()}
            </p>

            <div className="relative mt-6 min-h-[240px] flex-1 md:min-h-[280px]">
              {hasMedia(productionImage) ? (
                <img
                  src={productionImage}
                  alt="Finished garments ready for shipment"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border border-line object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center border border-dashed border-line-strong bg-page text-[0.65rem] uppercase tracking-[0.1em] text-fg-subtle">
                  Production image
                </div>
              )}

              {turnover && (
                <div className="absolute bottom-0 left-0 bg-blue px-5 py-4 md:px-6">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/70">
                    {turnover.label} {turnover.note}
                  </p>
                  <p className="mt-1.5 text-xl font-bold leading-none text-white md:text-2xl">
                    {turnover.value}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── right: lead times + export markets ── */}
          <div className="surface-blue flex h-full flex-col justify-center p-6 md:p-8">
            <p className="mb-4 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
              <Clock size={13} strokeWidth={2.2} className="text-green" />
              Lead times
            </p>

            <Stagger className="space-y-3">
              {production.leadTimes.map((lead) => (
                <Stagger.Item
                  key={lead.days}
                  as="up"
                  className="flex items-baseline gap-4 border-b border-white/10 pb-3"
                >
                  <span className="w-[4.5rem] shrink-0 text-xl font-bold leading-none text-green">
                    {lead.days}
                    <span className="ml-1 text-[0.58rem] font-medium uppercase tracking-[0.08em] text-white/50">
                      days
                    </span>
                  </span>
                  <span className="text-[0.8rem] leading-snug text-fg-muted">
                    {lead.basis}
                  </span>
                </Stagger.Item>
              ))}
            </Stagger>

            <p className="mb-4 mt-9 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
              <Globe2 size={13} strokeWidth={2.2} className="text-green" />
              Export markets
            </p>
            <MarketBars />
          </div>
        </div>
      </Container>
    </section>
  );
}