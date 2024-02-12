const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const checkMasterAdmin = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (user.role !== "masterAdmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = checkMasterAdmin;
