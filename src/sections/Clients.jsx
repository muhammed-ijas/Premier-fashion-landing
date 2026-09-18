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

        <Reveal as="fade" delay={0.12} className="mx-auto mt-8 max-w-5xl">
          <WorldMap />
        </Reveal>

      </Container>
    </section>
  );
}