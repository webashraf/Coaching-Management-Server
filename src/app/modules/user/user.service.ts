import config from "../../config";
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model";
import { TStudents } from "../students/students.interface";
import { StudentModel } from "../students/students.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudents) => {
  const userData: Partial<TUser> = {};

  const admissionSemister = await AcademicSemisterModel.findById(
    payload.admissionSemister
  );

  userData.role = "student";
  userData.id = await generatedStudentId(admissionSemister as any);

  userData.password = password || (config.default_pass as string);

  const newUser = await UserModel.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
