const { fail } = require("../utils/response");

const notFound = (req, res, next) => {
  return fail(
    res,
    `Route not found: ${req.originalUrl}`,
    404
  );
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  let message = err.message || "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "This record already exists.";
  }

  return fail(res, message, statusCode);
};

module.exports = { notFound, errorHandler };