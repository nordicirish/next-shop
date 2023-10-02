import { fetchJson } from "./api";
export async function getProduct(id) {
  const product = await fetchJson(`http://localhost:1337/products/${id}`);
  return stripProduct(product);
}

export async function getProducts() {
  const products = await fetchJson("http://localhost:1337/products");
  // use map to fire stripProduct on each product
  return products.map(stripProduct);
}
// Returns only relevant product data
function stripProduct(product) {
  return {
    title: product.title,
    id: product.id,
    description: product.description,
  };
}
