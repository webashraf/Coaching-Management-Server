import { Types } from "mongoose";

export type TAcademicDepertmant = {
  name: string;
  academicFaculty: Types.ObjectId;
};
