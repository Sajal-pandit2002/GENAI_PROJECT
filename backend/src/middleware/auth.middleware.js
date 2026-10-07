import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not provided",
    });
  }
  const isTokenBlacklist = await tokenBlacklistModel.findOne({ token });

  if (isTokenBlacklist) {
    return res.status(401).json({
      success: false,
      message: "Token is Invalid",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
