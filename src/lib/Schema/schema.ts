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

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: false },
    isVerified: { type: Boolean, default: false },
    isToken: { type: String, default:"" },
}, { timestamps: true })

export const userSchemaStr = mongoose.models.users || mongoose.model<IUser>("users", userSchema)