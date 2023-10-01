import Head from "next/head";
import Title from "../components/Title";
import { getProducts } from "../lib/products";
import { useEffect, useState } from "react";

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
function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // need to fire an async function inside useEffect
    // because useEffect cannot use await directly
    async function loadProducts() {
      const products = await getProducts();
      setProducts(products);
    }
    loadProducts();
  }, []);
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
