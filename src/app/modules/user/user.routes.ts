import express, { Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(userValidation.userValidationSchema),
  userController.createNewUser
);
router.get("/", (req: Request, res: Response) => {
  res.send("hello world!");
});

export const userRoute = router;
