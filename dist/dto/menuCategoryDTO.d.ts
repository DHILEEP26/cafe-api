export interface CreateMenuCategoryDTO {
    name: string;
    display_order?: number;
    is_active?: boolean;
}
export interface UpdateMenuCategoryDTO {
    name?: string;
    display_order?: number;
    is_active?: boolean;
}
export declare const validateCreateMenuCategory: (data: any) => {
    isValid: boolean;
    errors: string[];
};
export declare const validateUpdateMenuCategory: (data: any) => {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=menuCategoryDTO.d.ts.map