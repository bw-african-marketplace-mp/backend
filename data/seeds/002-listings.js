exports.seed = function (knex) {
  return knex("listings")
    .del()
    .then(function () {
      return knex("listings").insert([
        {
          product_name: "Mangoes",
          product_category: "Fruits",
          product_description: "fresh mangoes",
          product_quantity: "200kg",
          product_price: "KES510/kg",
          country: "Kenya",
          market_name: "Bungoma",
          user_id: 1,
        },
        {
          product_name: "Beans",
          product_category: "Legumes",
          product_description: "dried beans",
          product_quantity: "30kg",
          product_price: "KES200/kg",
          country: "Kenya",
          market_name: "Bungoma",
          user_id: 1,
        },

        {
          product_name: "Mangoes",
          product_category: "Fruits",
          product_description: "fresh mangoes",
          product_quantity: "250kg",
          product_price: "UGX350/kg",
          country: "Uganda",
          market_name: "Iganga",
          user_id: 1,
        },
        {
          product_name: "Beans",
          product_category: "Legumes",
          product_description: "dried beans",
          product_quantity: "55kg",
          product_price: "UGX150/kg",
          country: "Uganda",
          market_name: "Iganga",
          user_id: 1,
        },
      ]);
    });
};
