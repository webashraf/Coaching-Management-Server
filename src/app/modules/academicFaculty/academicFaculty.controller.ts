import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Academic faculty successfully created!!",
      data: result,
    });
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.getAllFacultiesFromDB();
    res.status(200).json({
      success: true,
      message: "Academic faculties successfully retrieved!!",
      data: result,
    });
  }
);

const getSignleFacultyByID = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.getSignleFacultyByID(
    req.params.facultyId
  );
  res.status(200).json({
    success: true,
    message: "Academic faculty retrived successfully!!",
    data: result,
  });
});

const updateSignleFacultyByID = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.updateSignleFacultyByID(
      req.params.facultyId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Academic faculty updated successfully!!",
      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSignleFacultyByID,
  updateSignleFacultyByID,
};
