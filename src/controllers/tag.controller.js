import { validationResult } from "express-validator";
import { tagModels } from "../models/tag.models.js";
import { articleModels } from "../models/article.models.js";

export async function createTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const newTag = await tagModels.create({ name });

    return res
      .status(201)
      .json({ message: "Etiqueta creada correctamente", data: newTag });
  } catch (error) {
    console.error("Error al crear etiqueta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getTags(req, res) {
  try {
    const tags = await tagModels.findAll();

    return res
      .status(200)
      .json({ message: "Etiquetas obtenidas correctamente", data: tags });
  } catch (error) {
    console.error("Error al obtener etiquetas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getTagById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tag = await tagModels.findByPk(req.params.id, {
      include: {
        model: articleModels,
        as: "articles",
        through: { attributes: [] },
      },
    });

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    return res
      .status(200)
      .json({ message: "Etiqueta obtenida correctamente", data: tag });
  } catch (error) {
    console.error("Error al obtener etiqueta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function updateTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tag = await tagModels.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const { name } = req.body;

    await tag.update({ name });

    return res
      .status(200)
      .json({ message: "Etiqueta actualizada correctamente", data: tag });
  } catch (error) {
    console.error("Error al actualizar etiqueta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tag = await tagModels.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    await tag.destroy();

    return res
      .status(200)
      .json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar etiqueta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
