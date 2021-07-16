const app = require("./app");
const request = require("supertest");

const { newDb } = require("pg-mem");
const { Pool: MockPool } = newDb().adapters.createPg();
const mockPool = new MockPool();

jest.mock("./db", () => {
  return {
    query: jest.fn().mockImplementation((...args) => {
      return mockPool.query(...args);
    })
  };
});

describe("users", () => {
  beforeAll(async () => {
    await mockPool.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT(255))"
    );
    await mockPool.query(
      "INSERT INTO users (name) VALUES ('Sabrina')"
    );
    await mockPool.query(
      "INSERT INTO users (name) VALUES ('Sabrino')"
    );
  });

  afterAll(async () => {
    await mockPool.query("DROP TABLE IF EXISTS users");
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const response = await request(app)
        .get("/users")
        .expect(200);

      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body.length).toEqual(2);
    });
    
    it("should return user given id", async () => {
      const response = await request(app)
        .get("/users/1")
        .expect(200);

      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body.name).toEqual("Sabrina");
    });
  });
});
