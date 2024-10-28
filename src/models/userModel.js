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

      //set: passwordEncrypt
      //   validate: [
      //     (password) =>
      //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
      //     "Password type is not correct.",
      //   ],
      //   set: async (password) => {
      //       if ( !password ) {
      //           throw new Error( 'Password is required' );
      //       }
      //       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      //       if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password) ) {
      //           throw new Error( 'Password must be at least 8 characters long and contain at least one special character and uppercase character' );
      //       }
      //       return passwordEncrypt(password)

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

      // validate: [
      //   (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      //   "Please fill a valid email address",
      // ],

    },

    isAdmin: {
      type: Boolean,
      default: false,
    }, 

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)
