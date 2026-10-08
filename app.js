import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./src/config/database.js";
import "./src/models/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import articleTagRoutes from "./src/routes/articleTag.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles-tags", articleTagRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
  }
}

startServer();
