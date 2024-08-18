import QueryBuilder from "../../builder/QueryBuilder";
import { academicSemisterNameCodeMapper } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemister.interface";
import { AcademicSemisterModel } from "./academicSemister.model";

const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) =>
  academicSemisterNameCodeMapper[payload.name] !== payload.code
    ? Promise.reject(new Error(`Invalid semister code`))
    : await AcademicSemisterModel.create(payload);

const retriveSemistersFromDB = async (query: Record<string, unknown>) => {

  const academicSemesterQuery = new QueryBuilder(
    AcademicSemisterModel.find(),
    query
  )

    .search(["name", "year"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
};

// const retriveSemistersFromDB = async (id: string | null) =>
// await AcademicSemisterModel.find(id === null ? {} : { _id: id });

const updateSingleSemisterIntoDB = async (
  id: string,
  payload: TAcademicSemister
) =>
  payload.name &&
  payload.code &&
  academicSemisterNameCodeMapper[payload.name] !== payload.code
    ? Promise.reject(new Error(`Invalid semister`))
    : await AcademicSemisterModel.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
      });

export const academicSemisterService = {
  createAcademicSemisterIntoDB,
  retriveSemistersFromDB,
  updateSingleSemisterIntoDB,
};
