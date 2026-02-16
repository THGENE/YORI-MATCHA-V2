import ProductCard from "@/components/product/ProductCard";
import PreparationSteps from "@/components/matcha/PreparationSteps";

const products = [
  {
    id: "yori-uji",
    name: "YORI UJI",
    subtitle: "Single Garden • Uji, Japon",
    price: 39.0,
    mainImage: "/products/yori-uji.png",
  },
  {
    id: "yori-yame",
    name: "YORI YAME HERITAGE",
    subtitle: "Heritage • Yame, Japon",
    price: 42.0,
    mainImage: "/products/yori-yame.png",
  },
  {
    id: "yori-velvet",
    name: "YORI VELVET",
    subtitle: "Texture velours • Japon",
    price: 45.0,
    mainImage: "/products/yori-velvet.png",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Matcha YORI
        </h1>
        <p className="text-neutral-400 max-w-xl">
          Une sélection de matchas d’exception, pensés comme une expérience
          aussi précise qu’un produit Apple.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16 grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </section>

      <PreparationSteps />
    </main>
  );
}
