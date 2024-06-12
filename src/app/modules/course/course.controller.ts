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
  const result = await CourseServices.getAllCoursesFromDB(req.params);
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

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );

  res.status(200).json({
    success: true,
    messsage: "successfully assign faculty",
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeacultiesFromCourseFromDB(
    courseId,
    faculties
  );

  res.status(200).json({
    success: true,
    messsage: "successfully remove faculty",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
