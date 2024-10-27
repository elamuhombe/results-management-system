// src/validation/userValidation.ts
import mongoose from "mongoose";
import { z } from "zod";

// Custom validation for ObjectId
const objectId = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
  });

// Validation schema for User based on IUser interface
export const userValidationSchema = z.object({
  _id: objectId.optional(), // ObjectId for the user's ID (optional)
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters long"),
  userId: z
    .string()
    .min(1, "userId is required")
    .max(50, "userId must be at most 50 characters long"),
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters long"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .max(128, "Password must be at most 128 characters long"),
  studentId: z
    .string()
    .min(1, "studentId is required")
    .max(10, "studentId must be at most 10 characters long"),
  userRole: z.enum(["admin", "student"])
})
