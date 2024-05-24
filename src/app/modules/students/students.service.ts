import { Students } from "./students.interface";
import { StudentModel } from "./students.model";

const createStudentIntoDB = async (student: Students) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

export const studentsService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
};
