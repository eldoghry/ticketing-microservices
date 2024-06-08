import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  return res.status(400).json({
    errors: [
      {
        message: err.message || "An unknown error occurred",
      },
    ],
  });
};

export default errorHandler;
