const db = require("../../data/dbConfig");

module.exports = {
  find,
  findBy,
  findUserListings,
  add,
  edit,
  remove,
};

function find() {
  return db("listings");
}

function findBy(filter) {
  return db("listings").where(filter);
}

function findUserListings(id) {
  return db("listings").where({ user_id: id });
}

function add(listing, user_id) {
  return db("listings")
    .insert({ ...listing, user_id: user_id }, "id")
    .then(([id]) => {
      return findBy({ id });
    });
}

function edit(changes, id) {
  return db("listings")
    .where({ id: id })
    .update(changes)
    .then((count) => {
      return findBy({ id });
    });
}

function remove(id) {
  return db("listings").where({ id: id }).del();
}
