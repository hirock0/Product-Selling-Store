import { cartsSchemaStr } from "@/lib/Schema/schema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {
            userName,
            userEmail,
            productId
        } = reqBody
        const findCart = await cartsSchemaStr.findOne(

            {
                productId: productId,
                userEmail: userEmail
            }
        )
        if (findCart) {
            return NextResponse.json({
                message: "Product is already in cart",
                success: false
            })
        } else {
            const response = await new cartsSchemaStr({
                userName,
                userEmail,
                productId
            })
            const cart = await response.save()
            return NextResponse.json({
                message: "Cart added",
                success: true,
                cart: cart
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: true
        })

    }
}

