
// src/validation/userValidation.ts
import mongoose from 'mongoose';
import { z } from 'zod';


// Custom validation for ObjectId
const objectId = z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
});

// Validation schema for User based on IUser interface
export const userValidationSchema = z.object({
    _id: objectId, // ObjectId for the user's ID
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name must be at most 100 characters long'), // Optional max length
    email: z.string()
        .email('Invalid email format')
        .max(25, 'Email must be at most 255 characters long'), // Optional max length
    password: z.string()
        .min(10, 'Password must be at least 10 characters long')
        .max(128, 'Password must be at most 128 characters long'), // Optional max length
    studentId: z.string()
        .min(1, 'Name is required')
        .max(10, 'Name must be at most 100 characters long'), // Optional max length
    userRole: z.enum(['admin', 'student']), // Enum for user roles
});