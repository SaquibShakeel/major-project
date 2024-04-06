'use client';
import React, { useEffect, useState } from "react";
import FoodItem from "../components/FoodItem";
import axios from "axios";

const Inventory = () => {

  const [foodInventory, setFoodInventory] = useState([]);

  useEffect(()=> {
    axios.get("/api/client/foods", 
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    ).then((res)=> {
      setFoodInventory(res.data.foods);      
    });
  }, []);

  return (
    <div className="w-full flex items-start justify-center px-20">
      <div className="grid grid-cols-3 gap-4">
        {foodInventory.map((food, index) => (
            <FoodItem key={index} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
