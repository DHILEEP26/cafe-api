export interface CreateMenuItemDTO {
    category_id: number;
    name: string;
    description?: string;
    price: number;
    is_available?: boolean;
}
export interface UpdateMenuItemDTO {
    category_id?: number;
    name?: string;
    description?: string;
    price?: number;
    is_available?: boolean;
}
export declare const validateCreateMenuItem: (data: any) => {
    isValid: boolean;
    errors: string[];
};
export declare const validateUpdateMenuItem: (data: any) => {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=menuItemDTO.d.ts.map