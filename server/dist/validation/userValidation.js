"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
// src/validation/userValidation.ts
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
// Custom validation for ObjectId
const objectId = zod_1.z
    .string()
    .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
});
// Validation schema for User based on IUser interface
exports.userValidationSchema = zod_1.z.object({
    _id: objectId.optional(), // ObjectId for the user's ID (optional)
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be at most 100 characters long"),
    userId: zod_1.z
        .string()
        .min(1, "userId is required")
        .max(50, "userId must be at most 50 characters long"),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .max(255, "Email must be at most 255 characters long"),
    password: zod_1.z
        .string()
        .min(10, "Password must be at least 10 characters long")
        .max(128, "Password must be at most 128 characters long"),
    studentId: zod_1.z
        .string()
        .min(1, "studentId is required")
        .max(10, "studentId must be at most 10 characters long"),
    userRole: zod_1.z.enum(["admin", "student"]), // Enum for user roles
});
