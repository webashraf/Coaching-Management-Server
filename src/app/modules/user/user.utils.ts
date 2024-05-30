import { TAcademicSemister } from "../academicSemister/academicSemister.interface";

export const generatedStudentId = async (payload: TAcademicSemister) => {
  const currentId = (0).toString();
  let incrimentId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrimentId = `${payload.year}${payload.code}${incrimentId}`;
  return incrimentId;
};
