import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../errors/unuthorized-error";

const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // extract jwt from user and validate it
  if (!req.session?.jwt) throw new UnauthorizedException();

  next();
};

export default isAuthenticatedMiddleware;
