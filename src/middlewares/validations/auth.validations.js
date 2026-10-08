import { body } from "express-validator";
import { userModels } from "../../models/user.models.js";

export const registerValidations = [
  body("username")
    .notEmpty()
    .withMessage("username es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("username solo puede tener letras y números")
    .bail()
    .custom(async (value) => {
      const user = await userModels.findOne({
        where: { username: value },
        paranoid: false,
      });
      if (user) {
        throw new Error("username ya está en uso");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("email no tiene un formato válido")
    .bail()
    .isLength({ max: 100 })
    .withMessage("email puede tener hasta 100 caracteres")
    .bail()
    .custom(async (value) => {
      const user = await userModels.findOne({
        where: { email: value },
        paranoid: false,
      });
      if (user) {
        throw new Error("email ya está en uso");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("password es obligatorio")
    .bail()
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

  body("first_name")
    .notEmpty()
    .withMessage("first_name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("first_name debe tener entre 2 y 50 caracteres")
    .bail()
    .isAlpha("es-ES")
    .withMessage("first_name solo puede tener letras"),

  body("last_name")
    .notEmpty()
    .withMessage("last_name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("last_name debe tener entre 2 y 50 caracteres")
    .bail()
    .isAlpha("es-ES")
    .withMessage("last_name solo puede tener letras"),
];

export const loginValidations = [
  body("email")
    .notEmpty()
    .withMessage("email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("email no tiene un formato válido"),

  body("password").notEmpty().withMessage("password es obligatorio"),
];
