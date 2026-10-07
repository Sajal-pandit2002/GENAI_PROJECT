import tokenBlacklistModel from "../models/blacklist.model.js";
import userModel from "../models/user.model.js";
import { sendToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

/**
 * @description expect username,email,password
 */
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide username,email and password",
    });
  }
  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (userAlreadyExists) {
    if (userAlreadyExists.username === username) {
      return res.status(400).json({
        message: "This username already exists use another username",
      });
    }
    if (userAlreadyExists.email === email) {
      return res.status(400).json({
        message: "This email already exists use another email",
      });
    }
  }
  const hash = await hashPassword(password);
  const user = await userModel.create({
    username: username.trim(),
    email,
    password: hash,
  });
  sendToken(user, res, 201, "Register successfully");
};

//Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email ",
    });
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  sendToken(user, res, 200, "Login successfully");
};

//logout user
export const logoutUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

//get me controller
export const getMeController = async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  return res.status(200).json({
    success: true,
    message: "User details fetch successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
