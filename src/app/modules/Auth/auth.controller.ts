import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  res.status(200).json({
    succcess: true,
    message: "User is logged in succesfully!",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  res.status(200).json({
    succcess: true,
    message: "Password is updated succesfully!",
    data: passwordData,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  res.status(200).json({
    succcess: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
