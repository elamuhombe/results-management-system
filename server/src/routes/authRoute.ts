//src/routes/authRoute.ts

import { Router } from "express";
import AuthController from "../controllers/authController";
import asyncHandler from "../utils/asyncHandler";



const authRoute = Router();
const authController = new AuthController();

// Route to login
authRoute.post(
    "/login",
    asyncHandler((req, res, next) => authController.login(req, res, next))
  );
  

export default authRoute;