"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "../components/RatingComponent";
import { useRouter } from "next/navigation";

interface OrderPageProps {
  orderId: string;
}

interface Rating {
  id: string;
  rating: number;
}

const OrderPage = ({ orderId }: OrderPageProps) => {
  const [order, setOrder] = useState<any>();
  const [ratings, setRatings] = useState<Rating[]>([]);

  const router = useRouter();

  const rateFoods = () => {
    axios
      .patch("/api/client/rate", {
        ratings: ratings,
      })
      .then((res: any) => {
        console.log(res);
        router.replace("/thankyou");
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/client/order?orderId=${orderId}`)
      .then((res: any) => {
        setOrder(res.data.order);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div className="md:w-[60%] w-[90%] bg-black dark:bg-white ring-1 ring-gray-700 rounded-md md:px-10 px-4 py-5 backdrop-blur-2xl backdrop-filter bg-opacity-20 dark:bg-opacity-10 flex flex-col items-center justify-start">
        <h1 className="text-3xl font-semibold text-center">Please leave a feedback</h1>
        <p className="font-extralight text-center">Help us to tailor our services to meet your needs</p>
        <div className="flex flex-col items-center justify-center w-full gap-1 mt-4">
          {order?.items?.map((item: any) => (
            <Rating key={item.id} item={item} setRatings={setRatings} />
          ))}
        </div>
        <button className="bg-blue-gray-600 hover:bg-blue-gray-700 rounded-md py-2 px-4 outline-none border-none font-semibold text-lg mt-4" onClick={rateFoods}>Submit</button>
      </div>
    </div>
  );
};

export default OrderPage;
