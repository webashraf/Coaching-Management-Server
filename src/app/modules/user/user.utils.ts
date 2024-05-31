import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { UserModel } from "./user.model";


const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    {role: "student"},
    {id: 1, _id: 0}
  ).sort({createdAt: -1}).lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
}

export const generatedStudentId = async (payload: TAcademicSemister) => {
  const currentId = await findLastStudent() || (0).toString();
  let incrimentId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrimentId = `${payload.year}${payload.code}${incrimentId}`;
  return incrimentId;
  // console.log(await findLastStudent());
};
