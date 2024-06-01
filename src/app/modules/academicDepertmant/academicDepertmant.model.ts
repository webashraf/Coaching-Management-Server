import { Schema, model } from "mongoose";
import { TAcademicDepertmant } from "./academicDepertmant.interface";

const academicDepertmantSchema = new Schema<TAcademicDepertmant>(
  {
    name: {
      type: "string",
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFacultyModel",
    },
  },
  { timestamps: true }
);

academicDepertmantSchema.pre("save", async function (next) {
  const result = await AcademicDepertmantModel.findOne({ name: this.name });
  if (result) {
    throw new Error("Department is already exists!!");
  }
  next();
});

academicDepertmantSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const result = await AcademicDepertmantModel.findOne(query);
  if (result) {
    return next();
  }
  throw new Error("Department not found!!");
});

export const AcademicDepertmantModel = model<TAcademicDepertmant>(
  "academicDepertmant",
  academicDepertmantSchema
);
