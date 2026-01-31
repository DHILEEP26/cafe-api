"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminById = exports.loginAdmin = exports.registerAdmin = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const registerAdmin = async (email, password, role = "ADMIN") => {
    // Check if user already exists
    const existingUser = await prisma.adminUser.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Create user
    const user = await prisma.adminUser.create({
        data: {
            email,
            password: hashedPassword,
            role: role,
        },
    });
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (email, password) => {
    // Find user
    const user = await prisma.adminUser.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Verify password
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    // Generate token
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
    }, JWT_SECRET, { expiresIn: "24h" });
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    return {
        user: userWithoutPassword,
        token,
    };
};
exports.loginAdmin = loginAdmin;
const getAdminById = async (id) => {
    const user = await prisma.adminUser.findUnique({
        where: { id },
    });
    if (!user) {
        return null;
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.getAdminById = getAdminById;
//# sourceMappingURL=authService.js.map