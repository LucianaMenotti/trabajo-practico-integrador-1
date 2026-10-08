import { body } from "express-validator";

export const updateProfileValidations = [
  body("first_name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("first_name debe tener entre 2 y 50 caracteres")
    .bail()
    .isAlpha("es-ES")
    .withMessage("first_name solo puede tener letras"),

  body("last_name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("last_name debe tener entre 2 y 50 caracteres")
    .bail()
    .isAlpha("es-ES")
    .withMessage("last_name solo puede tener letras"),

  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("biography puede tener hasta 500 caracteres"),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("avatar_url debe ser una URL válida"),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("birth_date debe tener el formato AAAA-MM-DD"),
];
