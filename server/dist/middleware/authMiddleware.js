"use strict";
// src/middleware/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment
// Middleware to authenticate the user using JWT
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // No token, return unauthorized
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' }); // Token verification failed
        }
        req.user = decoded; // Attach the user info to the request object
        next(); // Move to the next middleware or route handler
    });
};
exports.default = authenticate;
