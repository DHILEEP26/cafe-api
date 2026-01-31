"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const AuthService = __importStar(require("../services/authService"));
const responseHandler_1 = require("../utils/responseHandler");
const authDTO_1 = require("../dto/authDTO");
const errorHandler_1 = require("../utils/errorHandler");
const register = async (req, res, next) => {
    try {
        const validation = (0, authDTO_1.validateRegisterAdmin)(req.body);
        if (!validation.isValid) {
            throw new errorHandler_1.AppError(validation.errors.join(", "), 400);
        }
        const { email, password, role } = req.body;
        const user = await AuthService.registerAdmin(email, password, role);
        (0, responseHandler_1.sendResponse)(res, true, "Admin registered successfully", 201, user);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const validation = (0, authDTO_1.validateLoginAdmin)(req.body);
        if (!validation.isValid) {
            throw new errorHandler_1.AppError(validation.errors.join(", "), 400);
        }
        const { email, password } = req.body;
        const result = await AuthService.loginAdmin(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {
                user: result.user,
                token: result.token,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const user = await AuthService.getAdminById(req.user.id);
        if (!user) {
            throw new errorHandler_1.AppError("User not found", 404);
        }
        (0, responseHandler_1.sendResponse)(res, true, "Profile retrieved successfully", 200, user);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=authController.js.map