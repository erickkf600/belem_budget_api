"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const Logger = use("Logger");
const Env = use("Env");

class ErrorException extends LogicalException {
  handle(error, { response }) {
    let status = error.message.status;
    switch (error.message.code) {
      case 4:
        status = 409;
        error.message.errType = "NotFoundError";
        break;
      case 5:
        status = 409;
        error.message.errType = "ValidationError";
        break;
      case 6:
        status = 409;
        error.message.errType = "DatabaseError";
        break;
      case 7:
        status = 401;
        error.message.errType = "PermissionError";
        break;
      case 8:
        status = 409;
        error.message.errType = "AuthError";
        break;
      case 9:
        status = 409;
        error.message.errType = "AuthValidationError";
        break;
      case 10:
        status = 409;
        error.message.errType = "RegisterError";
        break;
      case 13:
        status = 409;
        error.message.errType = "AuthValidationError";
        break;
      case 14:
        status = 409;
        error.message.errType = "AuthBlocked";
        break;
      case 15:
        status = 401;
        error.message.errType = "OriginPermissionError";
        break;
      default:
        status = 500;
        error.message.errType = "GenericError";
        break;
    }

    if (Env.get("NODE_ENV") !== "development") {
      error.message.details.stackTrace = "Only available in Development mode";
    }

    response.status(status).send({ error: error.message });
  }

  report(error, request) {
    Logger.transport("file").error("ErrorException Logger", {
      error: error.message,
    });
    Logger.transport("console").error("ErrorException Logger", {
      error: error.message,
    });
  }
}

module.exports = ErrorException;
