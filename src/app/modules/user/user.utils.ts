import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { UserModel } from "./user.model";

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    { role: "student" },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemister) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudent();
  const lastStudentSemisterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemisterYear = lastStudentId?.substring(0, 4);
  const currentSemiterCode = payload.code;
  const currentSemiterYear = payload.year;

  if (lastStudentId && lastStudentSemisterCode === currentSemiterCode && lastStudentSemisterYear === currentSemiterYear) {
    currentId = lastStudentId?.substring(6);
  }

  let incrimentId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrimentId = `${payload.year}${payload.code}${incrimentId}`;
  return incrimentId;
  // console.log(await findLastStudent());
};
