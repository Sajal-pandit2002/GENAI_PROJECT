import jwt from "jsonwebtoken";

const generateToken = (userId, userName) => {
  return jwt.sign({ id: userId, username: userName }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const sendToken = async (user, res, statusCode, message) => {
  const token = generateToken(user._id, user.username);
  return res
    .status(statusCode)
    .cookie("token", token)
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
};
