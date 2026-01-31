import { Response } from "express";

export const sendResponse = (
  res: Response,
  success: boolean,
  message: string,
  statusCode: number,
  data: any = null
) => {
  const response: any = {
    success,
    message,
    statusCode,
  };

  if (data !== null) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};