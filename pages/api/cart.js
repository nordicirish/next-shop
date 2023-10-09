import { fetchJson } from "@/lib/api";

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

async function handleGetCart(req, res) {
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

async function handlePostCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { productId, quantity } = req.body;
  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}
// checks post method and calls appropriate function
export default async function handlCart(req, res) {
  switch (req.method) {
    case "GET":
      return handleGetCart(req, res);
    case "POST":
      return handlePostCart(req, res);
    default:
      res.status(405).end();
  }
}
