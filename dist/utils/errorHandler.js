"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const client_1 = require("@prisma/client");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Internal server error";
    let success = false;
    // Handle custom AppError
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Handle Prisma errors
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            message = `Duplicate field value: ${err.meta?.target}`;
        }
        else if (err.code === "P2025") {
            statusCode = 404;
            message = "Record not found";
        }
        else if (err.code === "P2003") {
            statusCode = 400;
            message = "Foreign key constraint failed";
        }
        else {
            message = "Database error occurred";
        }
    }
    // Handle Prisma validation errors
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid data provided";
    }
    // Handle JWT errors
    else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }
    else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }
    // Handle generic errors
    else if (err instanceof Error) {
        message = err.message;
    }
    // Log error in development
    if (process.env.NODE_ENV === "development") {
        console.error("Error:", err);
    }
    res.status(statusCode).json({
        success,
        message,
        statusCode,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map