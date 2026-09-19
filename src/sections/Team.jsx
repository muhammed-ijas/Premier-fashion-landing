import { User } from "lucide-react";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { team } from "../data/company";
import { teamPhotos, hasMedia } from "../data/media";

export default function Team() {
  return (
    <section id="team" className="surface-light py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Leadership"
          title="Executive team"
          lede="The people running design, sourcing, production and merchandising across our global network."
        />

        <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
          {team.map((member) => {
            const photo = teamPhotos[member.slug];

            return (
              <Stagger.Item
                key={member.slug}
                as="up"
                className="w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.563rem)] md:w-[calc(20%-0.6rem)] lg:w-[calc(16.666%-0.625rem)]"
              >
                <article className="group h-full">
                  <div className="relative overflow-hidden border border-line bg-page">
                    {hasMedia(photo) ? (
                      <img
                        src={photo}
                        alt={`${member.name}, ${member.role}`}
                        loading="lazy"
                        className="aspect-[3/4] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="flex aspect-[3/4] w-full items-center justify-center"
                        role="img"
                        aria-label={`Photograph of ${member.name} to be added`}
                      >
                        <User className="h-8 w-8 text-fg-subtle" strokeWidth={1.5} />
                      </div>
                    )}

                    {/* green edge on hover, matching the cards elsewhere */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-green transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </div>

                  <h3 className="mt-3.5 text-[0.78rem] font-semibold uppercase leading-snug tracking-[0.05em] text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[0.72rem] leading-[1.6] text-fg-muted">
                    {member.role}
                  </p>
                </article>
              </Stagger.Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}