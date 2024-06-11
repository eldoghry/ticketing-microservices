import express, { Request, Response } from "express";
import { UnauthorizedException } from "../errors/unuthorized-error";
import JwtToken from "../services/jwt";
import isAuthenticatedMiddleware from "../middlewares/isAuthenticated";
import CurrentUserMiddleware from "../middlewares/currentUser";

const router = express.Router();

router.get(
  "/api/users/current",
  isAuthenticatedMiddleware,
  CurrentUserMiddleware,
  (req: Request, res: Response) => {
    res.status(200).send({ user: req.currentUser || null });
  }
);

export { router as currentUserRouter };
