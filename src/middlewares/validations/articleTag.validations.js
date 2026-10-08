import { body, param } from "express-validator";

export const createArticleTagValidations = [
  body("article_id")
    .notEmpty()
    .withMessage("article_id es obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("article_id debe ser un entero positivo"),

  body("tag_id")
    .notEmpty()
    .withMessage("tag_id es obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("tag_id debe ser un entero positivo"),
];

export const deleteArticleTagValidations = [
  param("articleTagId")
    .isInt({ min: 1 })
    .withMessage("articleTagId debe ser un entero positivo"),
];
