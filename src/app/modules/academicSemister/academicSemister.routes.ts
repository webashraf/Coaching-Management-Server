import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicSemisterConstroller } from "./academicSemister.controller";
import { academicSemisterValidators } from "./academicSemister.validation";

const router = express.Router();

router.post(
  "/create-academic-semister",
  validateRequest(academicSemisterValidators.academicSemisterValidation),
  academicSemisterConstroller.createAcademicSemister
);

export const academicSemisterRoute = router;
