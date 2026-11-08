const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { ok, fail } = require("../utils/response");

// Signup
const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    if (!fullName || !username || !email || !password) {
      return fail(res, "All required fields must be filled.", 400);
    }

    const existingUser = await User.findOne({
      where: {
        [require("sequelize").Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return fail(res, "Username or email already exists.", 409);
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password,
      role: role === "admin" ? "manager" : role,
    });

    return ok(
      res,
      "User registered successfully.",
      {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return fail(res, "Email and password are required.", 400);
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.matchPassword(password))) {
      return fail(res, "Invalid email or password.", 401);
    }

    return ok(res, "Login successful.", {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    next(error);
  }
};

// Get Profile
const getProfile = async (req, res, next) => {
  try {
    return ok(res, "Profile fetched successfully.", req.user);
  } catch (error) {
    next(error);
  }
};

// Get All Users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return ok(res, "Users fetched successfully.", users);
  } catch (error) {
    next(error);
  }
};

// Update User
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return fail(res, "User not found.", 404);
    }

    const { fullName, username, email, password, role } = req.body;

    await user.update({
      ...(fullName !== undefined && { fullName }),
      ...(username !== undefined && { username }),
      ...(email !== undefined && { email }),
      ...(password !== undefined && { password }),
      ...(role !== undefined && { role }),
    });

    return ok(res, "User updated successfully.", {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return fail(res, "User not found.", 404);
    }

    await user.destroy();

    return ok(res, "User deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser,
};