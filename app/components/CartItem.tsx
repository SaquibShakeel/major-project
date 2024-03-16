import React from "react";
import { CartItemInterface, useCart } from "../context/CartContext";

interface CartItemProps {
  cartItem: CartItemInterface;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="w-full flex items-center justify-between py-2 px-4 border-b border-dashed border-gray-400">
      <div className="w-[50%] flex flex-col items-start justify-start">
        <h3 className="font-semibold text-lg">{cartItem.name}</h3>
        <p className="text-sm">
          {cartItem.price} x {cartItem.quantity}
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="rounded-md ring-2 ring-white bg-transparent px-3 text-xl"
          onClick={() => addToCart({
            ...cartItem,
            quantity: 1
          })}
        >
          +
        </button>
        <button
          className="rounded-md ring-2 ring-white bg-transparent px-3 text-xl"
          onClick={() => removeFromCart(cartItem.id)}
        >
          -
        </button>
      </div>
      <div className="flex items-end justify-center">
        <p className="font-semibold text-lg">
          {cartItem.price * cartItem.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
