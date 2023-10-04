import Link from "next/link";
export default function ProductCard({ product }) {
  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <img src={product.pictureUrl} alt={product.title} />
        <div className="p-2 flex justify-between items-baseline">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <span>{product.price}</span>
        </div>
      </Link>
    </div>
  );
}
