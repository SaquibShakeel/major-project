import prisma from "@/prisma";
import { NextResponse } from "next/server";

const POST = async (req:Request) => {
    try {
        const {items} = await req.json();
        
        const order = await prisma.order.create({
            data: {
                items: items
            }
        })

        return NextResponse.json({order}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server Error"}, {status: 500});
    }
}

module.exports = {POST}