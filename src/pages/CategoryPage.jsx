import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Container from "../components/Container";
import { categories } from "../data/company";
import { categoryProducts } from "../data/media";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <Container className="py-20 text-center">
        <p className="type-body">Category not found.</p>
        <Link to="/" className="type-body mt-4 inline-block text-blue hover:underline">
          Back to home
        </Link>
      </Container>
    );
  }

  const images = categoryProducts[slug] ?? [];

  return (
    <section className="surface-light py-14 md:py-20">
      <Container>
        <Link
          to="/"
          className="type-label mb-8 flex items-center gap-2 transition-colors hover:text-blue"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <h1 className="section-title-dark mb-10">{category.name}</h1>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((src, i) => (
              <div key={i} className="overflow-hidden border border-line">
                <img
                  src={src}
                  alt={`${category.name} ${i + 1}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="type-body text-fg-subtle">Product images coming soon.</p>
        )}
      </Container>
    </section>
  );
}