"use strict";
//src/utils/AppError.ts
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // This helps differentiate between operational errors and programming errors.
        // Capturing the stack trace helps in debugging
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
