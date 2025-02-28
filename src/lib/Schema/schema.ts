import mongoose from "mongoose"
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image: string;
    role: "user" | "admin";
    isVerified: boolean;
    isToken: string;
}

export interface Carts extends Document {
    productId: string;
    userEmail: string;
    userName: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: false },
    isVerified: { type: Boolean, default: false },
    isToken: { type: String, default: "" },
}, { timestamps: true })

export const userSchemaStr = mongoose.models.users || mongoose.model<IUser>("users", userSchema)

const cartSchema = new mongoose.Schema<Carts>({
    productId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
})

export const cartsSchemaStr = mongoose.models.carts || mongoose.model<Carts>("carts", cartSchema)