import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicFacultyController } from "./academicFaculty.controller";
import { academicFacultyValidators } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidators.academicFacultyValidation),
  academicFacultyController.createAcademicFaculty
);

router.get("/", academicFacultyController.getAllAcademicFaculty);

router.get("/:facultyId", academicFacultyController.getSignleFacultyByID);

router.patch(
  "/:facultyId",
  validateRequest(academicFacultyValidators.academicFacultyValidation),
  academicFacultyController.updateSignleFacultyByID
);

export const academicFacultyRoutes = router;
