import { Types } from "mongoose";

export type TPrerequisitCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPrerequisitCourses];
  isDeleted: boolean;
};

export type TCourseFaculties = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
