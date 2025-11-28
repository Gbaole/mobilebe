import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = Router();
const authCtrl = new AuthController();

authRoutes.post("/register", authCtrl.register);
authRoutes.post("/verify-otp", authCtrl.verifyOTP);
authRoutes.post("/login", authCtrl.login);
authRoutes.get("/profile", authMiddleware, authCtrl.profile);

export default authRoutes;
