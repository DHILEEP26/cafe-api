import { Request, Response, NextFunction } from "express";
export declare const getAllMenuItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMenuItemById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMenuItemsByCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createMenuItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateMenuItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteMenuItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const toggleMenuItemAvailability: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=menuItemController.d.ts.map