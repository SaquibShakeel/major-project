"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

interface FoodItemProps {
  food: {
    id: string;
    name: string;
    image: string;
    price: number;
    type: string;
  };
}

const FoodItem = ({ food }: FoodItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const {addToCart} = useCart();

  const addToCartHandler = () => {
    addToCart({
      id: food.id,
      name: food.name,
      quantity: quantity,
      price: food.price,
    })
  }
  
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={food.image}
        alt={food.name}
      />
      <div className="p-4">
        <h2 className="text-gray-800 text-xl font-semibold">{food.name}</h2>
        <p className="text-gray-600">&#8377; {food.price.toFixed(2)}</p>
        <p className="text-gray-600">
          {food.type === "Veg" ? "Vegetarian" : "Non-Vegetarian"}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-gray-600">Quantity: </span>
            <select
              className="text-gray-600 px-1 border-gray-600 border-[1px] rounded-md ml-1"
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
              name="quantity"
              id="quantity"
              defaultValue={1}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <button className="text-white px-4 py-2 bg-gray-700 rounded-md" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
