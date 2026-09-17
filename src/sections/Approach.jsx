import Container from "../components/Container";
import Stagger from "../components/Stagger";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { pillars, designInitiatives, categories, ownDesignShare } from "../data/company";
import { categoryImages, hasMedia } from "../data/media";

// "T-Shirts" -> "t-shirts", matching the keys in media.js
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Approach() {
  return (
    <section id="approach" className="surface-sky py-16 md:py-20">
      {/* ---------- COMMITMENTS ---------- */}
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

      {/* ---------- CATEGORY MIX ---------- */}
      <Container className="mt-16 md:mt-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading kicker="Category mix" title="A diverse range" tone="ink" />

          <Reveal as="up" delay={0.1} className="shrink-0">
            <p className="text-3xl font-bold leading-none text-green md:text-4xl">
              {ownDesignShare}
            </p>
            <p className="mt-2 max-w-[15rem] text-[0.78rem] leading-[1.7] text-fg-muted">
              of turnover is business booked on Premier&rsquo;s own design.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const image = categoryImages[slugify(cat)];
            const hasImage = hasMedia(image);

            return (
              <Stagger.Item key={cat} as="scale">
                <article
                  className={`group relative flex aspect-[3/4] items-end overflow-hidden border border-line transition-colors duration-300 hover:border-green ${hasImage ? "bg-ink" : "bg-white"
                    }`}
                >
                  {hasImage && (
                    <>
                      <img
                        src={image}
                        alt={cat}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                      />
                      {/* flat wash so the label stays legible on any photo */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[rgb(8_14_20/0.42)] transition-colors duration-300 group-hover:bg-[rgb(8_14_20/0.58)]"
                      />
                    </>
                  )}

                  <p
                    className={`relative w-full px-3 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.08em] ${hasImage ? "text-white" : "text-ink"
                      }`}
                  >
                    {cat}
                  </p>
                </article>
              </Stagger.Item>
            );
          })}
        </Stagger>
      </Container>

      {/* ---------- DESIGN INITIATIVES ---------- */}
      <Container className="mt-16 md:mt-20">
        <SectionHeading kicker="Design" title="Key initiatives" tone="ink" />

        <Stagger className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {designInitiatives.map((point, i) => (
            <Stagger.Item key={i} as="up" className="h-full">
              <article className="card h-full">
                <span className="card-index">0{i + 1}</span>
                <p className="pr-8 text-[0.82rem] leading-[1.8] text-fg-muted">{point}</p>
              </article>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}