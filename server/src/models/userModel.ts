// src/models/userModel.ts
import { Schema, model } from "mongoose";
import IUser from "../types/types";

// Define the user schema
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true }, 
        email: { type: String, required: true, unique: true}, 
        password: { type: String, required: true},
        userRole: {
            type: String,
            enum: ['admin', 'student'], 
            required: true
        }
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the user model
const UserModel = model<IUser>("User", userSchema);
export default UserModel;
