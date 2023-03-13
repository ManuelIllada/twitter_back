const { mongoose, Schema } = require("../db");
const bcrypt = require("bcryptjs");

// Crear esquema y modelo User...
const userSchema = new Schema({
  /*async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  },*/
  indentificator: Number,
  firstname: String,
  lastname: String,
  image: String,
  email: String,
  username: String,
  password: String,
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
