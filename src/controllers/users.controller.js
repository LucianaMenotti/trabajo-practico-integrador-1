import { validationResult } from "express-validator";
import { userModels } from "../models/user.models.js";
import { profileModels } from "../models/profile.models.js";
import { articleModels } from "../models/article.models.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export async function getAllUsers(req, res) {
  try {
    const users = await userModels.findAll({
      include: { model: profileModels, as: "profile" },
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al listar usuarios", error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await userModels.findByPk(req.params.id, {
      include: [
        { model: profileModels, as: "profile" },
        { model: articleModels, as: "articles" },
      ],
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener usuario", error: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role, first_name, last_name } = req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = await userModels.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await profileModels.create({ user_id: newUser.id, first_name, last_name });

    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userModels.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { username, email, role } = req.body;
    await user.update({ username, email, role });

    return res
      .status(200)
      .json({ message: "Usuario actualizado correctamente", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userModels.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy(); // paranoid: true → soft delete (setea deleted_at)

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
}
