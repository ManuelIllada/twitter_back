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
  bio: String,
  location: String,
  website: String,
  front: String,
  birthday: Date,
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

userSchema.methods.comparePassword = async function (userPassword) {
  const match = await bcrypt.compare(userPassword, this.password);
  return match;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
