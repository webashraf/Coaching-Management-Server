import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../error/appError";
import { UserModel } from "../user/user.model";
import { TStudents } from "./students.interface";
import { StudentModel } from "./students.model";
import { any } from "zod";

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  return await StudentModel.findOne({ id });
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student does not exist!!");
    }

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteUser) {
      // throw new AppError(httpStatus.BAD_REQUEST, "User dose'nt exist!!");
      throw new Error("User dose'nt exist!!");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateSingleStudentFromDB = async (id: string, payload: Partial<TStudents>) => {
  try{
    const { name, guardian, ...remainingStudentData } = payload;
    let modifiedData: Record<string, unknown> = {
      ...remainingStudentData,
    };
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedData[`name.${key}`] = value;
      }
    }
    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedData[`gurdian.${key}`] = value;
      }
    }
    return await StudentModel.findOneAndUpdate({ id }, modifiedData, {
      new: true,
      runValidators: true,
    });
  }catch(error: any) {
    throw new Error(error)
  }
};

export const studentsService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB
};
