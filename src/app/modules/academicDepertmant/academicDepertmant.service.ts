import { TAcademicDepertmant } from "./academicDepertmant.interface";
import { AcademicDepertmantModel } from "./academicDepertmant.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepertmant) =>
  await AcademicDepertmantModel.create(payload);

const getAllDepartmentFromDB = async () => await AcademicDepertmantModel.find();

const getSignleDepartmentByID = async (id: string) =>
  await AcademicDepertmantModel.findById(id);

const updateSignleDepartmentByID = async (
  id: string,
  payload: Partial<TAcademicDepertmant>
) => {
  return await AcademicDepertmantModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllDepartmentFromDB,
  getSignleDepartmentByID,
  updateSignleDepartmentByID,
};
