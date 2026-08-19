import { ApiError } from "../utils/api-error.js";

export function errorMiddleware(error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}
