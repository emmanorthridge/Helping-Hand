const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    type: String,
    imageURL: String,
    description: String,
    location: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

