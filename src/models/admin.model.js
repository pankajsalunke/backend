import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        maxlength: 100,
      },
      lastname: {
        type: String,
        required: true,
        maxlength: 100,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    dept: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Passwor must be at least 5 charecter long"],
    },
    taskNumbers: {
      active: {type: Number, default: 0},
      newTask: {type: Number, default: 0},
      completed: {type: Number, default: 0},
      failed: {type: Number, default: 0},
    },
  },
  {timestamps: true}
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

AdminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

AdminSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRATE,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const Admin = mongoose.model("Admin", AdminSchema);
