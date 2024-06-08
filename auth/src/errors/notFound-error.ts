import { CustomError } from "./custom-error";

export class NotfoundException extends CustomError {
  statusCode = 404;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotfoundException.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Path Not found",
      },
    ];
  }
}
