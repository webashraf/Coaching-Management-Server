import express from "express";
import { academicDepartmentRoutes } from "../modules/academicDepertmant/academicDepertmant.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicSemisterRoute } from "../modules/academicSemister/academicSemister.routes";
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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
