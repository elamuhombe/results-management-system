//src/routes/totalMarksRoutes.ts

import { Router } from "express";
import ProjectSubmissionController from "../controllers/projectSubmissionMarksController";
import asyncHandler from "../utils/asyncHandler";

const projectSubmissionRoutes = Router();
const projectSubmissionController = new ProjectSubmissionController();

// Route to create and save new project submission data entry
projectSubmissionRoutes.post(
  "/",
  asyncHandler((req, res, next) => projectSubmissionController.createProjectSubmissionMark(req, res, next))
);

// Route to get project submission data by student Id
projectSubmissionRoutes.get(
  "/:studentId",
  asyncHandler((req, res, next) => projectSubmissionController.getProjectSubmissionMarkByStudentId(req, res, next))
);

// Route to get all project submission data
projectSubmissionRoutes.get(
  "/",
  asyncHandler((req, res, next) =>
    projectSubmissionController.getAllProjectSubmissionMarks(req, res, next)
  )
);

// Route to update project submission data
projectSubmissionRoutes.put(
  "/:studentId",
  asyncHandler((req, res, next) =>
    projectSubmissionController.updateProjectSubmissionMark(req, res, next)
  )
);

// Route to delete project submission data by student Id
projectSubmissionRoutes.delete(
  "/:studentId",
  asyncHandler((req, res, next) => projectSubmissionController.deleteProjectSubmissionMark(req, res, next))
);

// // Route to delete all attendance data
// attendanceRoutes.delete(
//   "/",
//   asyncHandler((req, res, next) => attendanceController.deleteAllAttendanceMark(req, res, next))
// );

export default projectSubmissionRoutes;
