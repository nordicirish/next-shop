import { fetchJson } from "@/lib/api";
import cartItem from "@/strapi-backend/api/cart-item/controllers/cart-item";

// destructuring the CMS_URL from the environment variables
const { CMS_URL } = process.env;
// stripCartItems function to remove unnecessary data from cart items
function stripCartItems(cartItem) {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
}

export default async function handleCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json(cartItems.map(stripCartItems));
  } catch (err) {
    res.status(401).end();
  }
}