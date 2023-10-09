import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
import { useQuery } from "react-query";
export default function CartPage() {
  const query = useQuery("cartItems", () => fetchJson("/api/cart"));
  const cartItems = query.data;
  console.log("[CartPage]", cartItems);
  return (
    <Page title="Cart">
      <p>Cart</p>
    </Page>
  );
}
