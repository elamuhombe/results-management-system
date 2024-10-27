import { Router } from "express";
import UserController from "../controllers/userController";
import asyncHandler from "../utils/asyncHandler";

const userRoutes = Router();
const userController = new UserController();

// Route to register a new user
userRoutes.post(
  "/",
  asyncHandler((req, res, next) => userController.registerUser(req, res, next))
);

// Route to get user data by email
userRoutes.get(
  "/:email",
  asyncHandler((req, res, next) => userController.getUserData(req, res, next))
);

// Route to get all user data
userRoutes.get(
  "/",
  asyncHandler((req, res, next) =>
    userController.getAllUserData(req, res, next)
  )
);

// Route to update user data
userRoutes.put(
  "/:email",
  asyncHandler((req, res, next) =>
    userController.updateUserData(req, res, next)
  )
);

// Route to delete a user
userRoutes.delete(
  "/:email",
  asyncHandler((req, res, next) => userController.deleteUser(req, res, next))
);

// Route to reset user password
userRoutes.post(
  "/reset-password",
  asyncHandler((req, res, next) => userController.resetPassword(req, res, next))
);

export default userRoutes;
