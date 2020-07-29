Api: https://marketbw-api.herokuapp.com

To access either register new user or use one from following list:

username: "user1",
password: "lambdaschool"



username: "user2",
password: "lambdaschool"


username: "user3",
password: "lambdaschool"


Auth Endpoints

Post:

Register https://marketbw-api.herokuapp.com/api/auth/register


Log In https://marketbw-api.herokuapp.com/api/auth/login

Example:


{ username: "user1", password: "lambdaschool" }

Get:

Get list of users (after user has logged in) https://marketbw-api.herokuapp.com/api/auth

Market Endpoints:

Get:

Get list of products https://marketbw-api.herokuapp.com/api/market


Get products by id https://marketbw-api.herokuapp.com/api/market/:id


Get products by user id https://marketbw-api.herokuapp.com/api/market/user/:id



Post:


Create product listing https://marketbw-api.herokuapp.com/api/market/user/:id

Example:

{
product_name: "Beans",
product_category: "Legumes",
product_description: "dried beans",
product_quantity: "55kg",
product_price: "UGX150/kg",
country: "Uganda",
market_name: "Iganga",
user_id: 1,
}

Put:

Edit product by listing id https://marketbw-api.herokuapp.com/api/market/:id

Delete:

Delete product by listing id https://marketbw-api.herokuapp.com/api/market/:id
