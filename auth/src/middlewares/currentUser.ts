import { Request, Response, NextFunction } from "express";
import JwtToken from "../services/jwt";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const CurrentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = req.session?.jwt;
  const user = JwtToken.verifyToken(jwt) as UserPayload;

  req.currentUser = user;

  next();
};

export default CurrentUserMiddleware;
