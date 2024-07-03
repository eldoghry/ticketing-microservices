import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import JwtToken from "../services/jwt";
import ValidationMiddleware from "../middlewares/validation";
import { BadRequestException } from "../errors/badRequest-error";

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
  ValidationMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // 2) check if email already used before
    const user = await User.findOne({ email });
    if (user) throw new BadRequestException("Email is already in use");

    // 3) hash password & create user
    const result = await User.build({ email, password }).save();

    // 4) create jwt token
    const jwt = JwtToken.signToken({ id: result.id, email: result.email });

    // 5) set cookies with jwt
    req.session = { ...req.session, jwt };
    res.status(201).send(result);
  }
);

export { router as signupRouter };
