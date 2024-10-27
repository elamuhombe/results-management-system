// src/validation/sessionValidation.ts

import { z } from "zod";
import mongoose, { Types } from "mongoose";

// Custom validation for ObjectId
const objectId = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
  });


const sessionValidationSchema = z.object({
  user: z.object({
    userId: z.string(),
  }),
  _id: objectId.optional(), // ObjectId for the user's ID (optional)
 
  sessionId: z.string(),
  expiresAt: z.date(),
  ipAddress: z.string(),
  userAgent: z.string(),
  isActive: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default sessionValidationSchema;
