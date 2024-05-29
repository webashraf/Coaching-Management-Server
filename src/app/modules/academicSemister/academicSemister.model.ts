import { Schema, model } from "mongoose";
import {
  TAcademicSemister,
  TCodes,
  TMonths,
  TNames,
} from "./academicSemister.interface";

const AcademicNames: TNames[] = ["Autum", "Summar", "Fall"];
const AcademicCodes: TCodes[] = ["01", "02", "03"];
const AcademicMonths: TMonths[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

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
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    enum: AcademicMonths,
    required: true,
  },
  endMonth: {
    type: String,
    enum: academicMonths,
    required: true,
  },
});

export const AcademicSemisterModel = model<TAcademicSemister>(
  "AcademicSemister",
  academicSemisterSchema
);
