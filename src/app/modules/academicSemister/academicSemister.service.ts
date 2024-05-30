import { academicSemisterNameCodeMapper } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemister.interface";
import { AcademicSemisterModel } from "./academicSemister.model";

const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) => {
  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error(`Invalid semister code` )
  }
  return await AcademicSemisterModel.create(payload);
};

export const academicSemisterService = {
  createAcademicSemisterIntoDB,
};
