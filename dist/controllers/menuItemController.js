"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMenuItemAvailability = exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItemsByCategory = exports.getMenuItemById = exports.getAllMenuItems = void 0;
const MenuItemService = __importStar(require("../services/menuItemService"));
const responseHandler_1 = require("../utils/responseHandler");
const menuItemDTO_1 = require("../dto/menuItemDTO");
const errorHandler_1 = require("../utils/errorHandler");
const getAllMenuItems = async (req, res, next) => {
    try {
        const { categoryId, includeUnavailable, page, limit, searchTerm, } = req.query;
        const params = {
            categoryId: categoryId ? parseInt(categoryId) : undefined,
            includeUnavailable: includeUnavailable === "true",
            searchTerm: searchTerm,
        };
        if (page !== undefined) {
            params.page = parseInt(page);
        }
        if (limit !== undefined) {
            params.limit = parseInt(limit);
        }
        const result = await MenuItemService.getAllMenuItems(params);
        // Check if paginated response
        if (Array.isArray(result)) {
            (0, responseHandler_1.sendResponse)(res, true, "Menu items retrieved successfully", 200, result);
        }
        else {
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
    }
    catch (error) {
        next(error);
    }
};
exports.getAllMenuItems = getAllMenuItems;
const getMenuItemById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid menu item ID", 400);
        }
        const menuItem = await MenuItemService.getMenuItemById(id);
        if (!menuItem) {
            throw new errorHandler_1.AppError("Menu item not found", 404);
        }
        (0, responseHandler_1.sendResponse)(res, true, "Menu item retrieved successfully", 200, menuItem);
    }
    catch (error) {
        next(error);
    }
};
exports.getMenuItemById = getMenuItemById;
const getMenuItemsByCategory = async (req, res, next) => {
    try {
        const categoryId = parseInt(req.params.categoryId);
        if (isNaN(categoryId)) {
            throw new errorHandler_1.AppError("Invalid category ID", 400);
        }
        const menuItems = await MenuItemService.getMenuItemsByCategory(categoryId);
        (0, responseHandler_1.sendResponse)(res, true, "Menu items retrieved successfully", 200, menuItems);
    }
    catch (error) {
        next(error);
    }
};
exports.getMenuItemsByCategory = getMenuItemsByCategory;
const createMenuItem = async (req, res, next) => {
    try {
        const validation = (0, menuItemDTO_1.validateCreateMenuItem)(req.body);
        if (!validation.isValid) {
            throw new errorHandler_1.AppError(validation.errors.join(", "), 400);
        }
        const menuItem = await MenuItemService.createMenuItem(req.body);
        (0, responseHandler_1.sendResponse)(res, true, "Menu item created successfully", 201, menuItem);
    }
    catch (error) {
        next(error);
    }
};
exports.createMenuItem = createMenuItem;
const updateMenuItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid menu item ID", 400);
        }
        const validation = (0, menuItemDTO_1.validateUpdateMenuItem)(req.body);
        if (!validation.isValid) {
            throw new errorHandler_1.AppError(validation.errors.join(", "), 400);
        }
        const menuItem = await MenuItemService.updateMenuItem(id, req.body);
        (0, responseHandler_1.sendResponse)(res, true, "Menu item updated successfully", 200, menuItem);
    }
    catch (error) {
        next(error);
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid menu item ID", 400);
        }
        await MenuItemService.deleteMenuItem(id);
        (0, responseHandler_1.sendResponse)(res, true, "Menu item deleted successfully", 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMenuItem = deleteMenuItem;
const toggleMenuItemAvailability = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid menu item ID", 400);
        }
        const menuItem = await MenuItemService.toggleMenuItemAvailability(id);
        (0, responseHandler_1.sendResponse)(res, true, `Menu item ${menuItem.is_available ? "made available" : "made unavailable"}`, 200, menuItem);
    }
    catch (error) {
        next(error);
    }
};
exports.toggleMenuItemAvailability = toggleMenuItemAvailability;
//# sourceMappingURL=menuItemController.js.map