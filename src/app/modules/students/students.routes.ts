import express from "express";
import { studentsController } from "./students.controller";

const router = express.Router();

// Will call controller
router.patch(
  "/:id",
  studentsController.updateSingleStudent
);
router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getSingleStudent);
router.delete("/:id", studentsController.deleteSingleStudent);

export const studentsRoute = router;
