//src/utils/AppError.ts

class AppError extends Error {
    public status: string;
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // This helps differentiate between operational errors and programming errors.

        // Capturing the stack trace helps in debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
