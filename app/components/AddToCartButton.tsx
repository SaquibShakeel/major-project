'use client';
import React, { useState } from 'react'
import { useCart } from '../context/CartContext';

interface AddToCartButtonProps {
    id: string;
    name: string;
    price: number;
}

const AddToCartButton = ({id, name, price} : AddToCartButtonProps) => {
    const [quantity, setQuantity] = useState(1);

    const {addToCart} = useCart();

  const addToCartHandler = () => {
    addToCart({
      id: id,
      name: name,
      quantity: quantity,
      price: price,
    })
  }
  return (
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
  )
}

export default AddToCartButton