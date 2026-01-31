import { PrismaClient, MenuItem, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface GetMenuItemsParams {
  categoryId?: number;
  includeUnavailable?: boolean;
  page?: number;
  limit?: number;
  searchTerm?: string;
}

interface PaginatedMenuItems {
  menuItems: MenuItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getAllMenuItems = async ({
  categoryId,
  includeUnavailable = false,
  page,
  limit,
  searchTerm = "",
}: GetMenuItemsParams = {}): Promise<PaginatedMenuItems | MenuItem[]> => {
  const where: Prisma.MenuItemWhereInput = {
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

export const getMenuItemById = async (id: number): Promise<MenuItem | null> => {
  return prisma.menuItem.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

export const createMenuItem = async (
  data: Omit<MenuItem, "id" | "created_at" | "updated_at">
): Promise<MenuItem> => {
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

export const updateMenuItem = async (
  id: number,
  data: Partial<MenuItem>
): Promise<MenuItem> => {
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

export const deleteMenuItem = async (id: number): Promise<void> => {
  await prisma.menuItem.delete({
    where: { id },
  });
};

export const toggleMenuItemAvailability = async (
  id: number
): Promise<MenuItem> => {
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

export const getMenuItemsByCategory = async (
  categoryId: number
): Promise<MenuItem[]> => {
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