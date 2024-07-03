import jwt, { TokenExpiredError } from "jsonwebtoken";
import { BadRequestException } from "../errors/badRequest-error";

export default class JwtToken {
  static signToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "5m" });
  }

  static verifyToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_KEY!);
      return data;
    } catch (error: any) {
      if (error instanceof TokenExpiredError)
        throw new BadRequestException("Expired token, please sign in again.");

      throw new BadRequestException("Invalid or missing token.");
    }
  }
}
