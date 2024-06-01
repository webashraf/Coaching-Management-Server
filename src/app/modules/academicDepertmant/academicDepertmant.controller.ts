import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentService } from "./academicDepertmant.service";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Academic department successfully created!!",
      data: result,
    });
  }
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getAllDepartmentFromDB();
    res.status(200).json({
      success: true,
      message: "Academic departments successfully retrieved!!",
      data: result,
    });
  }
);

const getSignleDepartmentByID = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getSignleDepartmentByID(
      req.params.departmentId
    );
    res.status(200).json({
      success: true,
      message: "Academic department retrived successfully!!",
      data: result,
    });
  }
);

const updateSignleDepartmentByID = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.updateSignleDepartmentByID(
      req.params.departmentId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Academic department updated successfully!!",
      data: result,
    });
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSignleDepartmentByID,
  updateSignleDepartmentByID,
};
