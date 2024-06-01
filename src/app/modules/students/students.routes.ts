import express from "express";
import { studentsController } from "./students.controller";

const router = express.Router();

// Will call controller
router.patch(
  "/:studentId",
  studentsController.updateSingleStudent
);
router.get("/", studentsController.getAllStudents);
router.get("/:studentId", studentsController.getSingleStudent);
router.delete("/:studentId", studentsController.deleteSingleStudent);

export const studentsRoute = router;
