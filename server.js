const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("./routers/auth/middleware");
const authRouter = require("./routers/auth/router");
const marketRouter = require("./routers/market/router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "API up" });
});

server.use("/api/auth", authRouter);
server.use("/api/market", authenticate, marketRouter);

module.exports = server;
