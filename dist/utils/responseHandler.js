"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractErrorMessage = exports.sendResponse = void 0;
const sendResponse = (res, success, message, statusCode, data = null) => {
    const response = {
        success,
        message,
        statusCode,
    };
    if (data !== null) {
        response.data = data;
    }
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
const extractErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return "An unknown error occurred";
};
exports.extractErrorMessage = extractErrorMessage;
//# sourceMappingURL=responseHandler.js.map