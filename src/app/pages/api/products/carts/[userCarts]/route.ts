import { cartsSchemaStr } from "@/lib/Schema/schema"
import { NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest, response: any) {
    try {
        const { userCarts } = await response.params || ""
        const carts = await cartsSchemaStr.find({ userEmail: userCarts })
        return NextResponse.json({
            message: "Carts founded",
            success: true,
            carts: carts
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })

    }
}