import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Globe2, Factory, TrendingUp } from "lucide-react";
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

function Label({ icon: Icon, children }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
      {Icon && <Icon size={13} strokeWidth={2.2} className="text-green" />}
      {children}
    </p>
  );
}

export default function Production() {
  const { annualOutput, portfolio, portfolioNote, scale, turnover } = production;

  return (
    <section id="production" className="surface-light py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Production"
          title="Scalable capacity, reliable lead times"
          lede={production.statement}
        />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">

          {/* ── left: figures + image ── */}
          <div className="flex flex-col gap-6">

            {/* annual output + product portfolio */}
            <Stagger className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-[0.9fr_1.4fr]">
              <Stagger.Item as="up" className="flex flex-col justify-center bg-white px-5 py-6 md:px-6">
                <p className="text-3xl font-bold leading-none text-blue md:text-4xl">
                  {annualOutput.value}
                </p>
                <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink">
                  {annualOutput.label}
                </p>
              </Stagger.Item>

              <Stagger.Item as="up" className="bg-white px-5 py-6 md:px-6">
                <Label>Product portfolio</Label>
                <div className="grid grid-cols-2 gap-4">
                  {portfolio.map((item) => (
                    <div key={item.label}>
                      <p className="text-2xl font-bold leading-none text-blue md:text-3xl">{item.share}</p>
                      <p className="mt-2 text-[0.72rem] leading-snug text-fg-muted">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-line pt-3 text-[0.7rem] leading-[1.6] text-fg-subtle">
                  {portfolioNote}
                </p>
              </Stagger.Item>
            </Stagger>

            {/* manufacturing scale + turnover */}
            <Stagger className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
              <Stagger.Item as="up" className="bg-white px-5 py-6 md:px-6">
                <Label icon={Factory}>Manufacturing scale</Label>
                <div className="grid grid-cols-2 gap-4">
                  {scale.map((item) => (
                    <div key={item.label}>
                      <p className="text-2xl font-bold leading-none text-blue">{item.value}</p>
                      <p className="mt-2 text-[0.72rem] leading-snug text-fg-muted">{item.label}</p>
                    </div>
                  ))}
                </div>
              </Stagger.Item>

              <Stagger.Item as="up" className="bg-white px-5 py-6 md:px-6">
                <Label icon={TrendingUp}>{turnover.label}</Label>
                <p className="text-2xl font-bold leading-none text-blue">{turnover.value}</p>
                <p className="mt-2 text-[0.72rem] leading-[1.6] text-fg-muted">{turnover.note}</p>
              </Stagger.Item>
            </Stagger>

            {/* image fills the remaining height */}
            <div className="relative min-h-[220px] flex-1 md:min-h-[260px]">
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
            </div>
          </div>

          {/* ── right: lead times + export markets ── */}
          <div className="surface-blue flex h-full flex-col justify-center p-6 md:p-8">
            <Label icon={Clock}>Reliable lead times</Label>

            <Stagger className="space-y-4">
              {production.leadTimes.map((lead) => (
                <Stagger.Item
                  key={lead.days}
                  as="up"
                  className="flex items-baseline gap-4 border-b border-white/10 pb-4"
                >
                  <span className="w-[6.5rem] shrink-0 text-xl font-bold leading-none text-green">
                    {lead.days}
                    <span className="ml-1 text-[0.58rem] font-medium uppercase tracking-[0.08em] text-white/50">
                      days
                    </span>
                  </span>
                  <span>
                    <span className="block text-[0.8rem] leading-snug text-white">{lead.basis}</span>
                    {lead.note && (
                      <span className="mt-1 block text-[0.7rem] leading-snug text-fg-muted">{lead.note}</span>
                    )}
                  </span>
                </Stagger.Item>
              ))}
            </Stagger>

            <div className="mt-9">
              <Label icon={Globe2}>Global export markets</Label>
              <MarketBars />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}