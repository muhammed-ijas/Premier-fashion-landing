import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Globe2, Factory } from "lucide-react";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { production } from "../data/company";
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
            <span className="type-label text-white">{market.name}</span>
            <span className="text-sm font-bold text-green">{market.share}%</span>
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

function Label({ icon: Icon, children }) {
  return (
    <p className="type-label mb-3 flex items-center gap-2">
      {Icon && <Icon size={13} strokeWidth={2.2} className="text-green" />}
      {children}
    </p>
  );
}

/* Every left card splits 50/50 with the same inner gap,
   so the second column starts on the same vertical line in all three. */
const SPLIT = "grid grid-cols-2 gap-5 sm:gap-12";

export default function Production() {
  const { annualOutput, portfolio, portfolioNote, scale, turnover, leadTimes } = production;

  return (
    <section id="production" className="surface-light py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Production"
          title="Scalable capacity, reliable lead times"
          lede={production.statement}
        />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">

          {/* ── left: three cards, all split 50/50 ── */}
          <div className="flex flex-col gap-6">

            {/* 1. annual output | product portfolio */}
            <Stagger className="border border-line bg-white px-5 py-6 md:px-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12">
                <Stagger.Item as="up" className="flex flex-col justify-center">
                  <p className="type-stat-lg">{annualOutput.value}</p>
                  <p className="type-label mt-3 text-ink">{annualOutput.label}</p>
                </Stagger.Item>

                <Stagger.Item as="up">
                  <Label>Product portfolio</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {portfolio.map((item) => (
                      <div key={item.label}>
                        <p className="type-stat">{item.share}</p>
                        <p className="type-small mt-2">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </Stagger.Item>
              </div>
              <p className="type-small mt-5 border-t border-line pt-3 text-fg-subtle">{portfolioNote}</p>
            </Stagger>

            {/* 2. manufacturing scale */}
            <Stagger className="border border-line bg-white px-5 py-6 md:px-6">
              <Label icon={Factory}>Manufacturing scale</Label>
              <div className={SPLIT}>
                {scale.map((item) => (
                  <Stagger.Item key={item.label} as="up">
                    <p className="type-stat">{item.value}</p>
                    <p className="type-small mt-2">{item.label}</p>
                  </Stagger.Item>
                ))}
              </div>
            </Stagger>

            {/* 3. lead times */}
            <Stagger className="border border-line bg-white px-5 py-6 md:px-6">
              <Label icon={Clock}>Reliable lead times</Label>
              <div className={SPLIT}>
                {leadTimes.map((lead) => (
                  <Stagger.Item key={lead.days} as="up">
                    <p className="type-stat whitespace-nowrap">
                      {lead.days}
                      <span className="type-label ml-1.5">days</span>
                    </p>
                    <p className="type-body mt-2 font-medium leading-snug text-ink">{lead.basis}</p>
                    {lead.note && <p className="type-small mt-1">{lead.note}</p>}
                  </Stagger.Item>
                ))}
              </div>
            </Stagger>
          </div>

          {/* ── right: export markets + image with turnover badge ── */}
          <div className="flex flex-col gap-6">
            <div className="surface-blue p-6 md:p-8">
              <Label icon={Globe2}>Global export markets</Label>
              {production.marketsNote && (
                <p className="type-body mb-5">{production.marketsNote}</p>
              )}
              <MarketBars />
            </div>

            <div className="relative min-h-[240px] flex-1 lg:min-h-0">
              {hasMedia(productionImage) ? (
                <img
                  src={productionImage}
                  alt="Finished garments ready for shipment"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border border-line object-cover"
                />
              ) : (
                <div className="type-label absolute inset-0 flex items-center justify-center border border-dashed border-line-strong bg-page">
                  Production image
                </div>
              )}

              {/* business turnover badge */}
              <div className="absolute bottom-0 left-0 max-w-[85%] bg-blue px-5 py-4 md:px-6">
                <p className="type-label text-white/70">{turnover.label}</p>
                <p className="type-stat mt-1.5 text-white">{turnover.value}</p>
                <p className="type-small mt-1.5 text-white/80">{turnover.note}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}