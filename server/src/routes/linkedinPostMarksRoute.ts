//src/routes/linkedinPostRoutes.ts

import { Router } from "express";
import LinkedinPostMarksController from "../controllers/linkedinPostMarksController";
import asyncHandler from "../utils/asyncHandler";


const linkedinRoutes = Router();
const linkedinController = new LinkedinPostMarksController();

// Route to create and save new linkedin data entry
linkedinRoutes.post(
  "/",
  asyncHandler((req, res, next) => linkedinController.createLinkedinPostData(req, res, next))
);

// Route to get linkedin data by student Id
linkedinRoutes.get(
  "/:studentId",
  asyncHandler((req, res, next) => linkedinController.getLinkedinPostDataByStudentId(req, res, next))
);

// Route to get all linkedin data
linkedinRoutes.get(
  "/",
  asyncHandler((req, res, next) =>
    linkedinController.getAllLinkedinPostData(req, res, next)
  )
);

// Route to update linkedin data
linkedinRoutes.put(
  "/:studentId",
  asyncHandler((req, res, next) =>
    linkedinController.updateLinkedinPostData(req, res, next)
  )
);

// Route to delete linkedin data by student Id
linkedinRoutes.delete(
  "/:studentId",
  asyncHandler((req, res, next) => linkedinController.deleteLinkedinPostData(req, res, next))
);

// Route to delete all linkedin data
linkedinRoutes.delete(
  "/",
  asyncHandler((req, res, next) => linkedinController.deleteAllLinkedinPostData(req, res, next))
);

export default linkedinRoutes;
