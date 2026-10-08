import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  registerValidations,
  loginValidations,
} from "../middlewares/validations/auth.validations.js";
import { updateProfileValidations } from "../middlewares/validations/profile.validations.js";

const router = Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfileValidations, updateProfile);
router.post("/logout", authMiddleware, logout);

export default router;
