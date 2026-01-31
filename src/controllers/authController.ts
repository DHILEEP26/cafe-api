import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/authService";
import { sendResponse } from "../utils/responseHandler";
import { validateRegisterAdmin, validateLoginAdmin } from "../dto/authDTO";
import { AppError } from "../utils/errorHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validateRegisterAdmin(req.body);

    if (!validation.isValid) {
      throw new AppError(validation.errors.join(", "), 400);
    }

    const { email, password, role } = req.body;

    const user = await AuthService.registerAdmin(email, password, role);

    sendResponse(res, true, "Admin registered successfully", 201, user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validateLoginAdmin(req.body);

    if (!validation.isValid) {
      throw new AppError(validation.errors.join(", "), 400);
    }

    const { email, password } = req.body;

    const result = await AuthService.loginAdmin(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await AuthService.getAdminById(req.user.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    sendResponse(res, true, "Profile retrieved successfully", 200, user);
  } catch (error) {
    next(error);
  }
};