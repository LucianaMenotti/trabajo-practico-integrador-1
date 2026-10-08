import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  userIdValidation,
  createUserValidations,
  updateUserValidations,
} from "../middlewares/user.validations.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  getUserById,
);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createUserValidations,
  createUser,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidations,
  updateUser,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  deleteUser,
);

export default router;
