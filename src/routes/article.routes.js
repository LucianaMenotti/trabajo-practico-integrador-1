import { Router } from "express";
import { body, param } from "express-validator";
import {
  getAllArticles,
  getArticleById,
  getMyArticles,
  getMyArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

const router = Router();

const idValidation = [
  param("id").isInt().withMessage("El id debe ser un número entero"),
];

const articleValidations = [
  body("title")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener mínimo 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El resumen no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("Estado inválido"),
];

router.post("/", authMiddleware, articleValidations, createArticle);
router.get("/", authMiddleware, getAllArticles);
router.get("/user", authMiddleware, getMyArticles);
router.get("/user/:id", authMiddleware, idValidation, getMyArticleById);
router.get("/:id", authMiddleware, idValidation, getArticleById);
router.put(
  "/:id",
  authMiddleware,
  idValidation,
  articleValidations,
  ownerMiddleware,
  updateArticle,
);
router.delete(
  "/:id",
  authMiddleware,
  idValidation,
  ownerMiddleware,
  deleteArticle,
);

export default router;
