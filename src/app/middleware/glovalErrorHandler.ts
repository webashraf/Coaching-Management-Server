import { Request, Response } from "express";

const glovalErrorHandler = (err: any, req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: err,
  });
};

export const glovalError = glovalErrorHandler;
