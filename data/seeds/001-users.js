const bcryptjs = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { username: "user1", password: bcryptjs.hashSync("lambdaschool", 8) },
      ]);
    });
};
