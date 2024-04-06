import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: Request) => {
  try {
    const { items, tableNo } = await req.json();

    await items.map(async (item: any) => {
      var food = await prisma.food.findFirst({
        where: {
          id: item.id,
        },
      });
      await prisma.food.update({
        where: {
          id: item.id,
        },
        data: {
          totalSale: food?.totalSale + item.quantity,
        },
      });
    });

    const order = await prisma.order.create({
      data: {
        items: items,
        tableNo: tableNo,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

const GET = async (req:NextRequest) => {
  try {
    
    const orderId = await req.nextUrl.searchParams.get("orderId") as string

    const order = await prisma.order.findFirst({
      where: {
        id: orderId
      }
    })

    return NextResponse.json({order}, {status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Server Error"}, {status: 500})
  }
}

module.exports = { POST, GET };
