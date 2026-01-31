export interface RegisterAdminDTO {
    email: string;
    password: string;
    role?: string;
}
export interface LoginAdminDTO {
    email: string;
    password: string;
}
export declare const validateRegisterAdmin: (data: any) => {
    isValid: boolean;
    errors: string[];
};
export declare const validateLoginAdmin: (data: any) => {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=authDTO.d.ts.map