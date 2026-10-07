import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password.toString(), 10);
};

export const comparePassword = async (userEnterPassword, dbPassword) => {
  return await bcrypt.compare(userEnterPassword.toString(), dbPassword);
};
