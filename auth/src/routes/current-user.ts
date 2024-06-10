import express, { Request, Response } from "express";
import { UnauthorizedException } from "../errors/unuthorized-error";
import JwtToken from "../services/jwt";

const router = express.Router();

router.get("/api/users/current", (req: Request, res: Response) => {
  // extract jwt from user and validate it
  if (!req.session?.jwt) throw new UnauthorizedException();

  const jwt = req.session?.jwt;
  const user = JwtToken.verifyToken(jwt);

  res.send(user);
});

export { router as currentUserRouter };
