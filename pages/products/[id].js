import Head from "next/head";
import Title from "@/components/Title";
import { getProducts, getProduct } from "@/lib/products";
export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: {
        // path paramenter must be a string
        id: product.id.toString(),
      },
    })),
    //generates new page while client waits for server to
    //return the page - prevents 404 error for new products
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  const product = await getProduct(id);
  return {
    props: {
      product,
    },
  };
}

export default function ProductPage({ product }) {
  console.log("[ProductPage] render", product);
  return (
    <>
      <Head></Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  );
}
