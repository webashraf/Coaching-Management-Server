import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.const";
import { academicSemisterConstroller } from "./academicSemister.controller";
import { academicSemisterValidators } from "./academicSemister.validation";

const router = express.Router();

router.post(
  "/create-academic-semister",
  auth(USER_ROLE.admin),
  validateRequest(academicSemisterValidators.academicSemisterValidation),
  academicSemisterConstroller.createAcademicSemister
);
router.get(
  "/",
  auth(USER_ROLE.admin),
  academicSemisterConstroller.retriveSemisters
);
router.get("/:semesterld", academicSemisterConstroller.retriveSemisters);
router.patch(
  "/:semesterld",
  validateRequest(academicSemisterValidators.academicSemisterValidation),
  academicSemisterConstroller.updateSingleSemister
);

export const academicSemisterRoute = router;
