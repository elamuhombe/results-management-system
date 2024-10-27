"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/ErrorHandler.ts
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ErrorHandler"; // Optional: set the name of the error
        Error.captureStackTrace(this, this.constructor); // Optional: captures stack trace
    }
}
exports.default = ErrorHandler;
