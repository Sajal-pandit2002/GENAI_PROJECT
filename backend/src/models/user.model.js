import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "username already taken"],
      required: [true, "Enter username"],
    },
    email: {
      type: String,
      unique: [true, "Account already exists with this email address"],
      required: [true, "Enter Email"],
    },
    password: {
      type: String,
      minLength: [5, "password must be 5 character"],
      required: [true, "Enter Password"],
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
