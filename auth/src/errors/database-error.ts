import { CustomError } from "./custom-error";

export class DatabaseConnectionException extends CustomError {
  statusCode = 500;

  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionException.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Database connection error",
      },
    ];
  }
}
