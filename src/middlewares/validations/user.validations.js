import { body, param } from "express-validator";
import { userModels } from "../models/user.models.js";
import { registerValidations } from "./auth.validations.js";

export const userIdValidation = [
  param("id").isInt({ min: 1 }).withMessage("id debe ser un entero positivo"),
];

export const createUserValidations = [
  ...registerValidations,

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role solo puede ser user o admin"),
];

export const updateUserValidations = [
  ...userIdValidation,

  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("username solo puede tener letras y números")
    .bail()
    .custom(async (value, { req }) => {
      const user = await userModels.findOne({
        where: { username: value },
        paranoid: false,
      });
      if (user && user.id !== Number(req.params.id)) {
        throw new Error("username ya está en uso");
      }
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("email no tiene un formato válido")
    .bail()
    .isLength({ max: 100 })
    .withMessage("email puede tener hasta 100 caracteres")
    .bail()
    .custom(async (value, { req }) => {
      const user = await userModels.findOne({
        where: { email: value },
        paranoid: false,
      });
      if (user && user.id !== Number(req.params.id)) {
        throw new Error("email ya está en uso");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("password debe tener al menos 8 caracteres")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("password debe tener al menos una mayúscula")
    .bail()
    .matches(/[a-z]/)
    .withMessage("password debe tener al menos una minúscula")
    .bail()
    .matches(/[0-9]/)
    .withMessage("password debe tener al menos un número"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role solo puede ser user o admin"),
];
