"use client";
import React, { useState } from "react";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Veg");
  const addToInventory = (e: any) => {
    e.preventDefault();
    console.log(name, price, image, type);
    
  };
  return (
    <div className="w-full flex items-center justify-center px-20 py-10">
      <div className="w-[70%] rounded-md bg-white bg-opacity-20 backdrop-blur-2xl backdrop-filter flex items-center justify-center">
        <form
          className="flex flex-col items-center justify-center w-full p-4 gap-2"
          onSubmit={addToInventory}
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <input
              className="bg-transparent rounded-md py-1 px-2 ring-2 ring-blue-500 border-none outline-none flex-1"
              placeholder="Name of the dish"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <input
              className="bg-transparent rounded-md py-1 px-2 ring-2 ring-blue-500 border-none outline-none flex-1"
              placeholder="Image link"
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(e)=>setImage(e.target.value)}
            />
            <input
              className="bg-transparent rounded-md py-1 px-2 ring-2 ring-blue-500 border-none outline-none w-36"
              placeholder="Price"
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
            <select
              className="bg-transparent rounded-md py-1 px-2 ring-2 ring-blue-500 border-none outline-none"
              name="type"
              id="type"
              value={type}
              onChange={(e)=>setType(e.target.value)}
            >
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
            </select>
          </div>
          <button
            className="border-none outline-none bg-blue-500 text-white font-semibold rounded-md py-1 px-8 hover:bg-blue-400"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
