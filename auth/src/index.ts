import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const PORT = 4001;
const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
