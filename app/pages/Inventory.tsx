'use client';
import React, { useEffect, useState } from "react";
import FoodItem from "../components/FoodItem";
import axios from "axios";

const Inventory = () => {

  const [foodInventory, setFoodInventory] = useState([]);

  useEffect(()=> {
    const fetchData = async () => {
      const res = await fetch("/api/client/foods")

      const data = await res.json();

      setFoodInventory(data?.foods);
      
    }

    fetchData();    
  }, [foodInventory]);

  return (
    <div className="w-full flex items-start justify-center lg:px-20 px-10">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {foodInventory.map((food, index) => (
            <FoodItem key={index} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
