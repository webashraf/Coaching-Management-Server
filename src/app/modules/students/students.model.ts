import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { UserModel } from "../user/user.model";
import { TGuardian, TStudents, TUserName } from "./students.interface";

// Define schema for student's name
const studentsNameSchema = new mongoose.Schema<TUserName>({
  firstName: {
    type: "string",
    required: [true, "First name is required"],
    maxlength: [20, "first name can not be more than 20 characters"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const isCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return isCapitalized === value;
      },
      message: "{VALUE} is not a Capitalized formate",
    },
  },
  middleName: { type: "string" },
  lastName: {
    type: "string",
    required: [true, "Last name is required"],
    maxlength: [20, "last name can not be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: "{VALUE} is not a valid last name you must use only letters",
    },
  },
});

// Define schema for guardian
const guardianSchema = new mongoose.Schema<TGuardian>({
  name: { type: "string", required: [true, "Guardian name is required"] },
  occupation: {
    type: "string",
    required: [true, "Guardian occupation is required"],
  },
  contactNumber: {
    type: "string",
    required: [true, "Guardian contact number is required"],
  },
  email: { type: "string", required: [true, "Guardian email is required"] },
});

// Define schema for student
const studentSchema = new mongoose.Schema<TStudents>(
  {
    id: {
      type: String,
      required: [true, "Student id is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "UserModel",
    },
    name: {
      type: studentsNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: { type: Date },
    email: {
      type: "string",
      required: [true, "Student email is required"],
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: "{VALUE} is not a valid email address",
      },
    },
    age: { type: "number", required: [true, "Student age is required"] },
    contactNumber: {
      type: "string",
      required: [true, "Student contact number is required"],
    },
    emergencyContactNo: {
      type: "string",
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "AB+", "AB-", "O+", "O-", "B+", "B-"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemister",
      required: [true, "Admission semister` is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "academicDepertmant",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual("fullName").get(function () {
  return (
    this?.name?.firstName +
    " " +
    this?.name?.middleName +
    " " +
    this?.name?.lastName
  );
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
});
studentSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
});

studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const student = await StudentModel.findOne(query);
  const user = await UserModel.findOne(query);
  if (student && user) {
    return next();
  }
  throw new Error("Student/User not found!!");
});

// Model
export const StudentModel = mongoose.model<TStudents>("Student", studentSchema);
