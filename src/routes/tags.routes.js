import { Router } from "express";
import { body, param } from "express-validator";
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

const idValidation = [
  param("id").isInt().withMessage("El id debe ser un número entero"),
];

const tagValidations = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^\S+$/)
    .withMessage("El nombre no puede contener espacios"),
];

router.post("/", authMiddleware, adminMiddleware, tagValidations, createTag);
router.get("/", authMiddleware, getAllTags);
router.get("/:id", authMiddleware, adminMiddleware, idValidation, getTagById);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  idValidation,
  tagValidations,
  updateTag,
);
router.delete("/:id", authMiddleware, adminMiddleware, idValidation, deleteTag);

export default router;
