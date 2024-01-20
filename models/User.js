const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 20,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name:{
      type: String,
      minlength: 8,
      maxlength: 20,
      require: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);