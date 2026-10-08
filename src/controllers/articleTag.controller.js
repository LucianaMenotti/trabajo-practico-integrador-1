import { validationResult } from "express-validator";
import { articleTagModels } from "../models/articletag.models.js";
import { tagModels } from "../models/tag.models.js";

export async function createArticleTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tag_id } = req.body;

    const tag = await tagModels.findByPk(tag_id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const alreadyExists = await articleTagModels.findOne({
      where: { article_id: req.article.id, tag_id },
    });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "El artículo ya tiene esa etiqueta" });
    }

    const newArticleTag = await articleTagModels.create({
      article_id: req.article.id,
      tag_id,
    });

    return res.status(201).json({
      message: "Etiqueta agregada al artículo correctamente",
      data: newArticleTag,
    });
  } catch (error) {
    console.error("Error al agregar etiqueta al artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteArticleTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await req.articleTag.destroy();

    return res
      .status(200)
      .json({ message: "Etiqueta removida del artículo correctamente" });
  } catch (error) {
    console.error("Error al remover etiqueta del artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
