import jwt, { TokenExpiredError } from "jsonwebtoken";
import { BadRequestException } from "../errors/badRequest-error";

export default class JwtToken {
  private static secret: string = process.env.JWT_KEY!;

  static signToken(payload: object) {
    return jwt.sign(payload, this.secret, { expiresIn: "10s" });
  }

  static verifyToken(token: string) {
    try {
      const data = jwt.verify(token, this.secret);
      return data;
    } catch (error: any) {
      if (error instanceof TokenExpiredError)
        throw new BadRequestException("Expired token, please sign in again.");

      throw new BadRequestException("Invalid or missing token.");
    }
  }
}
