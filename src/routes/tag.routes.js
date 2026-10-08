import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  tagIdValidation,
  createTagValidations,
  updateTagValidations,
} from "../middlewares/validations/tag.validations.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  createTag,
);
router.get("/", authMiddleware, getTags);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tagIdValidation,
  getTagById,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidations,
  updateTag,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tagIdValidation,
  deleteTag,
);

export default router;
