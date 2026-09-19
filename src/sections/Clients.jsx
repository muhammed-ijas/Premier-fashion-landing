import Container from "../components/Container";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import WorldMap from "../components/WorldMap";
import { clientLogos, brands } from "../data/media";

export default function Clients() {
  return (
    <section id="clients" className="surface-light py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Clients"
          title="Trusted by international retail brands"
          align="center"
          plainKicker
        />

        {/* Every tile is the same box whatever the logo's own proportions:
            the frame sets the size, the image is centred inside it and
            never allowed to influence layout. */}
        {clientLogos.length > 0 && (
          <Stagger className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {clientLogos.map((client, i) => (
              <Stagger.Item key={client.logo} as="scale" className="h-full">
                <div className="group relative h-full w-full overflow-hidden border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green hover:shadow-[0_14px_30px_-20px_rgba(11,115,181,0.45)]">
                  <div className="pt-[60%]" aria-hidden="true" />
                  <img
                    src={client.logo}
                    alt={client.name === "Client" ? `Client ${i + 1}` : client.name}
                    loading="lazy"
                    className="absolute inset-0 m-auto max-h-[62%] max-w-[76%] object-contain"
                  />
                </div>
              </Stagger.Item>
            ))}
          </Stagger>
        )}
      </Container>

      {/* ---------- BRAND PARTNERS ----------
          Six marks, so a static row reads better than a marquee —
          nothing moves, each gets a numbered frame and its name. */}
      {brands.length > 0 && (
        <Container className="mt-16 md:mt-20">
          <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-10 md:flex-row md:items-end">
            <Reveal as="up">
              <p className="eyebrow mb-3">Our brands</p>
              <h2 className="section-title text-balance">Brand partners</h2>
            </Reveal>

            <Reveal as="up" delay={0.08}>
              <p className="max-w-xs text-[0.8rem] leading-[1.75] text-fg-muted">
                Labels developed and produced across the Premier network.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {brands.map((brand, i) => {
              const named = brand.name !== "Brand partner";

              return (
                <Stagger.Item key={brand.logo} as="up" className="h-full">
                  <div className="group relative h-full w-full overflow-hidden border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green hover:shadow-[0_14px_30px_-20px_rgba(11,115,181,0.45)]">
                    <div className="pt-[60%]" aria-hidden="true" />
                    <img
                      src={brand.logo}
                      alt={named ? brand.name : `Brand partner ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 m-auto max-h-[62%] max-w-[76%] object-contain"
                    />
                  </div>
                </Stagger.Item>
              );
            })}
          </Stagger>
        </Container>
      )}

      {/* global presence */}
      <Container className="mt-16">
        <SectionHeading
          kicker="Worldwide reach"
          title="Global presence"
          align="center"
          tone="ink"
          plainKicker
        />

        <Reveal as="fade" delay={0.12} className="mx-auto mt-8 max-w-5xl">
          <WorldMap />
        </Reveal>
      </Container>
    </section>
  );
}