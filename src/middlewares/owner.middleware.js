import { validationResult } from "express-validator";
import { articleModels } from "../models/article.models.js";
import { articleTagModels } from "../models/articletag.models.js";

export async function ownerMiddleware(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = await articleModels.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (req.user.role !== "admin" && article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Solo el autor o un admin puede hacer esto" });
    }

    req.article = article;
    next();
  } catch (error) {
    console.error("Error en ownerMiddleware:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function authorOnlyMiddleware(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let articleId;

    if (req.params.articleTagId) {
      const articleTag = await articleTagModels.findByPk(
        req.params.articleTagId,
      );
      if (!articleTag) {
        return res
          .status(404)
          .json({ message: "Relación artículo-etiqueta no encontrada" });
      }

      req.articleTag = articleTag;
      articleId = articleTag.article_id;
    } else {
      articleId = req.body.article_id;
    }

    const article = await articleModels.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Solo el autor puede hacer esto" });
    }

    req.article = article;
    next();
  } catch (error) {
    console.error("Error en authorOnlyMiddleware:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
