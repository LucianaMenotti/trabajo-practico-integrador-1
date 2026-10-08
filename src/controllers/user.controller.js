import { validationResult } from "express-validator";
import { userModels } from "../models/user.models.js";
import { profileModels } from "../models/profile.models.js";
import { articleModels } from "../models/article.models.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export async function getUsers(req, res) {
  try {
    const users = await userModels.findAll({
      attributes: { exclude: ["password"] },
      include: { model: profileModels, as: "profile" },
    });

    return res
      .status(200)
      .json({ message: "Usuarios obtenidos correctamente", data: users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getUserById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userModels.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: profileModels, as: "profile" },
        { model: articleModels, as: "articles" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Usuario obtenido correctamente", data: user });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
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

    await profileModels.create({
      user_id: newUser.id,
      first_name,
      last_name,
    });

    const user = await userModels.findByPk(newUser.id, {
      attributes: { exclude: ["password"] },
      include: { model: profileModels, as: "profile" },
    });

    return res
      .status(201)
      .json({ message: "Usuario creado correctamente", data: user });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
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

    const { username, email, password, role } = req.body || {};

    if (username !== undefined) {
      user.username = username;
    }
    if (email !== undefined) {
      user.email = email;
    }
    if (password !== undefined) {
      user.password = await hashPassword(password);
    }
    if (role !== undefined) {
      user.role = role;
    }

    await user.save();

    const updatedUser = await userModels.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: { model: profileModels, as: "profile" },
    });

    return res
      .status(200)
      .json({
        message: "Usuario actualizado correctamente",
        data: updatedUser,
      });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function deleteUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userModels.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
