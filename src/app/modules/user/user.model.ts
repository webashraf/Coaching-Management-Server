import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // by default mongose make schema for all date releted interface.
  }
);
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycript_salt_raund)
  );
});

export const UserModel = model<TUser>("User", userSchema);
