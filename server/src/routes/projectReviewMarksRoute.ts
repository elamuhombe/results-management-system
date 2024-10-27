//src/routes/projectReviewRoute.ts

import { Router } from "express";
import ProjectReviewController from "../controllers/projectReviewMarksController";
import asyncHandler from "../utils/asyncHandler";


const projectReviewRoutes = Router();
const projectReviewController = new ProjectReviewController();

// Route to create and save new project review data entry
projectReviewRoutes.post(
  "/",
  asyncHandler((req, res, next) => projectReviewController.createProjectReviewMark(req, res, next))
);

// Route to get project review data by student Id
projectReviewRoutes.get(
  "/:studentId",
  asyncHandler((req, res, next) => projectReviewController.getProjectReviewMarkByStudentId(req, res, next))
);

// Route to get all project review data
projectReviewRoutes.get(
  "/",
  asyncHandler((req, res, next) =>
    projectReviewController.getAllProjectReviewMarks(req, res, next)
  )
);

// Route to update project review data
projectReviewRoutes.put(
  "/:studentId",
  asyncHandler((req, res, next) =>
    projectReviewController.updateProjectReviewMark(req, res, next)
  )
);

// Route to delete project review data by student Id
projectReviewRoutes.delete(
  "/:studentId",
  asyncHandler((req, res, next) => projectReviewController.deleteProjectReviewMark(req, res, next))
);

// // Route to delete all attendance data
// attendanceRoutes.delete(
//   "/",
//   asyncHandler((req, res, next) => attendanceController.deleteAllAttendanceMark(req, res, next))
// );

export default projectReviewRoutes;
