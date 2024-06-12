import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validators";
import { USER_ROLE } from "./user.const";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(userValidation.userValidationSchema),
  userController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);

// router.get("/", (req: Request, res: Response) => {
//   res.send("hello world!");
// });

export const userRoute = router;
