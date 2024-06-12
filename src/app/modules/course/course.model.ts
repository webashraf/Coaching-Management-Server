import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculties,
  TPrerequisitCourses,
} from "./course.interface";

const preRequisiteCourses = new Schema<TPrerequisitCourses>({
  course: {
    type: Schema.ObjectId,
    ref: "Courses",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCourses],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseFacultiesSchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

export const CourseModel = model<TCourse>("Courses", courseSchema);

export const CourseFacultiesModel = model<TCourseFaculties>(
  "CourseFaculties",
  courseFacultiesSchema
);
