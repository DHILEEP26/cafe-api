import { Request, Response, NextFunction } from "express";
import * as MenuCategoryService from "../services/menuCategoryService";
import { sendResponse, extractErrorMessage } from "../utils/responseHandler";
import {
  validateCreateMenuCategory,
  validateUpdateMenuCategory,
} from "../dto/menuCategoryDTO";
import { AppError } from "../utils/errorHandler";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const includeInactive = req.query.includeInactive === "true";
    const categories = await MenuCategoryService.getAllCategories(
      includeInactive
    );

    sendResponse(
      res,
      true,
      "Categories retrieved successfully",
      200,
      categories
    );
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const category = await MenuCategoryService.getCategoryById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    sendResponse(res, true, "Category retrieved successfully", 200, category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validateCreateMenuCategory(req.body);

    if (!validation.isValid) {
      throw new AppError(validation.errors.join(", "), 400);
    }

    const category = await MenuCategoryService.createCategory(req.body);

    sendResponse(res, true, "Category created successfully", 201, category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const validation = validateUpdateMenuCategory(req.body);

    if (!validation.isValid) {
      throw new AppError(validation.errors.join(", "), 400);
    }

    const category = await MenuCategoryService.updateCategory(id, req.body);

    sendResponse(res, true, "Category updated successfully", 200, category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    await MenuCategoryService.deleteCategory(id);

    sendResponse(res, true, "Category deleted successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const toggleCategoryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid category ID", 400);
    }

    const category = await MenuCategoryService.toggleCategoryStatus(id);

    sendResponse(
      res,
      true,
      `Category ${category.is_active ? "activated" : "deactivated"} successfully`,
      200,
      category
    );
  } catch (error) {
    next(error);
  }
};