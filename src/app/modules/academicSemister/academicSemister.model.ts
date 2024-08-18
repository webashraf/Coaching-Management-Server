import { Schema, model } from "mongoose";
import {
  AcademicCodes,
  AcademicMonths,
  AcademicNames,
} from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemister.interface";

const academicSemisterSchema = new Schema<TAcademicSemister>({
  name: {
    type: String,
    enum: AcademicNames,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicCodes,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: AcademicMonths,
    required: true,
  },
  endMonth: {
    type: String,
    enum: AcademicMonths,
    required: true,
  },
});

academicSemisterSchema.pre("save", async function (next) {
  const isSemisterExist = await AcademicSemisterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemisterExist) {
    throw new Error("Semister is allready exist!!");
  }
  next();
});

export const AcademicSemisterModel = model<TAcademicSemister>(
  "AcademicSemister",
  academicSemisterSchema
);
