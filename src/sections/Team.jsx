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
                                className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.563rem)] lg:w-[calc(16.666%-0.625rem)]"
                            >
                                <article className="group h-full cursor-pointer">
                                    <div className="relative overflow-hidden border border-line bg-page transition-shadow duration-300 group-hover:shadow-[0_16px_34px_-20px_rgba(11,115,181,0.5)]">
                                        {hasMedia(photo) ? (
                                            <img
                                                src={photo}
                                                alt={`${member.name}, ${member.role}`}
                                                loading="lazy"
                                                className="aspect-[3/4] w-full object-cover transition-all duration-500 ease-out md:grayscale md:group-hover:scale-[1.06] md:group-hover:grayscale-0"
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

                                    <h3 className="mt-3 text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.04em] text-ink transition-colors duration-300 group-hover:text-blue">
                                        {member.name}
                                    </h3>
                                    <p className="mt-1 text-[0.66rem] leading-[1.55] text-fg-muted">
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