import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { academicDepartmentRoutes } from "../modules/academicDepertmant/academicDepertmant.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicSemisterRoute } from "../modules/academicSemister/academicSemister.routes";
import { courseRoute } from "../modules/course/course.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { semisterRagistrationRoute } from "../modules/semisterRagistration/semisterRagistration.routes";
import { studentsRoute } from "../modules/students/students.routes";
import { userRoute } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/students",
    route: studentsRoute,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/academic-semisters",
    route: academicSemisterRoute,
  },
  {
    path: "/academic-faculties",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: courseRoute,
  },
  {
    path: "/semister-ragistration",
    route: semisterRagistrationRoute,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
