import { verifyToken } from "../helpers/jwt.helper.js";
import { userModels } from "../models/user.models.js";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No autenticado: falta el token" });
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    const user = await userModels.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ message: "El usuario ya no existe" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
