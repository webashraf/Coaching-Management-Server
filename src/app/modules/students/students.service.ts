import { StudentModel } from "./students.model";

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

export const studentsService = {
  getAllStudentsFromDB,
};
