import Container from "../components/Container";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { pillars, designInitiatives, categories, ownDesignShare } from "../data/company";

export default function Approach() {
  return (
    <section id="approach" className="surface-sky py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="What drives us"
          title="Five commitments behind every order"
          tone="ink"
        />

        <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {pillars.map((pillar, i) => (
            <Stagger.Item key={pillar.title} as="up" className="h-full">
              <article className="card h-full">
                <span className="card-index">0{i + 1}</span>
                <h3 className="card-title pr-6">{pillar.title}</h3>
                <p className="mt-2.5 text-[0.8rem] leading-[1.75] text-fg-muted">
                  {pillar.description}
                </p>
              </article>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading kicker="Design" title="Key initiatives" tone="ink" />
          <Stagger className="mt-8 space-y-4">
            {designInitiatives.map((point, i) => (
              <Stagger.Item key={i} as="up" className="flex gap-4">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-green" />
                <p className="text-[0.82rem] leading-[1.8] text-fg-muted">{point}</p>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>

        <div>
          <SectionHeading kicker="Category mix" title="A diverse range" tone="ink" />

          <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((cat) => (
              <Stagger.Item
                key={cat}
                as="scale"
                className="border border-line bg-white px-3 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink transition-colors duration-300 hover:border-green"
              >
                {cat}
              </Stagger.Item>
            ))}
          </Stagger>

          <Reveal as="up" delay={0.12} className="mt-8 border-t border-line pt-6">
            <p className="text-3xl font-bold leading-none text-green md:text-4xl">
              {ownDesignShare}
            </p>
            <p className="mt-3 max-w-xs text-[0.82rem] leading-[1.75] text-fg-muted">
              of turnover is business booked on Premier&rsquo;s own design.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}