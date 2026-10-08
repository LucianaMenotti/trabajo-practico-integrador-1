import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorOnlyMiddleware } from "../middlewares/owner.middleware.js";
import {
  createArticleTagValidations,
  deleteArticleTagValidations,
} from "../middlewares/validations/articleTag.validations.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createArticleTagValidations,
  authorOnlyMiddleware,
  createArticleTag,
);
router.delete(
  "/:articleTagId",
  authMiddleware,
  deleteArticleTagValidations,
  authorOnlyMiddleware,
  deleteArticleTag,
);

export default router;
