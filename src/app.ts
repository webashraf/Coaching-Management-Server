import express, { Application, Request, Response } from "express";
import cors from "cors";
import { studentsRoute } from "./app/modules/students/students.routes";
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.use("/api/v1/students", studentsRoute);

const getAController = (req: Request, res: Response) => {
  res.send("Server is reunning");
};

app.get("/", getAController);

export default app;
