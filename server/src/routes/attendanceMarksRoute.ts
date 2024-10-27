import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import AttendanceMarkController from "../controllers/attendanceMarksController";

const attendanceRoutes = Router();
const attendanceController = new AttendanceMarkController();

// Route to create and save new attendance data entry
attendanceRoutes.post(
  "/",
  asyncHandler((req, res, next) => attendanceController.createAttendanceMark(req, res, next))
);

// Route to get attendance data by student Id
attendanceRoutes.get(
  "/:studentId",
  asyncHandler((req, res, next) => attendanceController.getAttendanceMarkByStudentId(req, res, next))
);

// Route to get all attendance data
attendanceRoutes.get(
  "/",
  asyncHandler((req, res, next) =>
    attendanceController.getAllAttendanceMarks(req, res, next)
  )
);

// Route to update attendance data
attendanceRoutes.put(
  "/:studentId",
  asyncHandler((req, res, next) =>
    attendanceController.updateAttendanceMark(req, res, next)
  )
);

// Route to delete attendance data by student Id
attendanceRoutes.delete(
  "/:studentId",
  asyncHandler((req, res, next) => attendanceController.deleteAttendanceMark(req, res, next))
);

// // Route to delete all attendance data
// attendanceRoutes.delete(
//   "/",
//   asyncHandler((req, res, next) => attendanceController.deleteAllAttendanceMark(req, res, next))
// );

export default attendanceRoutes;
