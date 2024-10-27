"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        // Handle Zod validation errors
        return res.status(400).json({ message: 'Validation Error', errors: err.errors });
    }
    // Handle custom application errors
    if (err instanceof ErrorHandler_1.default) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Handle other errors
    return res.status(500).json({ message: 'Internal Server Error' });
};
exports.default = errorHandler;
