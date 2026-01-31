import { MenuItem } from "@prisma/client";
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
export declare const getAllMenuItems: ({ categoryId, includeUnavailable, page, limit, searchTerm, }?: GetMenuItemsParams) => Promise<PaginatedMenuItems | MenuItem[]>;
export declare const getMenuItemById: (id: number) => Promise<MenuItem | null>;
export declare const createMenuItem: (data: Omit<MenuItem, "id" | "created_at" | "updated_at">) => Promise<MenuItem>;
export declare const updateMenuItem: (id: number, data: Partial<MenuItem>) => Promise<MenuItem>;
export declare const deleteMenuItem: (id: number) => Promise<void>;
export declare const toggleMenuItemAvailability: (id: number) => Promise<MenuItem>;
export declare const getMenuItemsByCategory: (categoryId: number) => Promise<MenuItem[]>;
export {};
//# sourceMappingURL=menuItemService.d.ts.map