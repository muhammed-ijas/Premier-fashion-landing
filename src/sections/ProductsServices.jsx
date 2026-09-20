import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Stagger from "../components/Stagger";
import SectionHeading from "../components/SectionHeading";
import { products, services, categories, ownDesignShare } from "../data/company";
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
            "relative w-full px-1.5 py-2.5 text-center text-[0.6rem] font-semibold uppercase tracking-[0.05em] " +
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

        {/* category mix header */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3">Category mix</p>
            <h3 className="section-title text-balance">A diverse range</h3>
          </div>
          <div className="shrink-0">
            <p className="text-2xl font-bold leading-none text-green md:text-3xl">
              {ownDesignShare}
            </p>
            <p className="mt-1.5 max-w-[15rem] text-[0.75rem] leading-[1.7] text-fg-muted">
              of turnover is business booked on Premier&rsquo;s own design.
            </p>
          </div>
        </div>

        {/* Mobile — 3 cols, 9 items = exactly 3 clean rows */}
        <div className="mt-6 lg:hidden">
          <Stagger className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <Stagger.Item key={cat.slug} as="scale">
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