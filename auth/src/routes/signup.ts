import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ValidationException } from "../errors/validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters")
      .isStrongPassword()
      .withMessage("Password must be strong"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationException(errors.array());
    }

    res.send("signup");
  }
);

export { router as signupRouter };
