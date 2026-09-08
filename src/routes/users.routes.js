import { Router } from "express";
import { body, param } from "express-validator";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

const idValidation = [
  param("id").isInt().withMessage("El id debe ser un número entero"),
];

const createUserValidations = [
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumérico"),
  body("email").isEmail().withMessage("El email no tiene un formato válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
    ),
  body("role").optional().isIn(["user", "admin"]).withMessage("Rol inválido"),
  body("first_name")
    .isLength({ min: 2, max: 50 })
    .isAlpha("es-ES", { ignore: " " }),
  body("last_name")
    .isLength({ min: 2, max: 50 })
    .isAlpha("es-ES", { ignore: " " }),
];

const updateUserValidations = [
  body("username").optional().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body("email").optional().isEmail(),
  body("role").optional().isIn(["user", "admin"]).withMessage("Rol inválido"),
];

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, idValidation, getUserById);
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
  idValidation,
  updateUserValidations,
  updateUser,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  idValidation,
  deleteUser,
);

export default router;
