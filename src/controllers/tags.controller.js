import { validationResult } from "express-validator";
import { tagModels } from "../models/tag.models.js";
import { articleModels } from "../models/article.models.js";

export async function getAllTags(req, res) {
  try {
    const tags = await tagModels.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al listar etiquetas", error: error.message });
  }
}

export async function getTagById(req, res) {
  try {
    const tag = await tagModels.findByPk(req.params.id, {
      include: { model: articleModels, as: "articles" },
    });

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    return res.status(200).json(tag);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener etiqueta", error: error.message });
  }
}

export async function createTag(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const existingTag = await tagModels.findOne({ where: { name } });
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "Ya existe una etiqueta con ese nombre" });
    }

    const newTag = await tagModels.create({ name });

    return res
      .status(201)
      .json({ message: "Etiqueta creada correctamente", tag: newTag });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear etiqueta", error: error.message });
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

    if (name) {
      const existingTag = await tagModels.findOne({ where: { name } });
      if (existingTag && existingTag.id !== tag.id) {
        return res
          .status(400)
          .json({ message: "Ya existe una etiqueta con ese nombre" });
      }
    }

    await tag.update({ name });

    return res
      .status(200)
      .json({ message: "Etiqueta actualizada correctamente", tag });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar etiqueta", error: error.message });
  }
}

export async function deleteTag(req, res) {
  try {
    const tag = await tagModels.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    await tag.destroy();

    return res
      .status(200)
      .json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar etiqueta", error: error.message });
  }
}
