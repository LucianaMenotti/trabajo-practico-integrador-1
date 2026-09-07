import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sequelize from "./src/config/database.js";
import "./src/models/asociacion.js";

const app = express(); //crea la instancia de mi servidor

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;

try {
  await sequelize.authenticate();
  console.log("Conexión a la base de datos exitosa.");
  await sequelize.sync({alter:true});

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}
