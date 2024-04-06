import prisma from "@/prisma";
import { NextResponse } from "next/server";

const PATCH = async (req: Request) => {
  try {
    const {ratings} = await req.json();

    ratings.forEach(async(foodRating: any) => {

      var food = await prisma.food.findFirst({
        where: {
          id: foodRating.id,
        },
      });

      var foodRatingUpdate = await prisma.food.update({
        where: {
          id: foodRating.id,
        },
        data: {
          rating: parseFloat(
            (
              ((food?.rating as number) * (food?.totalRateResponse as number) +
                foodRating.rating) /
              ((food?.totalRateResponse as number) + 1)
            ).toFixed(2)
          ),
          totalRateResponse: (food?.totalRateResponse as number) + 1,
        },
      });
      
    });
    

    return NextResponse.json(
      {
        message: "Ratings updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

module.exports = {
  PATCH,
};
