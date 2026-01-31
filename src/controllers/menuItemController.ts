import { Request, Response, NextFunction } from "express";
import * as MenuItemService from "../services/menuItemService";
import { sendResponse, extractErrorMessage } from "../utils/responseHandler";
import {
  validateCreateMenuItem,
  validateUpdateMenuItem,
} from "../dto/menuItemDTO";
import { AppError } from "../utils/errorHandler";

export const getAllMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      categoryId,
      includeUnavailable,
      page,
      limit,
      searchTerm,
    } = req.query;

    const params: any = {
      categoryId: categoryId ? parseInt(categoryId as string) : undefined,
      includeUnavailable: includeUnavailable === "true",
      searchTerm: searchTerm as string,
    };

    if (page !== undefined) {
      params.page = parseInt(page as string);
    }
    if (limit !== undefined) {
      params.limit = parseInt(limit as string);
    }

    const result = await MenuItemService.getAllMenuItems(params);

    // Check if paginated response
    if (Array.isArray(result)) {
      sendResponse(res, true, "Menu items retrieved successfully", 200, result);
    } else {
      res.status(200).json({
        success: true,
        message: "Menu items retrieved successfully",
        data: result.menuItems,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getMenuItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid menu item ID", 400);
    }

    const menuItem = await MenuItemService.getMenuItemById(id);

    if (!menuItem) {
      throw new AppError("Menu item not found", 404);
    }

    sendResponse(res, true, "Menu item retrieved successfully", 200, menuItem);
  } catch (error) {
    next(error);
  }
};

export const getMenuItemsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categoryId = parseInt(req.params.categoryId as string);

    if (isNaN(categoryId)) {
      throw new AppError("Invalid category ID", 400);
    }

    const menuItems = await MenuItemService.getMenuItemsByCategory(categoryId);

    sendResponse(
      res,
      true,
      "Menu items retrieved successfully",
      200,
      menuItems
    );
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validateCreateMenuItem(req.body);

    if (!validation.isValid) {
      throw new AppError(validation.errors.join(", "), 400);
    }

    const menuItem = await MenuItemService.createMenuItem(req.body);

    sendResponse(res, true, "Menu item created successfully", 201, menuItem);
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid menu item ID", 400);
    }

    const validation = validateUpdateMenuItem(req.body);

    if (!validation.isValid) {
      throw new AppError(validation.errors.join(", "), 400);
    }

    const menuItem = await MenuItemService.updateMenuItem(id, req.body);

    sendResponse(res, true, "Menu item updated successfully", 200, menuItem);
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid menu item ID", 400);
    }

    await MenuItemService.deleteMenuItem(id);

    sendResponse(res, true, "Menu item deleted successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const toggleMenuItemAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      throw new AppError("Invalid menu item ID", 400);
    }

    const menuItem = await MenuItemService.toggleMenuItemAvailability(id);

    sendResponse(
      res,
      true,
      `Menu item ${menuItem.is_available ? "made available" : "made unavailable"}`,
      200,
      menuItem
    );
  } catch (error) {
    next(error);
  }
};