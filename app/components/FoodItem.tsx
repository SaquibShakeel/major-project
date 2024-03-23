import React from "react";
import AddToCartButton from "./AddToCartButton";

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
        <AddToCartButton id={food.id} name={food.name} price={food.price}/>
      </div>
    </div>
  );
};

export default FoodItem;
