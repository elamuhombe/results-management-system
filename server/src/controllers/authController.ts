//src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

class AuthController {
     // Handle user login
     async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { email, password } = req.body;

        try {
            const result = await authService.login(email, password);
            return res.status(200).json(result);  // Explicitly return the Response object
        } catch (error: any) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }


    // Handle user logout
    logout(req: Request, res: Response, next: NextFunction): void {
        try {
            authService.logout();
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error: any) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }
}

export default AuthController;
