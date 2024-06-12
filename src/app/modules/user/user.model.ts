import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserStaticModel } from "./user.interface";

const userSchema = new Schema<TUser, UserStaticModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const UserModel = model<TUser, UserStaticModel>("User", userSchema);
