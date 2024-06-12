import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/appError";
import { SemisterRegistrationStatus } from "./semisterRagistration.const";
import { TSemisterRagistration } from "./semisterRagistration.interface";
import { SemisterRegistrationModel } from "./semisterRagistration.model";

const createRegistrationIntoDB = async (payload: TSemisterRagistration) => {
  const { academicSemister } = payload;

  const isTHereAnyUpcomingOrOnging = await SemisterRegistrationModel.findOne({
    $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
  });

  if (isTHereAnyUpcomingOrOnging) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isTHereAnyUpcomingOrOnging.status} semister exist!!`
    );
  }

  if (!academicSemister) {
    throw new AppError(httpStatus.NOT_FOUND, "Semister is not found!!");
  }

  const isSemisterRegistrationExist = await SemisterRegistrationModel.findOne({
    academicSemister,
  });

  if (isSemisterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, "Semister is already registered!!");
  }

  return await SemisterRegistrationModel.create(payload);
};

const getAllSemisterRegistration = async (query: Record<string, unknown>) => {
  const semisterRegisterationQuery = new QueryBuilder(
    SemisterRegistrationModel.find().populate({ path: "academicSemister" }),
    query
  )
    .search(["status"])
    .filter()
    .sort()
    .paginate()
    .fields();

  return await semisterRegisterationQuery.modelQuery;
};

const getSingleSemisterRegistration = async (id: string) => {
  const result =
    await SemisterRegistrationModel.findById(id).populate("academicSemister");

  return result;
};

const updateSemisterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemisterRagistration>
) => {
  const currentRequestedSemisterForRegistration =
    await SemisterRegistrationModel.findById(id);
  const requestedSemisterStatus = payload?.status;

  if (!currentRequestedSemisterForRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, `Semister Not Found`);
  }

  if (currentRequestedSemisterForRegistration?.status === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semister is already ended`
    );
  }

  if (
    currentRequestedSemisterForRegistration?.status ===
      SemisterRegistrationStatus.UPCOMING &&
    requestedSemisterStatus === SemisterRegistrationStatus?.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't derectly update ${currentRequestedSemisterForRegistration?.status} to ${requestedSemisterStatus}`
    );
  }

  if (
    currentRequestedSemisterForRegistration?.status ===
      SemisterRegistrationStatus.ONGOING &&
    requestedSemisterStatus === SemisterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't derectly update ${currentRequestedSemisterForRegistration?.status} to ${requestedSemisterStatus}`
    );
  }

  const result = await SemisterRegistrationModel.findByIdAndUpdate(
    id,
    payload
  ).populate("academicSemister");

  return result;
};

export const semisterRagistrationServices = {
  createRegistrationIntoDB,
  getAllSemisterRegistration,
  getSingleSemisterRegistration,
  updateSemisterRegistrationIntoDB,
};
