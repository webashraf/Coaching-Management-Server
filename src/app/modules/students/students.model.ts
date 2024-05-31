import { Schema, model } from "mongoose";
import validator from "validator";
import { TGuardian, TStudents, TUserName } from "./students.interface";

// Define schema for student's name
const studentsNameSchema = new Schema<TUserName>({
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
const guardianSchema = new Schema<TGuardian>({
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
const studentSchema = new Schema<TStudents>({
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
  emergencyContctNo: {
    type: "string",
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "AB+", "AB-", "O+", "O-", "B+", "B-"],
  },
  prasentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  parmanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"],
  },
  profileImage: { type: String },
  admissionSemister: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemisterModel",
    required: [true, "Admission semister` is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Model
export const StudentModel = model<TStudents>("Student", studentSchema);
