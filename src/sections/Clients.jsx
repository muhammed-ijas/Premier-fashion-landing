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
                  {/* ratio spacer — fixes the box height off its own width */}
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
                    className="relative mx-2.5 h-20 w-40 shrink-0 overflow-hidden border border-line bg-white transition-colors duration-300 hover:border-green sm:h-24 sm:w-48 md:h-28 md:w-56"
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
                      className="absolute inset-0 m-auto max-h-[62%] max-w-[76%] object-contain"
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