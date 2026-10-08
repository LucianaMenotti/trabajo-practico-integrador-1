import { body, param } from "express-validator";
import { tagModels } from "../models/tag.models.js";

export const tagIdValidation = [
  param("id").isInt({ min: 1 }).withMessage("id debe ser un entero positivo"),
];

export const createTagValidations = [
  body("name")
    .notEmpty()
    .withMessage("name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("name debe tener entre 2 y 30 caracteres")
    .bail()
    .not()
    .matches(/\s/)
    .withMessage("name no puede tener espacios")
    .bail()
    .custom(async (value) => {
      const tag = await tagModels.findOne({ where: { name: value } });
      if (tag) {
        throw new Error("name ya está en uso");
      }
      return true;
    }),
];

export const updateTagValidations = [
  ...tagIdValidation,

  body("name")
    .notEmpty()
    .withMessage("name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("name debe tener entre 2 y 30 caracteres")
    .bail()
    .not()
    .matches(/\s/)
    .withMessage("name no puede tener espacios")
    .bail()
    .custom(async (value, { req }) => {
      const tag = await tagModels.findOne({ where: { name: value } });
      if (tag && tag.id !== Number(req.params.id)) {
        throw new Error("name ya está en uso");
      }
      return true;
    }),
];
