import express, { Express, Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import errorHandler from "./middlewares/error-handler";
import { NotfoundException } from "./errors/notFound-error";
import cookieSession from "cookie-session";

const app: Express = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
    secret: "cookie-secret",
  })
);

if (!process.env.JWT_KEY && process.env.NODE_ENV !== "test") {
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

app.use(errorHandler);

export { app };
