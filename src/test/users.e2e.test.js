const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

const { User, newUser } = require("../services/__mocks__/testData");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock("../services");

describe("Testing the route /api/auth", () => {
  it("Should return status 201 after registration", async (done) => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();

    done();
  });

  it("Should return status 409 (email already in use)", async (done) => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();

    done();
  });

  it("Should return status 200 after login", async (done) => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();

    done();
  });

  it("Should return status 401 after an unsuccessful login", async (done) => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fake@test.com", password: "123456" })
      .set("Accept", "application/json");

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();

    done();
  });

  it("Should return status 204 after the logout", async (done) => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(204);
    expect(res.body).toBeDefined();

    done();
  });

  it("Should return status 200 after updating the avatar", async (done) => {
    const buffer = await fs.readFile(
      path.join(process.cwd(), "src", "test", "test.jpg")
    );

    const res = await request(app)
      .patch("/api/auth/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buffer, "test.jpg");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();

    done();
  });
});
