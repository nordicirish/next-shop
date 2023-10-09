import { useState } from "react";
import Button from "@/components/Button";

export default function AddToCartWidget({ productId }) {
   // quantity is initialized to 1 
  const [quantity, setQuantity] = useState(1);
    const handleClick = async () => {
      console.log("Adding to cart", productId, quantity);
    };
    return (
      <div className="p-y2">
        <input
          type="number"
          min="1"
          className="border rounded px-3 py-1 mr-2 w-16 text-right"
          value={quantity.toString()}
          onChange={(event) => setQuantity(parseInt(event.target.value))}
        />
        <Button className="ml-4" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    );
  };

