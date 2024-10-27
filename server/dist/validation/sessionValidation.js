"use strict";
// src/validation/sessionValidation.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// Custom validation for ObjectId
const objectId = zod_1.z
    .string()
    .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
});
const sessionValidationSchema = zod_1.z.object({
    user: zod_1.z.object({
        userId: zod_1.z.string(),
    }),
    _id: objectId.optional(), // ObjectId for the user's ID (optional)
    sessionId: zod_1.z.string(),
    expiresAt: zod_1.z.date(),
    ipAddress: zod_1.z.string(),
    userAgent: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.default = sessionValidationSchema;
