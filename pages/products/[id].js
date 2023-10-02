import Head from "next/head";
import { ApiError } from "@/lib/api";
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
  try {
    const product = await getProduct(id);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    // return 404 page if product not found
    if (error instanceof ApiError && error.status === 404) {
      return {
        notFound: true,
      };
    }
    // a
    // throw error if it's a different error
    // like cms is down
    throw error;
  }
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
