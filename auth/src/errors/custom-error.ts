interface ICustomError {
  message: string;
  field?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): ICustomError[];
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
