//src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import IUser, { ResetPasswordResponse } from '../types/types';
import errorHandler from '../middleware/errorHandler'; // Import the error handler

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Controller method to register a new user
    async registerUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userData = req.body;
            const newUser = await this.userService.registerUser(userData);
            return res.status(201).json({message: 'user registered successfully',newUser});
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get user data by email
    async getUserData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email } = req.params;
            const user = await this.userService.getUserData({ email });
            return res.status(200).json(user);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to get all user data
    async getAllUserData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users = await this.userService.getAllUserData();
            return res.status(200).json(users);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to update user data
    async updateUserData(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email } = req.params;
            const updates: Partial<IUser> = req.body;
            const updatedUser = await this.userService.updateUserData({ email, updates });
            return res.status(200).json(updatedUser);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to delete a user
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email } = req.params;
            const deletedUser = await this.userService.deleteUser({ email });
            return res.status(200).json(deletedUser);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }

    // Controller method to reset user password
    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email } = req.body;
            const resetPasswordResponse: ResetPasswordResponse = await this.userService.resetPassword({ email });
            return res.status(200).json(resetPasswordResponse);
        } catch (error) {
            return errorHandler(error, req, res, next); // Use the error handler
        }
    }
}

export default UserController;
