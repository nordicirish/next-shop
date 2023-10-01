import Head from "next/head";
import Title from "../components/Title";
import { getProducts } from "../lib/products";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    //incrmental static regeneration only works in production
    // reloads data every 30 seconds
    revalidate: 30,
  };
}
function HomePage({ products }) {
  console.log("[HomePage] render", products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
export default HomePage;
