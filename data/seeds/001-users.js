const bcryptjs = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { username: "Caterina", password: bcryptjs.hashSync("lambdaschool", 8) },
        { username: "Elena", password: bcryptjs.hashSync("lambdaschool", 8) },
        { username: "Marina", password: bcryptjs.hashSync("lambdaschool", 8) },
        { username: "Isabella", password: bcryptjs.hashSync("lambdaschool", 8) },
      ]);
    });
};
