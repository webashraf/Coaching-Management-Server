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

export const academicSemisterConstroller = {
  createAcademicSemister,
};
