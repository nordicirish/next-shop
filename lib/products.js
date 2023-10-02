export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

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
