import express from "express";
import {
  getMeController,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access Public
 */
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);
authRouter.get("/get-me", authUser, getMeController);
export default authRouter;
