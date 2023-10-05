import Page from "./Page";
import { getProducts } from "../lib/products";
import ProductCard from "@/components/ProductCard";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
}
function HomePage({ products }) {
  console.log("[HomePage] render", products);
  return (
    <>
      <Page title="Indoor Plants">
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
export default HomePage;
