import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken"
export async function GET(request: NextRequest) {
    try {
        const token = await request?.cookies.get("token")?.value || ""
        const verifyToken = await Jwt.verify(token, process.env.TOKEN_SECRET!)
        if (verifyToken) {
            return NextResponse.json({
                message: "Token decoded",
                success: true,
                user: verifyToken
            })
        } else {
            return NextResponse.json({
                message: "Token not decoded",
                success: false,
                user: null
            })
        }

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })

    }
}