"use client";
import React from "react";
import { CartItemInterface, useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import axios from "axios";

const Cart = () => {
  const { state } = useCart();

  let totalAmount = 0;

  state.items.forEach((item: CartItemInterface) => {
    totalAmount += item.price * item.quantity;
  });

  const confirmOrder = () => {
    axios.post("/api/client/order", {
      items: state.items
    }).then(res => {
      console.log(res);
      
    })
    
  }
  return (
    <div className="flex flex-col items-center justify-start py-10">
      <div className="bg-gray-400 bg-opacity-40 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg p-5 flex flex-col items-center justify-start w-[60%]">
        <h2 className="font-semibold text-2xl">Cart</h2>
        <hr className="w-full my-2" />
        {state.items.map((item: CartItemInterface, index: number) => (
          <CartItem key={index} cartItem={item} />
        ))}
        <hr className="w-full" />
        <div className="flex items-center justify-center w-full py-2 px-4">
          <div className="flex-1 flex items-center justify-start">
            <p className="font-semibold text-lg">Total</p>
          </div>
          <div className="flex items-end justify-center">
            <p className="font-semibold text-lg">{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <button className="rounded-md py-3 px-4 text-xl bg-blue-400 text-gray-100 font-bold hover:bg-blue-500" onClick={confirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
