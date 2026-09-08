import { validationResult } from "express-validator";
import { articleTagModels } from "../models/articletag.models.js";
import { articleModels } from "../models/article.models.js";
import { tagModels } from "../models/tag.models.js";

export async function createArticleTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { article_id, tag_id } = req.body;

    const article = await articleModels.findByPk(article_id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No sos el autor de este artículo" });
    }

    const tag = await tagModels.findByPk(tag_id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const existing = await articleTagModels.findOne({
      where: { article_id, tag_id },
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "El artículo ya tiene esa etiqueta asociada" });
    }

    const newArticleTag = await articleTagModels.create({ article_id, tag_id });

    return res
      .status(201)
      .json({
        message: "Etiqueta agregada al artículo",
        articleTag: newArticleTag,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al agregar etiqueta", error: error.message });
  }
}

export async function deleteArticleTag(req, res) {
  try {
    const articleTag = await articleTagModels.findByPk(req.params.articleTagId);
    if (!articleTag) {
      return res
        .status(404)
        .json({ message: "Relación artículo-etiqueta no encontrada" });
    }

    const article = await articleModels.findByPk(articleTag.article_id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No sos el autor de este artículo" });
    }

    await articleTag.destroy();

    return res.status(200).json({ message: "Etiqueta removida del artículo" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al remover etiqueta", error: error.message });
  }
}
