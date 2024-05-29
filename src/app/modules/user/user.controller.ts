import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";

const createNewUser = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await userService.createStudentIntoDB(password, student);
  res.status(200).json({
    succcess: true,
    message: "Student is created successfully",
    data: result,
  });
});

export const userController = {
  createNewUser,
};
