// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import IUser from '../types/types';

// Define a custom request interface extending the base Request
interface AuthRequest extends Request {
    user?: IUser; // Optional user property
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment

// Middleware to authenticate the user using JWT
const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization; // Extract the Authorization header

    // Check if the Authorization header is present
    if (!authHeader) {
        console.log('Authorization header is missing.'); // Log missing header for debugging
        res.status(401).json({ message: 'Authorization header is missing.' }); // Respond with unauthorized if header is missing
        return; // Stop further execution
    }

    const token = authHeader.split(' ')[1]; // Extract token from the Authorization header

    // Check if token is provided
    if (!token) {
        console.log('No token provided.'); // Log for debugging
        res.status(401).json({ message: 'No token provided.' }); // Respond with unauthorized if no token
        return; // Stop further execution
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token.', err); // Log the error for debugging
            res.status(403).json({ message: 'Failed to authenticate token.' }); // Token verification failed
            return; // Stop further execution
        }

        // Attach the user info to the request object
        req.user = decoded as IUser; // Type assertion to IUser

        next(); // Move to the next middleware or route handler
    });
};

export default authenticate;
