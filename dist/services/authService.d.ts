import { AdminUser } from "@prisma/client";
export declare const registerAdmin: (email: string, password: string, role?: string) => Promise<Omit<AdminUser, "password">>;
export declare const loginAdmin: (email: string, password: string) => Promise<{
    user: Omit<AdminUser, "password">;
    token: string;
}>;
export declare const getAdminById: (id: number) => Promise<Omit<AdminUser, "password"> | null>;
//# sourceMappingURL=authService.d.ts.map