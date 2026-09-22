import { User } from "lucide-react";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { team } from "../data/company";
import { teamPhotos, hasMedia } from "../data/media";

export default function Team() {
  return (
    <section id="team" className="surface-light pb-8 pt-14 md:py-20">
      <Container>
        <SectionHeading
          kicker="Leadership"
          title="Executive team"
          lede="The people running design, sourcing, production and merchandising across our global network."
        />

        {/* 2 per row on phones, up to 6 on laptops; the last row is centred */}
        <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
          {team.map((member) => {
            const photo = teamPhotos[member.slug];

            return (
              <Stagger.Item
                key={member.slug}
                as="up"
                className="w-[calc(50%-0.375rem)] sm:w-[calc(25%-0.563rem)] md:w-[calc(20%-0.6rem)] lg:w-[calc(16.666%-0.625rem)]"
              >
                <article className="group h-full cursor-pointer">
                  {/* one shared grey ground behind every portrait */}
                  <div className="relative overflow-hidden bg-[linear-gradient(180deg,#9AA3AA_0%,#6B7580_100%)] transition-shadow duration-300 group-hover:shadow-[0_16px_34px_-20px_rgba(11,115,181,0.5)]">
                    {hasMedia(photo) ? (
                      <img
                        src={photo}
                        alt={`${member.name}, ${member.role}`}
                        loading="lazy"
                        className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div
                        className="flex aspect-[3/4] w-full items-center justify-center"
                        role="img"
                        aria-label={`Photograph of ${member.name} to be added`}
                      >
                        <User className="h-7 w-7 text-fg-subtle" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <h3 className="type-label mt-2.5 leading-snug text-ink transition-colors duration-300 group-hover:text-blue">
                    {member.name}
                  </h3>
                  <p className="type-small mt-1">{member.role}</p>
                </article>
              </Stagger.Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}