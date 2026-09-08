import { validationResult } from "express-validator";
import { userModels } from "../models/user.models.js";
import { profileModels } from "../models/profile.models.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, first_name, last_name } = req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = await userModels.create({
      username,
      email,
      password: hashedPassword,
    });

    await profileModels.create({
      user_id: newUser.id,
      first_name,
      last_name,
    });

    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModels.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al cerrar sesión", error: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await userModels.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: { model: profileModels, as: "profile" },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener perfil", error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, biography, avatar_url, birth_date } =
      req.body;

    const profile = await profileModels.findOne({
      where: { user_id: req.user.id },
    });
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    await profile.update({
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    });

    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente", profile });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar perfil", error: error.message });
  }
}
