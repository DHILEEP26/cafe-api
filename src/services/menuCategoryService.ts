import { PrismaClient, MenuCategory, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async (
  includeInactive: boolean = false
): Promise<MenuCategory[]> => {
  const where: Prisma.MenuCategoryWhereInput = includeInactive
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

export const getCategoryById = async (
  id: number
): Promise<MenuCategory | null> => {
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

export const createCategory = async (
  data: Omit<MenuCategory, "id" | "created_at" | "updated_at">
): Promise<MenuCategory> => {
  return prisma.menuCategory.create({
    data,
  });
};

export const updateCategory = async (
  id: number,
  data: Partial<MenuCategory>
): Promise<MenuCategory> => {
  return prisma.menuCategory.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: number): Promise<void> => {
  await prisma.menuCategory.delete({
    where: { id },
  });
};

export const toggleCategoryStatus = async (
  id: number
): Promise<MenuCategory> => {
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