import { validationResult } from "express-validator";
import { articleModels } from "../models/article.models.js";
import { userModels } from "../models/user.models.js";
import { tagModels } from "../models/tag.models.js";

export async function getAllArticles(req, res) {
  try {
    const articles = await articleModels.findAll({
      where: { status: "published" },
      include: [
        {
          model: userModels,
          as: "author",
          attributes: { exclude: ["password"] },
        },
        { model: tagModels, as: "tags" },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al listar artículos", error: error.message });
  }
}

export async function getArticleById(req, res) {
  try {
    const article = await articleModels.findByPk(req.params.id, {
      include: [
        {
          model: userModels,
          as: "author",
          attributes: { exclude: ["password"] },
        },
        { model: tagModels, as: "tags" },
      ],
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener artículo", error: error.message });
  }
}

export async function getMyArticles(req, res) {
  try {
    const articles = await articleModels.findAll({
      where: { status: "published", user_id: req.user.id },
      include: { model: tagModels, as: "tags" },
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al listar tus artículos", error: error.message });
  }
}

export async function getMyArticleById(req, res) {
  try {
    const article = await articleModels.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: { model: tagModels, as: "tags" },
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener tu artículo", error: error.message });
  }
}

export async function createArticle(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, status } = req.body;

    const newArticle = await articleModels.create({
      title,
      content,
      excerpt,
      status,
      user_id: req.user.id,
    });

    return res
      .status(201)
      .json({ message: "Artículo creado correctamente", article: newArticle });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear artículo", error: error.message });
  }
}

export async function updateArticle(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // req.article ya fue cargado y verificado por ownerMiddleware
    const { title, content, excerpt, status } = req.body;

    await req.article.update({ title, content, excerpt, status });

    return res
      .status(200)
      .json({
        message: "Artículo actualizado correctamente",
        article: req.article,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar artículo", error: error.message });
  }
}

export async function deleteArticle(req, res) {
  try {
    // req.article ya fue cargado y verificado por ownerMiddleware
    await req.article.destroy(); // paranoid: true → soft delete

    return res
      .status(200)
      .json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar artículo", error: error.message });
  }
}
