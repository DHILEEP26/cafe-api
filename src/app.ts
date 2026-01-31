import dotenv from "dotenv";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import morgan from "morgan";
import { errorHandler } from "./utils/errorHandler";

// Import routes
import authRoute from "./routes/authRoutes";
import menuCategoryRoute from "./routes/menuCategoryRoute";
import menuItemRoute from "./routes/menuItemRoute";

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Limit repeated requests to public APIs
const limiter = rateLimit({
  max: 100, // max requests
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Prevent parameter pollution
app.use(hpp());

// Logger
app.use(morgan("combined"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/categories", menuCategoryRoute);
app.use("/api/menu-items", menuItemRoute);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    statusCode: 404,
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;