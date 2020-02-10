import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const UserSchema = new Schema(
  {
    email: String,
    advancement: Number,
    translationType: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = model("User", UserSchema);
export default User;
