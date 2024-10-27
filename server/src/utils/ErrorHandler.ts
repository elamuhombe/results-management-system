// src/utils/ErrorHandler.ts
class ErrorHandler extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ErrorHandler"; // Optional: set the name of the error
    Error.captureStackTrace(this, this.constructor); // Optional: captures stack trace
  }
}

export default ErrorHandler;
