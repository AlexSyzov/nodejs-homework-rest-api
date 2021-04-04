const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  User,
  contacts,
  newContact,
} = require("../services/__mocks__/testData");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock("../services");

describe("Testing the api/contacts route", () => {
  let newContactId;

  describe("Should handle the GET request", () => {
    it("Should return status 200 after getting all contacts", async (done) => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);

      done();
    });

    it("Should return status 200 after getting a contact by id", async (done) => {
      const contact = contacts[0];

      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty("_id");
      expect(res.body.data.contact._id).toBe(contact._id);

      done();
    });

    it("Should return status 404 after getting a contact by a wrong id", async (done) => {
      const wrongId = 1;
      const res = await request(app)
        .get(`/api/contacts/${wrongId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe("Should handle the POST request", () => {
    it("Should return status 201 after creating a contact", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send(newContact)
        .set("Accept", "application/json");

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      newContactId = res.body.data.contact._id;

      done();
    });

    it("Should return status 400 after receiving a wrong field", async (done) => {
      const res = await request(app)
        .post("/api/contacts/")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it('Should return status 400 after receiving a JSON without required field "name"', async (done) => {
      const res = await request(app)
        .post("/api/contacts/")
        .set("Authorization", `Bearer ${token}`)
        .send({ age: 3 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it('Should return status 400 after receiving a JSON without required field "age"', async (done) => {
      const res = await request(app)
        .post("/api/contacts/")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "George" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe("Should handle the PATCH request", () => {
    it("Should return status 200 after updating a contact", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${newContactId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "James" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe("James");

      done();
    });

    it("Should return status 400 after receiving a wrong field", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${newContactId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ test: 1 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      done();
    });

    it("Should return status 404 after receiving a JSON with a wrong id", async (done) => {
      const res = await request(app)
        .patch("/api/contacts/12345")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "James" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });

  describe("Should handle the DELETE request", () => {
    it("Should return status 200 after deleting a contact", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${newContactId}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json");

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.message).toBeDefined();

      done();
    });

    it("Should return status 404 after an unsuccessful deletion", async (done) => {
      const res = await request(app)
        .delete("/api/contacts/123")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json");

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });
});
