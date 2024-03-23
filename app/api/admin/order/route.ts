import prisma from "@/prisma"
import { NextResponse } from "next/server";

const GET = async () => {
    try {
        const orders = await prisma.order.findMany();
        return NextResponse.json({orders}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

const DELETE = async (req: Request) => {
    try {
        console.log("gdcfbhj");
        
        const {id} = await req.json();
        console.log(id);
        
        if(!id) {
            return NextResponse.json({message: "Invalid data"}, {status: 422});
        }
        const order = await prisma.order.delete({
            where: {id: id}
        })
        return NextResponse.json({order}, {status: 202});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

module.exports = {
    GET,
    DELETE
}