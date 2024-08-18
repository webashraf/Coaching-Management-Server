import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { UserModel } from "../user/user.model";
import { studentsSearchableField } from "./students.const";
import { TStudents } from "./students.interface";
import { StudentModel } from "./students.model";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentsSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;

  return result;
};

// -----------------------------------------------------------------------------------------------------------------------------------------

const getSingleStudentFromDB = async (id: string) => {
  return await StudentModel.findById(id);
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student does not exist!!");
    }

    const userId = deletedStudent.user;

    const deleteUser = await UserModel.findByIdAndUpdate(
      userId,
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

const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudents>
) => {
  try {
    const { name, guardian, ...remainingStudentData } = payload;
    const modifiedData: Record<string, unknown> = {
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
  } catch (error: any) {
    throw new Error(error);
  }
};

export const studentsService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB,
};
