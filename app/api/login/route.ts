import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const POST = async (req: Request) => {
    try {
        const { password } = await req.json();
        const secret = process.env.JWT_SECRET as string;

        if (password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ isAdmin: true }, secret, { expiresIn: '1d' });
            const response =  NextResponse.json({ message: "Login Successful", success: true }, {status: 200});
            response.cookies.set("token", token, {
                httpOnly: true,
            })
            return response;
        } else {
            return NextResponse.json({message: 'Authentication failed'}, {status: 401});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}

module.exports = {
    POST
}
