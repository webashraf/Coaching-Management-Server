import { Request, Response } from "express";
import { studentsService } from "./students.service";
import { z } from "zod";
import studentsValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // Student  data validation by jod validaion library
    const studentData = req.body.student;

    const zodParsedData = studentsValidationSchema.parse(studentData);

    const result = await studentsService.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      succcess: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentsService.getAllStudentsFromDB();
    // return result;
    res.status(200).json({
      success: true,
      message: "Data is successfully retrieved",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentsController = {
  createStudent,
  getAllStudents,
};
