"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuItemsByCategory = exports.toggleMenuItemAvailability = exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getMenuItemById = exports.getAllMenuItems = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllMenuItems = async ({ categoryId, includeUnavailable = false, page, limit, searchTerm = "", } = {}) => {
    const where = {
        AND: [
            categoryId ? { category_id: categoryId } : {},
            !includeUnavailable ? { is_available: true } : {},
            searchTerm
                ? {
                    OR: [
                        {
                            name: {
                                contains: searchTerm,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: searchTerm,
                                mode: "insensitive",
                            },
                        },
                    ],
                }
                : {},
        ],
    };
    const total = await prisma.menuItem.count({ where });
    // If no pagination, return all items
    if (!page || !limit) {
        const menuItems = await prisma.menuItem.findMany({
            where,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        is_active: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
        return menuItems;
    }
    // With pagination
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, limit);
    const skip = (validPage - 1) * validLimit;
    const menuItems = await prisma.menuItem.findMany({
        where,
        skip,
        take: validLimit,
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    is_active: true,
                },
            },
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return {
        menuItems,
        total,
        page: validPage,
        limit: validLimit,
        totalPages: Math.ceil(total / validLimit),
    };
};
exports.getAllMenuItems = getAllMenuItems;
const getMenuItemById = async (id) => {
    return prisma.menuItem.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });
};
exports.getMenuItemById = getMenuItemById;
const createMenuItem = async (data) => {
    // Verify category exists and is active
    const category = await prisma.menuCategory.findUnique({
        where: { id: data.category_id },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    if (!category.is_active) {
        throw new Error("Cannot add items to inactive category");
    }
    return prisma.menuItem.create({
        data,
        include: {
            category: true,
        },
    });
};
exports.createMenuItem = createMenuItem;
const updateMenuItem = async (id, data) => {
    // If updating category, verify it exists and is active
    if (data.category_id) {
        const category = await prisma.menuCategory.findUnique({
            where: { id: data.category_id },
        });
        if (!category) {
            throw new Error("Category not found");
        }
        if (!category.is_active) {
            throw new Error("Cannot move item to inactive category");
        }
    }
    return prisma.menuItem.update({
        where: { id },
        data,
        include: {
            category: true,
        },
    });
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (id) => {
    await prisma.menuItem.delete({
        where: { id },
    });
};
exports.deleteMenuItem = deleteMenuItem;
const toggleMenuItemAvailability = async (id) => {
    const menuItem = await prisma.menuItem.findUnique({
        where: { id },
    });
    if (!menuItem) {
        throw new Error("Menu item not found");
    }
    return prisma.menuItem.update({
        where: { id },
        data: { is_available: !menuItem.is_available },
        include: {
            category: true,
        },
    });
};
exports.toggleMenuItemAvailability = toggleMenuItemAvailability;
const getMenuItemsByCategory = async (categoryId) => {
    return prisma.menuItem.findMany({
        where: {
            category_id: categoryId,
            is_available: true,
        },
        orderBy: {
            name: "asc",
        },
    });
};
exports.getMenuItemsByCategory = getMenuItemsByCategory;
//# sourceMappingURL=menuItemService.js.map