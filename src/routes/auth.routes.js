import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

const registerValidations = [
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
  body("first_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El nombre solo puede contener letras"),
  body("last_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El apellido solo puede contener letras"),
];

const loginValidations = [
  body("email").isEmail().withMessage("El email no tiene un formato válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

const updateProfileValidations = [
  body("first_name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .isAlpha("es-ES", { ignore: " " }),
  body("last_name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .isAlpha("es-ES", { ignore: " " }),
  body("biography").optional().isLength({ max: 500 }),
  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("avatar_url debe ser una URL válida"),
];

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfileValidations, updateProfile);

export default router;
