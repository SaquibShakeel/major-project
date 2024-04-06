'use client';
import { Rating } from "@material-tailwind/react";

interface Food {
  item: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  };
  setRatings: React.Dispatch<React.SetStateAction<Rating[]>>
}

interface Rating {
  id: string;
  rating: number;
}

const RatingComponent = ({ item, setRatings }: Food) => {
  
  return (
    <div className="w-full flex items-center justify-between p-2 rounded-md bg-white">
        <h3 className="text-blue-gray-600 font-semibold">{item.name}</h3>
        <Rating value={0} placeholder={undefined} onChange={(val) => {
          setRatings((prev: Rating[]) => [...prev, {
            id: item.id,
            rating: val
          }])
        }} />
    </div>
  );
};

export default RatingComponent;
