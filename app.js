import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sequelize from "./src/config/database.js";
import "./src/models/asociacion.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/users.routes.js";
import tagRoutes from "./src/routes/tags.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import articleTagRoutes from "./src/routes/articletags.routes.js"

const app = express(); //crea la instancia de mi servidor

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles-tags", articleTagRoutes);

const PORT = process.env.PORT;

try {
  await sequelize.authenticate();
  console.log("Conexión a la base de datos exitosa.");
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}
