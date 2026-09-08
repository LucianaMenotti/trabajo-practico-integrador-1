import { articleModels } from "../models/article.models.js";

export async function ownerMiddleware(req, res, next) {
  try {
    const article = await articleModels.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (article.user_id !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No sos el autor de este recurso" });
    }

    req.article = article;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error al verificar usuario" });
  }
}
