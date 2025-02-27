import { NextRequest, NextResponse } from "next/server";
import { requestCloudinary } from "@/utils/cloudinary/clodinary";
import { DBConnection } from "@/lib/DB_Connection/DB_Connection";
import { userSchemaStr } from "@/lib/Schema/schema";
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken"
export async function POST(request: NextRequest) {
    try {

        await DBConnection()
        const reqBody = await request.json()
        const {
            name,
            email,
            password,
            confirmPassword,
            image
        } = reqBody

        const findUser = await userSchemaStr.findOne({ email: email })
        if (findUser) {
            return NextResponse.json({
                message: "User already exists",
                success: false
            })
        } else {
            const imageUplaod = await requestCloudinary(image)
            const hasedPassword = await bcryptjs.hash(password, 10)
            const tokenData = {
                name: name,
                email: email,
                image: imageUplaod?.secure_url
            }
            const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
           
            const responseUser = await new userSchemaStr({
                name,
                email,
                password: hasedPassword,
                image: imageUplaod?.secure_url,
                role: "user",
                isToken: token
            })
            await responseUser.save()
            
            const response = NextResponse.json({
                message: "Register Successfully",
                success: true
            })
            response.cookies.set("token", token, { httpOnly: true })
            return response
        }
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        })

    }
}