import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicSemisterService } from "./academicSemister.service";

const createAcademicSemister = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemisterService.createAcademicSemisterIntoDB(
      req.body
    );
    res.status(200).json({
      success: true,
      message: "academicSemister created successfully!!",
      data: result,
    });
  }
);

const retriveSemisters = catchAsync(async (req: Request, res: Response) => {
  const semisterId = req.params.semesterld || null;

  const result = await academicSemisterService.retriveSemistersFromDB(
    req.query
  );
  res.status(200).json({
    success: true,
    message: "academicSemister retrieved successfully!!",
    data: result,
  });
});

const updateSingleSemister = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemisterService.updateSingleSemisterIntoDB(
    req.params.semesterld,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "academicSemister retrieved successfully!!",
    data: result,
  });
});

export const academicSemisterConstroller = {
  createAcademicSemister,
  retriveSemisters,
  updateSingleSemister,
};
