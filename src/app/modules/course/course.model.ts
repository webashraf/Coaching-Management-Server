import { Schema, model } from "mongoose";
import { TCourse, TPrerequisitCourses } from "./course.interface";

const preRequisiteCourses = new Schema<TPrerequisitCourses>({
  course: {
    type: Schema.ObjectId,
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
});

export const CourseModel = model<TCourse>("Courses", courseSchema);
