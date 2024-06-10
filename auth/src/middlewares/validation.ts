import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { validationResult } from "express-validator";
import { ValidationException } from "../errors/validation-error";

const ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationException(errors.array());

  next();
};

export default ValidationMiddleware;
