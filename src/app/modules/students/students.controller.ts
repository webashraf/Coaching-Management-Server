import catchAsync from "../../utils/catchAsync";
import { studentsService } from "./students.service";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentsService.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: "Data is successfully retrieved",
    data: result,
  });
});

export const studentsController = {
  getAllStudents,
};
