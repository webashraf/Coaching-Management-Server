import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { semisterRegistrationController } from "./semisterRagistration.controllers";
import { semisterRagistrationValidator } from "./semisterRagistration.validation";

const router = Router();

router.post(
  "/create-semister-registration",
  validateRequest(semisterRagistrationValidator.semisterRagistrationValidation),
  semisterRegistrationController.createRegistration
);

router.get("/", semisterRegistrationController.retrivedAllRegisterdSemister);

router.get(
  "/:id",
  semisterRegistrationController.retrivedSingleRegisterdSemister
);

router.patch(
  "/:id",
  validateRequest(
    semisterRagistrationValidator.updateSemisterRagistrationValidation
  ),
  semisterRegistrationController.updateSemisterResgistration
);

export const semisterRagistrationRoute = router;
