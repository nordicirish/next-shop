import { fetchJson } from "./api";
const CMS_URL = process.env.CMS_URL;
export async function getProduct(id) {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
}

export async function getProducts() {
  const products = await fetchJson(`${CMS_URL}/products`);
  // use map to fire stripProduct on each product
  return products.map(stripProduct);
}
// Returns only relevant product data
function stripProduct(product) {
  return {
    title: product.title,
    id: product.id,
    description: product.description,
    price: "$" + product.price.toFixed(2),
  };
}
