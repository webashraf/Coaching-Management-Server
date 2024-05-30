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
router.get("/", academicSemisterConstroller.retriveSemisters);
router.get("/:semesterld", academicSemisterConstroller.retriveSemisters);
router.patch(
  "/:semesterld",
  validateRequest(academicSemisterValidators.academicSemisterValidation),
  academicSemisterConstroller.updateSingleSemister
);

export const academicSemisterRoute = router;
