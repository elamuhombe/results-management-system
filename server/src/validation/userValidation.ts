
// src/validation/marksValidation.ts
import { z } from 'zod';

// Validation schema for User
export const userValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(10, 'Password must be at least 10 characters long'),
    userRole: z.enum(['admin', 'student']),
});
