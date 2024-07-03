import { CustomError } from "./custom-error";

export class UnauthorizedException extends CustomError {
  statusCode = 401;

  constructor() {
    super();
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "You are not authorized to access this recourse.",
      },
    ];
  }
}
