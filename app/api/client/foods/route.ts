import prisma from "@/prisma";
import { NextResponse } from "next/server";

const GET = async () => {
    try {
        const foods = await prisma.food.findMany();

        return NextResponse.json({foods}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

module.exports = {
    GET
}