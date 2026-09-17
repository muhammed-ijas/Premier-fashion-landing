import { CheckCircle2 } from "lucide-react";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { products, services } from "../data/company";
import { products as productMedia, hasMedia } from "../data/media";

export default function ProductsServices() {
  return (
    <section id="products-services" className="surface-tint py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Products"
          title="What we make"
          lede="A diverse range across Men's, Women's and Kids' wear — bottoms, jackets, tops, t-shirts, polos, shirts, dresses and denim."
        />

        <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product, i) => (
            <Stagger.Item key={product.slug} as="up">
              <article>
                {hasMedia(productMedia[product.slug]) ? (
                  <img
                    src={productMedia[product.slug]}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full border border-line object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-line-strong bg-white px-3 text-center text-[0.65rem] uppercase tracking-[0.1em] text-fg-subtle">
                    {product.name}
                  </div>
                )}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[0.65rem] font-medium text-fg-subtle">0{i + 1}</span>
                  <h3 className="card-title">{product.name}</h3>
                </div>
              </article>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>

      <Container className="mt-16">
        <SectionHeading
          kicker="Services"
          title="How we make it"
          lede="Four integrated capabilities that take a concept from sketch to shipment."
        />

        <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Stagger.Item key={service.slug} as="up" className="h-full">
              <article className="card h-full">
                <span className="card-index">0{i + 1}</span>
                <h3 className="card-title pr-8">{service.name}</h3>
                <p className="mt-3 text-[0.82rem] leading-[1.8] text-fg-muted">{service.summary}</p>

                {service.items.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[0.78rem] text-fg-muted">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-green" strokeWidth={2.2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Stagger.Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
