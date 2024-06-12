import mongoose, { Schema, model } from "mongoose";
import { SemisterRagistrationStatusArry } from "./semisterRagistration.const";
import { TSemisterRagistration } from "./semisterRagistration.interface";

const semisterRegistrationSchema = new mongoose.Schema<TSemisterRagistration>(
  {
    academicSemister: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: "AcademicSemister",
    },
    status: {
      type: String,
      enum: SemisterRagistrationStatusArry,
      default: "UPCOMING",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    minCredit: {
      type: Number,
      removeDefault: true,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  { timestamps: true }
);

export const SemisterRegistrationModel = model<TSemisterRagistration>(
  "semisterRegistration",
  semisterRegistrationSchema
);
