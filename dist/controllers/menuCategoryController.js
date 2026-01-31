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
exports.toggleCategoryStatus = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const MenuCategoryService = __importStar(require("../services/menuCategoryService"));
const responseHandler_1 = require("../utils/responseHandler");
const menuCategoryDTO_1 = require("../dto/menuCategoryDTO");
const errorHandler_1 = require("../utils/errorHandler");
const getAllCategories = async (req, res, next) => {
    try {
        const includeInactive = req.query.includeInactive === "true";
        const categories = await MenuCategoryService.getAllCategories(includeInactive);
        (0, responseHandler_1.sendResponse)(res, true, "Categories retrieved successfully", 200, categories);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid category ID", 400);
        }
        const category = await MenuCategoryService.getCategoryById(id);
        if (!category) {
            throw new errorHandler_1.AppError("Category not found", 404);
        }
        (0, responseHandler_1.sendResponse)(res, true, "Category retrieved successfully", 200, category);
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res, next) => {
    try {
        const validation = (0, menuCategoryDTO_1.validateCreateMenuCategory)(req.body);
        if (!validation.isValid) {
            throw new errorHandler_1.AppError(validation.errors.join(", "), 400);
        }
        const category = await MenuCategoryService.createCategory(req.body);
        (0, responseHandler_1.sendResponse)(res, true, "Category created successfully", 201, category);
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid category ID", 400);
        }
        const validation = (0, menuCategoryDTO_1.validateUpdateMenuCategory)(req.body);
        if (!validation.isValid) {
            throw new errorHandler_1.AppError(validation.errors.join(", "), 400);
        }
        const category = await MenuCategoryService.updateCategory(id, req.body);
        (0, responseHandler_1.sendResponse)(res, true, "Category updated successfully", 200, category);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid category ID", 400);
        }
        await MenuCategoryService.deleteCategory(id);
        (0, responseHandler_1.sendResponse)(res, true, "Category deleted successfully", 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
const toggleCategoryStatus = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.AppError("Invalid category ID", 400);
        }
        const category = await MenuCategoryService.toggleCategoryStatus(id);
        (0, responseHandler_1.sendResponse)(res, true, `Category ${category.is_active ? "activated" : "deactivated"} successfully`, 200, category);
    }
    catch (error) {
        next(error);
    }
};
exports.toggleCategoryStatus = toggleCategoryStatus;
//# sourceMappingURL=menuCategoryController.js.map