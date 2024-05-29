import { Schema, model } from "mongoose";
import { Guardian, Students, userName } from "./students.interface";
import validator from "validator";

// Define schema for student's name
const studentsNameSchema = new Schema<userName>({
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
const guardianSchema = new Schema<Guardian>({
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
const studentSchema = new Schema<Students>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "UserModel"
  },
  name: {
    type: studentsNameSchema,
    required: [true, "Student name is required"],
  },
  gender: ["male", "female"],
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
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

// Model
export const StudentModel = model<Students>("Student", studentSchema);
