export function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol admin" });
  }
  next();
}
