import express, { Express, Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import errorHandler from "./middlewares/error-handler";
import { NotfoundException } from "./errors/notFound-error";
import { DatabaseConnectionException } from "./errors/database-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const PORT = 4001;
const app: Express = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
    secret: "cookie-secret",
  })
);

if (!process.env.JWT_KEY) {
  throw new Error("JWT_secret environment variable not set.");
}

app.use(morgan("dev"));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", (req: Request, res: Response) => {
  throw new NotfoundException();
});

async function start() {
  try {
    await mongoose.connect(
      "mongodb://ticketing-auth-mongo-cluster-ip-srv:27017/ticketing-auth"
    );
    console.log("Connected to database.");
  } catch (e) {
    console.log(e);
    throw new DatabaseConnectionException();
  }
}

start();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
