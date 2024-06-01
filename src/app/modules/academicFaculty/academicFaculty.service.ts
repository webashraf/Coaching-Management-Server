import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) =>
  await AcademicFacultyModel.create(payload);

const getAllFacultiesFromDB = async () => await AcademicFacultyModel.find();

const getSignleFacultyByID = async (id: string) =>
  await AcademicFacultyModel.findById(id);

const updateSignleFacultyByID = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  return await AcademicFacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllFacultiesFromDB,
  getSignleFacultyByID,
  updateSignleFacultyByID,
};
