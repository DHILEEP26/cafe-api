"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./utils/errorHandler");
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const menuCategoryRoute_1 = __importDefault(require("./routes/menuCategoryRoute"));
const menuItemRoute_1 = __importDefault(require("./routes/menuItemRoute"));
const app = (0, express_1.default)();
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Enable CORS
app.use((0, cors_1.default)());
// Limit repeated requests to public APIs
const limiter = (0, express_rate_limit_1.default)({
    max: 100, // max requests
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);
// Prevent parameter pollution
app.use((0, hpp_1.default)());
// Logger
app.use((0, morgan_1.default)("combined"));
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check route
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/categories", menuCategoryRoute_1.default);
app.use("/api/menu-items", menuItemRoute_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        statusCode: 404,
    });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map