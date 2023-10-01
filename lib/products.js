// Returns only relevant product data
function stripProduct(product) {
  return {
    title: product.title,
    id: product.id,
  };
}

export async function getProducts() {
  const response = await fetch("http://localhost:1337/products");
  const products = await response.json();
  // use map to fire stripProduct on each product
  return products.map(stripProduct);
}
