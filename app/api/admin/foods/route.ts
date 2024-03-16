import prisma from "@/prisma";
import { NextResponse } from "next/server";

const POST = async (req:Request) => {
    try {
        const {name, price, image, type} = await req.json();
        if(!name || !price || !image || !type) {
            return NextResponse.json({message: "Invalid data"}, {status: 422});
        }

        const food = await prisma.food.create({
            data: {
                name, price, image, type
            }
        })

        return NextResponse.json({food}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

const GET = async () => {
    try {
        const foods = await prisma.food.findMany();

        return NextResponse.json({foods}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

const DELETE = async (req:Request) => {
    try {
        const {id} = await req.json();

        if(!id) {
            return NextResponse.json({message: "Invalid data"}, {status: 422});
        }

        const food = await prisma.food.delete({
            where: {id: id}
        })

        return NextResponse.json({food}, {status: 202});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

module.exports = {
    POST, GET, DELETE
}