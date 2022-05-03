import CustomError from "./CustomError";

export default class ServerError extends CustomError {
  statusCode = 500;
  reason = "Server error.";

  constructor() {
    super("Server error.");

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors = () => {
    return [{ message: this.reason }];
  };
}
