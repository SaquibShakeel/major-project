"use client";
import React, { useEffect, useState } from "react";
import FoodItem from "../components/FoodItem";
import axios from "axios";

const Inventory = () => {
  const [foodInventory, setFoodInventory] = useState([]);
  const [topFoods, setTopFoods] = useState([]);
  const [topOrdered, setTopOrdered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/client/foods");

      const data = await res.json();

      setFoodInventory(data?.foods);
    };

    fetchData();
  }, [foodInventory]);

  useEffect(() => {
    if (foodInventory && foodInventory.length > 0) {
      // Sort the food items by rating in descending order
      const sortedFoods = [...foodInventory].sort(
        (a: any, b: any) => b.rating - a.rating
      );

      // Select the top 3 items
      const topThreeFoods = sortedFoods.slice(0, 3);

      // Update state with the top 3 items
      setTopFoods(topThreeFoods);
    }
  }, [foodInventory]);

  useEffect(() => {
    if (foodInventory && foodInventory.length > 0) {
      // Sort the food items by rating in descending order
      const sortedFoods = [...foodInventory].sort(
        (a: any, b: any) => b.totalRateResponse - a.totalRateResponse
      );

      // Select the top 3 items
      const topThreeFoods = sortedFoods.slice(0, 3);

      // Update state with the top 3 items
      setTopOrdered(topThreeFoods);
    }
  }, [foodInventory]);

  return (
    <div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-start justify-center lg:px-20 px-10 pt-6 pb-3 font-semibold border-b-8">
        Top Rated 🌟
      </div>
      <div className="w-full flex items-start justify-center lg:px-20 px-10">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {topFoods.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </div>
      </div>
      <div className="w-full flex items-start justify-center lg:px-20 px-10 pt-6 pb-3 font-semibold border-b-8">
        Top Ordered Items
      </div>
      <div className="w-full flex items-start justify-center lg:px-20 px-10">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {topOrdered.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </div>
      </div>

      <div className="w-full flex items-start justify-center lg:px-20 px-10 pt-6 pb-3 font-semibold border-b-8">
        Menu Items
      </div>
      <div className="w-full flex items-start justify-center lg:px-20 px-10">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {foodInventory.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
