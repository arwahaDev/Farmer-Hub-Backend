const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { fail } = require("../utils/response");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return fail(res, "Not authorized. Token missing.", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return fail(res, "User not found.", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    return fail(res, "Not authorized. Invalid or expired token.", 401);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return fail(res, "You do not have permission.", 403);
    }

    next();
  };
};

module.exports = { protect, authorize };