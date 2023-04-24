const { mongoose, Schema } = require("../db");

const tweetSchema = new Schema(
  {
    content: String,
    date: Date,
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    retweets: Number,
    views: Number,
    comments: Number,
  },
  { timestamps: true },
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
