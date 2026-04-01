import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Optional auth middleware — attaches req.user if token is valid, but never returns 401.
// Allows guests to access routes while still tracking logged-in users.
const optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch {
      // Invalid token — just continue as guest
      req.user = null;
    }
  }
  next();
};

export default optionalAuth;
