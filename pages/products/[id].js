import Page from "../Page";
import Image from "next/image";
import { ApiError } from "@/lib/api";
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
      <Page title={product.title}>
        <div className="flex flex-col lg:flex-row">
          {/* need to wrap Image in div to prevent flexbox from 
          stretching image */}
          <div>
            <Image
              src={product.pictureUrl}
              alt={product.title}
              width={640}
              height={480}
            />
          </div>
          <div className="flex-1 lg:ml-4">
            <p>{product.description}</p>
            <p className="text-lg font-bold mt-2">{product.price}</p>
          </div>
        </div>
      </Page>
    </>
  );
}
