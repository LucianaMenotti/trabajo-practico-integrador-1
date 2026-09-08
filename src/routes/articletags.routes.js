import { Router } from "express";
import { body, param } from "express-validator";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/articletag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

const createValidations = [
  body("article_id")
    .isInt()
    .withMessage("article_id debe ser un número entero"),
  body("tag_id").isInt().withMessage("tag_id debe ser un número entero"),
];

const deleteValidations = [
  param("articleTagId")
    .isInt()
    .withMessage("articleTagId debe ser un número entero"),
];

router.post("/", authMiddleware, createValidations, createArticleTag);
router.delete(
  "/:articleTagId",
  authMiddleware,
  deleteValidations,
  deleteArticleTag,
);

export default router;
