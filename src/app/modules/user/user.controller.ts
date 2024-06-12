import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/utils";
import { userService } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await userService.createStudentIntoDB(password, student);
  res.status(200).json({
    succcess: true,
    message: "Student is created successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
