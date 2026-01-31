"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateMenuCategory = exports.validateCreateMenuCategory = void 0;
const validateCreateMenuCategory = (data) => {
    const errors = [];
    if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
        errors.push("Name is required and must be a non-empty string");
    }
    if (data.name && data.name.length > 100) {
        errors.push("Name must not exceed 100 characters");
    }
    if (data.display_order !== undefined &&
        (typeof data.display_order !== "number" || data.display_order < 0)) {
        errors.push("Display order must be a non-negative number");
    }
    if (data.is_active !== undefined &&
        typeof data.is_active !== "boolean") {
        errors.push("is_active must be a boolean");
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
};
exports.validateCreateMenuCategory = validateCreateMenuCategory;
const validateUpdateMenuCategory = (data) => {
    const errors = [];
    if (data.name !== undefined) {
        if (typeof data.name !== "string" || data.name.trim() === "") {
            errors.push("Name must be a non-empty string");
        }
        if (data.name && data.name.length > 100) {
            errors.push("Name must not exceed 100 characters");
        }
    }
    if (data.display_order !== undefined &&
        (typeof data.display_order !== "number" || data.display_order < 0)) {
        errors.push("Display order must be a non-negative number");
    }
    if (data.is_active !== undefined &&
        typeof data.is_active !== "boolean") {
        errors.push("is_active must be a boolean");
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
};
exports.validateUpdateMenuCategory = validateUpdateMenuCategory;
//# sourceMappingURL=menuCategoryDTO.js.map