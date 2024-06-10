import express, { Request, Response } from "express";
import { body, cookie } from "express-validator";
import { User } from "../models/user";
import { BadRequestException } from "../errors/badRequest-error";
import { PasswordService } from "../services/password";
import JwtToken from "../services/jwt";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email")
      .notEmpty()
      .withMessage("Email must be provided.")
      .isEmail()
      .withMessage("Invalid email."),
    body("password")
      .notEmpty()
      .withMessage("Password must be provided.")
      .trim()
      .isStrongPassword(),
  ],
  async (req: Request, res: Response) => {
    // 1) verify email
    req.session = null;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new BadRequestException("Invalid Credentials.");

    // 2) verify password
    const isPasswordCorrect = await PasswordService.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect)
      throw new BadRequestException("Invalid Credentials.");

    // 3) create jwt and set it on the cookie
    const jwt = JwtToken.signToken({ id: user.id, email: user.email });
    req.session = { jwt };
    res.status(200).send(user);
  }
);

export { router as signinRouter };
