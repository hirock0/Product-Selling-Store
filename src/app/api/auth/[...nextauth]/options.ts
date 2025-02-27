
export const dynamic = "force-dynamic"
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { DBConnection } from "@/lib/DB_Connection/DB_Connection";
import { userSchemaStr } from "@/lib/Schema/schema";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                await DBConnection();
                const findUser = await userSchemaStr.findOne({
                    email: user?.email,
                })

                if (!findUser) {
                    const userDetails = {
                        googleId: user?.id,
                        image: user?.image,
                        name: user?.name,
                        email: user?.email,
                        role: "user",
                    }

                    const responseToUserDB = await new userSchemaStr(userDetails)
                    const savedData = await responseToUserDB.save()
                    if (savedData) {
                        const tokenData = {
                            image: savedData.image,
                            name: savedData?.name,
                            email: savedData?.email,
                        };
                        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
                        (await cookies()).set("token", token, { httpOnly: true })
                    }
                } else {
                    const tokenData = {
                        image: findUser?.image,
                        name: findUser?.name,
                        email: findUser?.email,
                    };
                    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
                    (await cookies()).set("token", token, { httpOnly: true })
                }
            }

            return token;
        },
    },
};


