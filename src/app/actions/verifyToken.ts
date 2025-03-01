import { jwtVerify } from "jose"
export async function VerifUser(token: string) {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const verifyData = await jwtVerify(token, secret);
    if (verifyData) {
        return { varified: true }
    } else {
        return { varified: false }
    }

}