import Container from "../components/Container";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { offices, additionalPresence } from "../data/company";
import { clientLogos, brands } from "../data/media";

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
      <Container className="mt-16">
        <SectionHeading
          kicker="Worldwide reach"
          title="Global presence"
          align="center"
          tone="ink"
          plainKicker
        />

        <Stagger className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {offices.map((office) => (
            <Stagger.Item key={office.country} as="up" className="text-center">
              <p className="card-title">{office.country}</p>
              <p className="mt-2 text-[0.68rem] leading-snug text-fg-subtle">{office.label}</p>
            </Stagger.Item>
          ))}
        </Stagger>

        <Reveal as="up" className="mt-10 border-t border-line pt-8 text-center">
          <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-fg-subtle">
            Additional presence
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {additionalPresence.map((country) => (
              <li key={country} className="text-[0.9rem] font-medium uppercase tracking-[0.06em] text-ink">
                {country}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.82rem] text-fg-muted">
            {locationCount} countries across design, sourcing and production.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}