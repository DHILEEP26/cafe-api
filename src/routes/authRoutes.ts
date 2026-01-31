import express from "express";
import * as AuthController from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Protected routes
router.get("/profile", authenticateToken, AuthController.getProfile);

export default router;