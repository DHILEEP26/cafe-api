"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCategoryStatus = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllCategories = async (includeInactive = false) => {
    const where = includeInactive
        ? {}
        : { is_active: true };
    return prisma.menuCategory.findMany({
        where,
        orderBy: {
            display_order: "asc",
        },
        include: {
            _count: {
                select: { menuItems: true },
            },
        },
    });
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    return prisma.menuCategory.findUnique({
        where: { id },
        include: {
            menuItems: {
                where: { is_available: true },
                orderBy: { name: "asc" },
            },
        },
    });
};
exports.getCategoryById = getCategoryById;
const createCategory = async (data) => {
    return prisma.menuCategory.create({
        data,
    });
};
exports.createCategory = createCategory;
const updateCategory = async (id, data) => {
    return prisma.menuCategory.update({
        where: { id },
        data,
    });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    await prisma.menuCategory.delete({
        where: { id },
    });
};
exports.deleteCategory = deleteCategory;
const toggleCategoryStatus = async (id) => {
    const category = await prisma.menuCategory.findUnique({
        where: { id },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    return prisma.menuCategory.update({
        where: { id },
        data: { is_active: !category.is_active },
    });
};
exports.toggleCategoryStatus = toggleCategoryStatus;
//# sourceMappingURL=menuCategoryService.js.map