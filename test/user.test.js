const supertest = require("supertest");
const app = require("../app");
const User = require("../models/User");
const mongoose = require("mongoose");
const api = supertest(app);
const user = {
  fname: "jon",
  lname: "snow",
  email: "jon@gmail.com",
  contact: "9803602670",
  username: "jon123",
  password: "123",
};

beforeAll(async () => {
  await User.deleteMany({});
});
test("Register test User", async () => {
  await api.post("/user/register").send(user).expect(201);
});

test("login test user", async () => {
  await api
    .post("user/login")
    .send(user)
    .expect(200)
    .expect((res) => {
      console.log(res.body);
      expect(res.body.status).toContain("Successful");
      expect(res.body.token).toBeDefined();
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test the root path", () => {
  test("Response the GET method", async () => {
    const response = await request.get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("Test the user routes", () => {
  test("It should response the GET method", async () => {
    const response = await request.get("/user/user");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the user register", () => {
  test("It should response the post method", async () => {
    const response = await request
      .post("/user/register")
      .send(user)
      .expect(201);
  });
});

describe("Test the user login", () => {
  test("It should response the post method", async () => {
    const response = await request
      .post("/user/login")

      .send(user)
      .expect(200);
    id = response.userid;

    expect(response.statusCode).toBe(200);
  });

  describe("test the user delete", () => {
    test("It should response the delete method", async () => {
      const response = await request.delete(`/user/user/${id}`).expect(500);
    });
  });

  describe("test the user update", () => {
    test("It should response the update method", async () => {
      const response = await request
        .put(`/user/user/${id}`)
        .send(user)
        .expect(500);
    });
  });
  describe("test the user get by id", () => {
    test("It should response the get by id method", async () => {
      const response = await request.get(`/user/user/${id}`).expect(404);
    });
  });

  describe("test the user get by username", () => {
    test("It should response the get by username method", async () => {
      const response = await request
        .get(`/user/user/${user.username}`)
        .expect(404);
    });
  });
  describe("test the user get by email", () => {
    test("It should response the get by email method", async () => {
      const response = await request
        .get(`/user/user/${user.email}`)
        .expect(404);
    });
  });

  describe("test the user get profile", () => {
    test("It should response the get profile method", async () => {
      const response = await request.get(`/user/profile`).expect(500);
    });
  });

  describe("test the user get all", () => {
    test("It should response the get all method", async () => {
      const response = await request.get(`/user/all`).expect(500);
    });

    describe("test the user get all by role", () => {
      test("It should response the get all by role method", async () => {
        const response = await request
          .get(`/user/all/${user.role}`)
          .expect(404);
      });
    });
  });
});
