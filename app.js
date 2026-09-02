import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';

const app = express(); //crea la instancia de mi servidor

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

