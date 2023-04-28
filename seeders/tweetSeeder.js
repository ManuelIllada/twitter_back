const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
faker.locale = "es";

module.exports = async () => {
  const tweets = [];
  const totalTweets = 100;

  for (let i = 0; i < totalTweets; i++) {
    const tweet = new Tweet({
      content: faker.lorem.paragraph(1),
      date: faker.date.soon(),
      like: [],
      comments: faker.datatype.number({ min: 0, max: 2000 }),
      retweets: faker.datatype.number({ min: 0, max: 10000 }),
      views: faker.datatype.number({ min: 0.1, max: 100.9 }),
    });

    tweets.push(tweet);
  }

  const users = await User.find();

  for (const tweet of tweets) {
    const randomNumber = faker.datatype.number({ min: 0, max: 19 });
    const randomUser = await User.findOne().skip(randomNumber);
    tweet.userId = randomUser;
    randomUser.tweets.push(tweet);

    for (
      let index = faker.datatype.number({ min: 0, max: 20 });
      index > tweet.like.length;
      index--
    ) {
      tweet.like.push(users[faker.datatype.number({ min: 0, max: 19 })]._id);
    }

    await randomUser.save();
  }
  await Tweet.insertMany(tweets);

  /*
  const tweets = [];
  for (let i = 0; i < 100; i++) {
    tweets.push({
      content: faker.lorem.paragraph(1),
    });
  }
  await Tweet.insertMany(tweets);*/
  console.log("[Database] Se corrió el seeder de Tweet.");
};
