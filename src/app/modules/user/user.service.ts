import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../error/appError";
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model";
import { TStudents } from "../students/students.interface";
import { StudentModel } from "../students/students.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generatedStudentId } from "./user.utils";

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

export const userService = {
  createStudentIntoDB,
};
