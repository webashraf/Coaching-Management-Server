import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/glovalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use("/api/v1/", router);

const test = async (req: Request, res: Response) => {
  res.send("Server is reunning");
  Promise.reject();
};

app.get("/", test);

app.use(globalErrorHandler);
export default app;
