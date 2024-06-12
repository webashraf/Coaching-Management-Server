import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseController } from "./course.controller";
import { CourseValidations } from "./course.validation";

const router = Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.courseValidationSchema),
  CourseController.createCourse
);

router.get("/:id", CourseController.getSingleCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidations.updateValidationSchema),
  CourseController.updateCourse
);

router.delete("/:id", CourseController.deleteCourse);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidation),
  CourseController.assignFacultiesWithCourse
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidation),
  CourseController.removeFacultiesFromCourse
);

router.get("/", CourseController.getAllCourses);
export const courseRoute = router;
