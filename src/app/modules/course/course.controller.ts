import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Course created successfully!!",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();
  res.status(200).json({
    success: true,
    message: "Course retrived successfully!!",
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getSingleCourseFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Course retrived successfully!!",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.updateCourseIntoDB(
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Course updated successfully!!",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.deletedCourseIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Course updated successfully!!",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
