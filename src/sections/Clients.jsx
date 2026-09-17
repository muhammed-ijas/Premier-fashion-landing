import Container from "../components/Container";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { offices, additionalPresence } from "../data/company";
import { clientLogos, brands } from "../data/media";
import { MapPin } from "lucide-react";

export default function Clients() {
  const locationCount = offices.length + additionalPresence.length;

  return (
    <section id="clients" className="surface-light py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Clients"
          title="Trusted by international retail brands"
          align="center"
          plainKicker
        />

        {/* six per row, five clean rows of thirty */}
        {clientLogos.length > 0 && (
          <Stagger className="mt-10 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {clientLogos.map((client, i) => (
              <Stagger.Item key={client.logo} as="scale">
                <div className="flex aspect-[5/3] items-center justify-center border border-line bg-white p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-green hover:shadow-[0_14px_30px_-20px_rgba(11,115,181,0.45)]">
                  <img
                    src={client.logo}
                    alt={client.name === "Client" ? `Client ${i + 1}` : client.name}
                    loading="lazy"
                    className="max-h-[72%] max-w-[85%] object-contain"
                  />
                </div>
              </Stagger.Item>
            ))}
          </Stagger>
        )}
      </Container>

      {/* brand partners — continuous strip */}
      {brands.length > 0 && (
        <>
          <Container className="mt-16">
            <SectionHeading
              kicker="Our brands"
              title="Brand partners"
              align="center"
              plainKicker
            />
          </Container>

          <Container className="mt-8">
            <div className="marquee">
              <div className="marquee-track">
                {[...brands, ...brands].map((brand, i) => (
                  <div
                    key={`${brand.logo}-${i}`}
                    className="mx-2.5 flex h-24 w-52 shrink-0 items-center justify-center border border-line bg-white px-6 transition-colors duration-300 hover:border-green md:h-28 md:w-60"
                  >
                    <img
                      src={brand.logo}
                      alt={
                        brand.name === "Brand partner"
                          ? `Brand partner ${(i % brands.length) + 1}`
                          : brand.name
                      }
                      loading="lazy"
                      aria-hidden={i >= brands.length}
                      className="max-h-[70%] max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </>
      )}

      {/* global presence */}
      {/* global presence */}
      <Container className="mt-16">
        <SectionHeading
          kicker="Worldwide reach"
          title="Global presence"
          align="center"
          tone="ink"
          plainKicker
        />
        <Reveal as="fade" delay={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-center text-[0.85rem] leading-[1.7] text-fg-muted">
            {locationCount} locations across design, sourcing and production.
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {offices.map((office) => (
            <Stagger.Item key={office.country} as="up" className="h-full">
              <article className="card flex h-full flex-col items-center py-7 text-center">
                <span className="icon-chip mb-4">
                  <MapPin size={16} strokeWidth={2} />
                </span>
                <h3 className="card-title">{office.country}</h3>
                <p className="mt-1.5 text-[0.7rem] text-fg-muted">{office.city}</p>
                <p className="mt-1 text-[0.62rem] leading-snug text-fg-subtle">{office.label}</p>
              </article>
            </Stagger.Item>
          ))}
        </Stagger>

        {additionalPresence.length > 0 && (
          <div className="mx-auto mt-8 max-w-5xl">
            <Reveal as="up">
                          <div className="mb-5 flex items-center justify-center gap-4">
                <span className="h-[2px] w-8 shrink-0 bg-green" />
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-fg-subtle">
                  Additional presence
                </p>
                <span className="h-[2px] w-8 shrink-0 bg-green" />
              </div>
            </Reveal>

                       <Stagger className="mx-auto grid max-w-2xl grid-cols-3 gap-3">
              {additionalPresence.map((place) => (
                <Stagger.Item key={place} as="up">
                  <div className="flex items-center justify-center gap-2 border border-line bg-white px-3 py-4 text-center transition-colors duration-300 hover:border-green">
                    <MapPin size={13} strokeWidth={2} className="shrink-0 text-green" />
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink">
                      {place}
                    </span>
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </div>
        )}
      </Container>
    </section>
  );
}