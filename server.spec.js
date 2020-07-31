const supertest = require("supertest");

const server = require("./server");

const db = require("./data/dbConfig");

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe("server", () => {
  it("should run tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /", () => {
    it("should return status code 200", async () => {
      const res = await supertest(server).get("/");

      expect(res.status).toBe(200);
    });

    it('should return { message: "API up" }', async () => {
      const res = await supertest(server).get("/");

      expect(res.body).toEqual({ message: "API up" });
    });
  });

  describe("GET /api/auth", () => {
    it("should return status 200", async () => {
      const res = await supertest(server).get("/api/auth");

      expect(res.status).toBe(200);
    });

    it("should return list of users", async () => {
      const res = await supertest(server).get("/api/auth");

      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("POST /api/auth/register", () => {
    it("should return status 201", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "user5", password: "lambdaschool" });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
    });

    it("should return status 400 if no req body", async () => {
      const res = await supertest(server).post("/api/auth/register");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "No User Data" });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return http status 200", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Welcome to African Marketplace");
      expect(res.body.token).toBeDefined();
    });

    it("should return status 400 if no req body", async () => {
      const res = await supertest(server).post("/api/auth/login");

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/market", () => {
    it("should return status 200", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .get("/api/market")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
    });

    it("should return status 400, if not logged in", async () => {
      const res = await supertest(server).get("/api/market");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "Please Log in" });
    });
  });

  describe("GET /api/market/:id", () => {
    it("should return status 200", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .get("/api/market/2")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(2);
    });

    it("should return status 404 if listing not found", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .get("/api/market/200")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Listing not found" });
    });
  });

  describe("GET /api/market/user/:id", () => {
    it("should return status 200", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .get("/api/market/user/1")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(4);
    });

    it("should return status 404 if user not found", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .get("/api/market/user/200")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });
  });

  describe("POST /api/marked/user/:id", () => {
    it("should return status 201", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .post("/api/market/user/1")
        .set("Authorization", logged.body.token)
        .send({
          product_name: "New",
          product_category: "New",
          product_description: "New",
          product_quantity: "New",
          product_price: "New",
          country: "New",
          market_name: "New",
        });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
    });

    it("should return status 404 if user not found", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .post("/api/market/user/200")
        .set("Authorization", logged.body.token)
        .send({
          product_name: "New",
          product_category: "New",
          product_description: "New",
          product_quantity: "New",
          product_price: "New",
          country: "New",
          market_name: "New",
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });
  });

  describe("PUT /api/market/:id", () => {
    it("should return status 200", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .put("/api/market/1")
        .set("Authorization", logged.body.token)
        .send({
          product_name: "New",
          product_category: "New",
          product_description: "New",
          product_quantity: "New",
          product_price: "New",
          country: "New",
          market_name: "New",
        });

      expect(res.status).toBe(200);
      expect(res.body.data.country).toBe("New");
    });

    it("should return status 404 if listing not found", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .put("/api/market/200")
        .set("Authorization", logged.body.token)
        .send({
          product_name: "New",
          product_category: "New",
          product_description: "New",
          product_quantity: "New",
          product_price: "New",
          country: "New",
          market_name: "New",
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Listing not found" });
    });
  });

  describe("DELETE /:id", () => {
    it("should return status 204", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .delete("/api/market/2")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it("should return status 404 if listing not found", async () => {
      const logged = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "user1", password: "lambdaschool" });

      const res = await supertest(server)
        .delete("/api/market/200")
        .set("Authorization", logged.body.token);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Listing not found" });
    });
  });
});
