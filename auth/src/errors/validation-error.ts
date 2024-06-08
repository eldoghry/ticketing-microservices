import { FieldValidationError, ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class ValidationException extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ValidationException.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      const err = error as FieldValidationError;
      return {
        message: err.msg,
        field: err.path,
      };
    });
  }
}
