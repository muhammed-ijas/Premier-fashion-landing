import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { products, services, categories } from "../data/company";
import { products as productMedia, categoryImages, hasMedia } from "../data/media";

function CategoryCard({ cat }) {
  const image = categoryImages[cat.slug];
  const hasImage = hasMedia(image);

  return (
    <Link to={`/category/${cat.slug}`}>
      <article
        className={
          "group relative flex aspect-[2/3] items-end overflow-hidden transition-colors duration-300 lg:aspect-[3/4] " +
          (hasImage ? "bg-ink" : "border border-line bg-white")
        }
      >
        {hasImage && (
          <>
            <img
              src={image}
              alt={cat.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[rgb(8_14_20/0.42)] transition-colors duration-300 group-hover:bg-[rgb(8_14_20/0.58)]"
            />
          </>
        )}
        <p
          className={
            "type-label relative w-full px-1.5 py-2.5 text-center leading-snug " +
            (hasImage ? "text-white" : "text-ink")
          }
        >
          {cat.name}
        </p>
      </article>
    </Link>
  );
}

export default function ProductsServices() {
  const row1 = categories.slice(0, 5);
  const row2 = categories.slice(5);

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
                  <div className="type-label flex aspect-[4/5] items-center justify-center border border-dashed border-line-strong bg-white px-3 text-center">
                    {product.name}
                  </div>
                )}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="type-label">0{i + 1}</span>
                  <h3 className="card-title">{product.name}</h3>
                </div>
              </article>
            </Stagger.Item>
          ))}
        </Stagger>

        {/* collections header */}
        <div className="mt-12 border-t border-line pt-10">
          <p className="eyebrow mb-3">Collections</p>
          <h3 className="section-title text-balance">Explore our collections</h3>
          <p className="type-body mt-3 max-w-lg">
            From active and golf wear to uniforms, scrubs, safety wear and bags. Select a collection to view the range.
          </p>
        </div>

        {/* Mobile — 2 per row, last tile centred */}
        <div className="mt-6 lg:hidden">
          <Stagger className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Stagger.Item key={cat.slug} as="scale" className="w-[calc(50%-0.375rem)]">
                <CategoryCard cat={cat} />
              </Stagger.Item>
            ))}
          </Stagger>
        </div>

        {/* Desktop — row 1: 5 items full width, row 2: 4 items centred */}
        <div className="mt-6 hidden lg:block">
          <Stagger className="grid grid-cols-5 gap-3">
            {row1.map((cat) => (
              <Stagger.Item key={cat.slug} as="scale">
                <CategoryCard cat={cat} />
              </Stagger.Item>
            ))}
          </Stagger>
          <Stagger className="mt-3 flex justify-center gap-3">
            {row2.map((cat) => (
              <Stagger.Item key={cat.slug} as="scale" className="w-[18.5%]">
                <CategoryCard cat={cat} />
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
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
                <p className="type-body mt-3">{service.summary}</p>

                {service.items.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                    {service.items.map((item) => (
                      <li key={item} className="type-small flex items-center gap-2">
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