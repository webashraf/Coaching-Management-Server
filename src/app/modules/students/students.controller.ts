import catchAsync from "../../utils/catchAsync";
import { studentsService } from "./students.service";

const getAllStudents = catchAsync(async (req, res) => {
  const query = req?.query;
  // console.log(query);
  const result = await studentsService.getAllStudentsFromDB(query);
  res.status(200).json({
    success: true,
    message: "Data is successfully retrieved",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const result = await studentsService.getSingleStudentFromDB(
    req.params.studentId
  );
  res.status(200).json({
    success: true,
    message: "Data is successfully retrieved",
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const result = await studentsService.deleteStudentFromDB(
    req.params.studentId
  );
  res.status(200).json({
    success: true,
    message: "Data is successfully deleted",
    data: result,
  });
});
const updateSingleStudent = catchAsync(async (req, res) => {
  // console.log("Hello from the controller", req.params.studentId, req.body);
  const result = await studentsService.updateSingleStudentFromDB(
    req.params.studentId,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Data is successfully updated",
    data: result,
  });
});

export const studentsController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
