import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentController } from "./academicDepertmant.controller";
import { academicDepertmantValidators } from "./academicDepertmant.validation";

const router = Router();

router.post(
  "/create-academic-department",
  // validateRequest(academicDepertmantValidators.academicDepertmantValidation),
  academicDepartmentController.createAcademicDepartment
);

router.get("/", academicDepartmentController.getAllAcademicDepartment);

router.get(
  "/:departmentId",
  academicDepartmentController.getSignleDepartmentByID
);

router.patch(
  "/:departmentId",
  validateRequest(academicDepertmantValidators.academicDepertmantValidationForUpdate),
  academicDepartmentController.updateSignleDepartmentByID
);

export const academicDepartmentRoutes = router;
