import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/glovalErrorHandler";
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

const test =  async (req: Request, res: Response) => {
  res.send("Server is reunning");
  Promise.reject()
};

app.get("/", test);

app.use(globalErrorHandler);
export default app;
