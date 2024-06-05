import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../error/appError";
import { UserModel } from "../user/user.model";
import { TStudents } from "./students.interface";
import { StudentModel } from "./students.model";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = "";
  const queryObj = { ...query };

  const studentsSearchableField = ["email", "name.fastName", "prasentAddress"];

  // Search for students
  const searchQuery = StudentModel.find({
    $or: studentsSearchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

  excludeFields.forEach((el) => delete queryObj[el]);

  if (query) {
    searchTerm = query?.searchTerm as string;
  }

  // Filter for students
  const filterQuery = searchQuery.find(queryObj);

  let sort = "-createdAt";
  if (query.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query?.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  console.log({ queryObj }, { query });

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldsQuery = await limitQuery.select(fields);

  return fieldsQuery;
};

// -----------------------------------------------------------------------------------------------------------------------------------------

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

const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudents>
) => {
  try {
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
