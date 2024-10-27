// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import ErrorHandler from '../utils/ErrorHandler';


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    // Handle Zod validation errors
    return res.status(400).json({ message: 'Validation Error', errors: err.errors });
  }

  // Handle custom application errors
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle other errors
  return res.status(500).json({ message: err.message || 'Internal Server Error' });
};

export default errorHandler;
