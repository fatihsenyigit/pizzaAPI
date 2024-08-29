"use strict";

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "email is not valid",
      ],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    }, 

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true },
);

module.exports = mongoose.model("User", UserSchema)
