/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
faker.locale = "es";

module.exports = async () => {
  const users = [];
  const totalUsers = 20;

  for (let i = 0; i < totalUsers; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      image: faker.image.avatar(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 8),
    });
    users.push(user);
  }

  for (const user of users) {
    const randomNumberFollowers = faker.datatype.number({ min: 0, max: totalUsers - 1 });
    for (let i = 1; i <= randomNumberFollowers; i++) {
      const randomNumber = faker.datatype.number({ min: 0, max: totalUsers - 1 });
      const randomUser = users[randomNumber];

      const randomUserExist = user.following.some((u) => u.id === randomUser.id);
      const userInRandomExist = randomUser.follower.some((u) => u.id === user.id);

      if (randomUser !== user && !randomUserExist && !userInRandomExist) {
        user.following.push(randomUser);
        randomUser.follower.push(user);
      }
    }
  }

  await User.insertMany(users);

  console.log("[Database] Se corrió el seeder de Users.");
};
