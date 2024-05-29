import config from "../../config";
import { Students } from "../students/students.interface";
import { StudentModel } from "../students/students.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: Students) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  userData.role = "student";
  userData.id = "456546";

  const result = await UserModel.create(userData);
  // return result;
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
