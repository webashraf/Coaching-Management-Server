import catchAsync from "../../utils/catchAsync";
import { semisterRagistrationServices } from "./semisterRagistration.service";

const createRegistration = catchAsync(async (req, res) => {
  const result = await semisterRagistrationServices.createRegistrationIntoDB(
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Semister registerd successfully!!",
    data: result,
  });
});

const retrivedAllRegisterdSemister = catchAsync(async (req, res) => {
  const result = await semisterRagistrationServices.getAllSemisterRegistration(
    req.params
  );
  res.status(200).json({
    success: true,
    message: "Semister's is retrived successfully!!",
    data: result,
  });
});

const retrivedSingleRegisterdSemister = catchAsync(async (req, res) => {
  const result =
    await semisterRagistrationServices.getSingleSemisterRegistration(
      req.params.id
    );
  res.status(200).json({
    success: true,
    message: "Semister retrived successfully!!",
    data: result,
  });
});

const updateSemisterResgistration = catchAsync(async (req, res) => {
  const result =
    await semisterRagistrationServices.updateSemisterRegistrationIntoDB(
      req.params.id, req.body
    );
  res.status(200).json({
    success: true,
    message: "Semister retrived successfully!!",
    data: result,
  });
});

export const semisterRegistrationController = {
  createRegistration,
  retrivedAllRegisterdSemister,
  retrivedSingleRegisterdSemister,
  updateSemisterResgistration,
};
