import Container from "../components/Container";
import Reveal from "../components/Reveal";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { about, company, highlights, offices, additionalPresence, ownDesignShare } from "../data/company";
import { about as aboutMedia, hasMedia } from "../data/media";

export default function About() {
  const locationCount = offices.length + additionalPresence.length;

  const stats = [
    { value: company.founded, label: "Founded" },
    { value: locationCount, label: "Locations" },
    { value: "25+", label: "Years" },
  ];

  return (
       <section id="about" className="surface-light py-10 md:py-14">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading kicker="Who we are" title="A one-stop shop, built over two decades" />

          <Reveal as="up" delay={0.1}>
            <p className="mt-5 max-w-lg text-[0.88rem] leading-[1.85] text-fg-muted">{about.intro}</p>
          </Reveal>
          <Reveal as="up" delay={0.16}>
            <p className="mt-3 max-w-lg text-[0.88rem] leading-[1.85] text-fg-muted">{about.today}</p>
          </Reveal>

          <Reveal as="up" delay={0.22}>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-xl font-bold leading-none text-blue md:text-2xl">{stat.value}</dd>
                  <dt className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-fg-subtle md:text-[0.65rem]">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal as="left" className="order-1 lg:order-2">
          {hasMedia(aboutMedia.overview) ? (
            <img
              src={aboutMedia.overview}
              alt="Premier Fashion facility"
              loading="lazy"
              className="aspect-[5/4] w-full border border-line object-cover"
            />
          ) : (
            <div className="flex aspect-[5/4] items-center justify-center border border-dashed border-line-strong bg-page text-[0.7rem] uppercase tracking-[0.1em] text-fg-subtle">
              Image placeholder
            </div>
          )}
        </Reveal>
      </Container>

      <Container className="mt-14">
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {highlights.map((point, i) => (
            <Stagger.Item key={point.title} as="up" className="h-full">
              <article className="card h-full">
                <span className="card-index">0{i + 1}</span>
                <h3 className="card-title pr-8">{point.title}</h3>
                <p className="mt-3 text-[0.82rem] leading-[1.8] text-fg-muted">{point.body}</p>
              </article>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
