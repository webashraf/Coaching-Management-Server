import express from "express";
import { studentsController } from "./students.controller";

const router = express.Router();

// Will call controller
router.post("/create-student", studentsController.createStudent);
router.get("/", studentsController.getAllStudents);

export const studentsRoute = router;
