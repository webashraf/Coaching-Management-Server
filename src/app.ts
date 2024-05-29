import express, { Application, Request, Response } from "express";
import cors from "cors";
import { studentsRoute } from "./app/modules/students/students.routes";
import { userRoute } from "./app/modules/user/user.routes";
import { glovalError } from "./app/middleware/glovalErrorHandler";
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

app.use("/api/v1/students", studentsRoute);
app.use("/api/v1/user", userRoute);

const getAController = (req: Request, res: Response) => {
  res.send("Server is reunning");
};

app.get("/", getAController);


app.use(glovalError);
export default app;
