import express from "express";
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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
