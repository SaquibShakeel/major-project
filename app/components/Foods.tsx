"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import FoodItem from "./FoodItem";

interface Food {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
}

const Foods = () => {
  const [foodInventory, setFoodInventory] = useState([]);

  const fetchFoods = () => {
    axios.get("/api/admin/foods").then((res) => {
      setFoodInventory(res.data.foods);
    });
  };

  const deleteFood = (id: string) => {
    axios.delete("/api/admin/foods", {
        data: {
            id: id
        }
    }).then(res => {
        console.log(res.data);
    }).catch(error => console.log(error)
    )
}

  useEffect(() => {
    fetchFoods();
  }, []);
  return (
    <div className="w-full flex items-start justify-center px-20">
      <div className="grid grid-cols-3 gap-4">
        {foodInventory.map((food: Food, index) => (
          <div
            key={index}
            className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden relative group"
          >
            <img
              className="w-full h-48 object-cover"
              src={food.image}
              alt={food.name}
            />
            <div className="p-4">
              <h2 className="text-gray-800 text-xl font-semibold">
                {food.name}
              </h2>
              <p className="text-gray-600">&#8377; {food.price.toFixed(2)}</p>
              <p className="text-gray-600">
                {food.type === "Veg" ? "Vegetarian" : "Non-Vegetarian"}
              </p>
            </div>
            <div onClick={()=> deleteFood(food.id)} className='absolute bg-white top-0 right-0 rounded-md w-8 h-8 hidden group-hover:flex items-center justify-center cursor-pointer z-10 hover:animate-pulse'>
                        <MdDelete color='red'/>
                    </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
