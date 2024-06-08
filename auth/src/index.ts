import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();
app.use(express.json());
const PORT = 4001;

app.use(morgan("dev"));

app.get("/api/users", (req: Request, res: Response) => {
  console.log("Hello World");
  res.send("Hello World");
});

app.get("/", (req: Request, res: Response) => {
  console.log("Hello World//");
  res.send("Hello World //");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
