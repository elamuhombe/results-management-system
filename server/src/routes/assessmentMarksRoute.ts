//src/routes/assessmentMarksRoute.ts

import { Router } from "express";
import AssessmentController from "../controllers/assessmentMarksController";
import asyncHandler from "../utils/asyncHandler";

const assessmentRoutes = Router();

const assessmentController = new AssessmentController();

// Route to create and save assessment data
assessmentRoutes.post(
  "/",
  asyncHandler((req, res, next) =>
    assessmentController.createAssessment(req, res, next)
  )
);

// Route to get assessment data by student Id
assessmentRoutes.get(
  "/:studentId",
  asyncHandler((req, res, next) =>
    assessmentController.getAssessmentByStudentId(req, res, next)
  )
);

// Route to get all assessment data
assessmentRoutes.get(
  "/",
  asyncHandler((req, res, next) =>
    assessmentController.getAllAssessments(req, res, next)
  )
);

// Route to update assessment data
assessmentRoutes.put(
  "/:studentId",
  asyncHandler((req, res, next) =>
    assessmentController.updateAssessment(req, res, next)
  )
);

// Route to delete assessment data by student Id
assessmentRoutes.delete(
  "/:studentId",
  asyncHandler((req, res, next) =>
    assessmentController.deleteAssessment(req, res, next)
  )
);

export default assessmentRoutes;
