import { body, param } from "express-validator";

export const articleIdValidation = [
  param("id").isInt({ min: 1 }).withMessage("id debe ser un entero positivo"),
];

export const createArticleValidations = [
  body("title")
    .notEmpty()
    .withMessage("title es obligatorio")
    .bail()
    .isLength({ min: 3, max: 200 })
    .withMessage("title debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("content es obligatorio")
    .bail()
    .isLength({ min: 50 })
    .withMessage("content debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("excerpt puede tener hasta 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("status solo puede ser published o archived"),

  body("user_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("user_id debe ser un entero positivo")
    .bail()
    .custom((value, { req }) => {
      if (req.user.role !== "admin" && Number(value) !== req.user.id) {
        throw new Error("user_id debe coincidir con el usuario autenticado");
      }
      return true;
    }),
];

export const updateArticleValidations = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("title debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("content debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("excerpt puede tener hasta 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("status solo puede ser published o archived"),
];
