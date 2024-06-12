import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { courseSearchableFields } from "./course.const";
import { TCourse, TCourseFaculties } from "./course.interface";
import { CourseFacultiesModel, CourseModel } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remaingCourses } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      remaingCourses,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Faild to update basic course!!"
      );
    }

    // Check if there is any pre requisite courses for update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisit = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisitCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisit } },
          },
        },
        { new: true, runValidators: true, session }
      );
      if (!deletedPreRequisitCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Faild to delete pre requisit course!"
        );
      }

      // New pre requisite courses
      const newPreRequisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session }
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Faild to add new pre requisit courses"
        );
      }
      const result = await CourseModel.findByIdAndUpdate(id).populate(
        "preRequisiteCourses.courses"
      );

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, "Faild to update course!!");
  }
};

const deletedCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculties>
) => {
  const result = await CourseFacultiesModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true, runValidators: true }
  );
  return result;
};

const removeacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculties>
) => {
  const result = await CourseFacultiesModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true, runValidators: true }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deletedCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeacultiesFromCourseFromDB,
};
