import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../error/appError";
import { TAdmin } from "../Admin/admin.interface";
import { Admin } from "../Admin/admin.model";
import { AcademicDepertmantModel } from "../academicDepertmant/academicDepertmant.model";
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model";
import { TFaculty } from "../faculty/faculty.interface";
import FacultyModel from "../faculty/faculty.model";
import { TStudents } from "../students/students.interface";
import { StudentModel } from "../students/students.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generatedStudentId,
} from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudents) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = "student";
  const admissionSemister = await AcademicSemisterModel.findById(
    payload.admissionSemister
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generatedStudentId(admissionSemister as any);

    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create user!!");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create student!!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Faild to create student!!");
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepertmantModel.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
