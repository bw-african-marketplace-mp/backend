exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("username", 128).notNullable().unique();
      tbl.text("password", 128).notNullable();
    })

    .createTable("listings", (tbl) => {
      tbl.increments();
      tbl.text("product_name", 128).notNullable();
      tbl.text("product_category", 128).notNullable();
      tbl.text("product_description", 255);
      tbl.text("product_quantity", 128).notNullable();
      tbl.text("product_price", 128).notNullable();
      tbl.text("country", 128).notNullable();
      tbl.text("market_name", 128).notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("listings").dropTableIfExists("users");
};
