import { MenuCategory } from "@prisma/client";
export declare const getAllCategories: (includeInactive?: boolean) => Promise<MenuCategory[]>;
export declare const getCategoryById: (id: number) => Promise<MenuCategory | null>;
export declare const createCategory: (data: Omit<MenuCategory, "id" | "created_at" | "updated_at">) => Promise<MenuCategory>;
export declare const updateCategory: (id: number, data: Partial<MenuCategory>) => Promise<MenuCategory>;
export declare const deleteCategory: (id: number) => Promise<void>;
export declare const toggleCategoryStatus: (id: number) => Promise<MenuCategory>;
//# sourceMappingURL=menuCategoryService.d.ts.map