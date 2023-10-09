export default function CartTable({ cartItems }) {
  return (
    <table>
      <tr>
        <th className="px-4 py-2">Product</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Quantity</th>
      </tr>
      <tbody>
        {cartItems.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="border px-4 py-2">{cartItem.product.title}</td>
            <td className="border px-4 py-2 text-right">{cartItem.product.price}</td>
            <td className="border px-4 py-2 text-right">{cartItem.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
