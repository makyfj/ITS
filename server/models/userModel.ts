import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Compares encrypted password with plain text password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypts password before saving
userSchema.pre<User>("save", async function (next: NextFunction) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash and salt password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the model
const UserModel = model<User>("User", userSchema);

export default UserModel;
