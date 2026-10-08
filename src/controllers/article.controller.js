import { validationResult } from "express-validator";
import { articleModels } from "../models/article.models.js";
import { articleTagModels } from "../models/articletag.models.js";
import { userModels } from "../models/user.models.js";
import { tagModels } from "../models/tag.models.js";

export async function createArticle(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, status, user_id } = req.body;

    let authorId = req.user.id;

    if (user_id !== undefined) {
      const author = await userModels.findByPk(user_id);
      if (!author) {
        return res.status(404).json({ message: "El usuario no existe" });
      }
      authorId = author.id;
    }

    const newArticle = await articleModels.create({
      title,
      content,
      excerpt,
      status,
      user_id: authorId,
    });

    return res
      .status(201)
      .json({ message: "Artículo creado correctamente", data: newArticle });
  } catch (error) {
    console.error("Error al crear artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getArticles(req, res) {
  try {
    const articles = await articleModels.findAll({
      where: { status: "published" },
      include: [
        { model: userModels, as: "author", attributes: ["id", "username"] },
        { model: tagModels, as: "tags", through: { attributes: [] } },
      ],
    });

    return res
      .status(200)
      .json({ message: "Artículos obtenidos correctamente", data: articles });
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getArticleById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = await articleModels.findByPk(req.params.id, {
      include: [
        { model: userModels, as: "author", attributes: ["id", "username"] },
        { model: tagModels, as: "tags", through: { attributes: [] } },
      ],
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Artículo obtenido correctamente", data: article });
  } catch (error) {
    console.error("Error al obtener artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getMyArticles(req, res) {
  try {
    const articles = await articleModels.findAll({
      where: { user_id: req.user.id, status: "published" },
      include: [{ model: tagModels, as: "tags", through: { attributes: [] } }],
    });

    return res
      .status(200)
      .json({ message: "Artículos obtenidos correctamente", data: articles });
  } catch (error) {
    console.error("Error al obtener artículos del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getMyArticleById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = await articleModels.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [{ model: tagModels, as: "tags", through: { attributes: [] } }],
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Artículo obtenido correctamente", data: article });
  } catch (error) {
    console.error("Error al obtener artículo del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function updateArticle(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = req.article;

    const { title, content, excerpt, status } = req.body || {};

    if (title !== undefined) {
      article.title = title;
    }
    if (content !== undefined) {
      article.content = content;
    }
    if (excerpt !== undefined) {
      article.excerpt = excerpt;
    }
    if (status !== undefined) {
      article.status = status;
    }

    await article.save();

    return res
      .status(200)
      .json({ message: "Artículo actualizado correctamente", data: article });
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteArticle(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = req.article;

    await articleTagModels.destroy({ where: { article_id: article.id } });
    await article.destroy();

    return res
      .status(200)
      .json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar artículo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
