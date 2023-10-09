//helper function to format currency
function formatCurrency(value) {
  return "$" + value.toFixed(2);
}
//helper function to build cart totals
//takes in cartItems array and returns an object with items and total
function buildCart(cartItems) {
  let total = 0;
  const items = [];
  for (const cartItem of cartItems) {
    const itemTotal = cartItem.quantity * cartItem.product.price;
    total += itemTotal;
    items.push({ ...cartItem, total: itemTotal });
  }
  return { items, total };
}

export default function CartTable({ cartItems }) {
  const cart = buildCart(cartItems);
  return (
    <table>
      <tr>
        <th className="px-4 py-2">Product</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Quantity</th>
        <th className="px-4 py-2">Total</th>
      </tr>
      <tbody>
        {cart.items.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="border px-4 py-2">{cartItem.product.title}</td>
            <td className="border px-4 py-2 text-right">
              {cartItem.product.price}
            </td>
            <td className="border px-4 py-2 text-right">{cartItem.quantity}</td>
            <td className="border px-4 py-2 text-right">
              {formatCurrency(cartItem.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="border px-4 py-2" colSpan="3">
            Total
          </th>
          <th className="border px-4 py-2 text-right">
            {formatCurrency(cart.total)}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}
