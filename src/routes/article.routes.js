import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  getMyArticles,
  getMyArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import {
  articleIdValidation,
  createArticleValidations,
  updateArticleValidations,
} from "../middlewares/validations/article.validations.js";

const router = Router();

router.post("/", authMiddleware, createArticleValidations, createArticle);
router.get("/", authMiddleware, getArticles);
router.get("/user", authMiddleware, getMyArticles);
router.get("/user/:id", authMiddleware, articleIdValidation, getMyArticleById);
router.get("/:id", authMiddleware, articleIdValidation, getArticleById);
router.put(
  "/:id",
  authMiddleware,
  articleIdValidation,
  ownerMiddleware,
  updateArticleValidations,
  updateArticle,
);
router.delete(
  "/:id",
  authMiddleware,
  articleIdValidation,
  ownerMiddleware,
  deleteArticle,
);

export default router;
