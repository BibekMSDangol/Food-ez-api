const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const { use } = require("../app");
const app = require("../app");
const Food = require("../models/Food");
const api = supertest(app);

const user = {
  username: "jon123",
  password: "123",
};
const food = {
  name: "testname",
  price: "testprice",
  description: "testDescription"
};

let token = "";
//setup

beforeAll(async () => {
  await Food.deleteMany({});
  await api
    .post("/user/login")
    .send(user)
    .expect((res) => {
      token = res.body.token;
    });
});

test("create a food", async () => {
  await api
    .post("/food")
    .set("Authorization", `bearer ${token}`)
    .send(food)
    .expect(201)
    .expect((res) => {
      console.log(res.body);
      expect(res.body.name).toBe(food.name);
    });
});

test("get all foods", async () => {
  await api
    .get("/food")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect((res) => {
      console.log(res.body);
      expect(res.body[0].name).toBe(food.name);
    });
});

//teardown
afterAll(async () => {
  await mongoose.connection.close;
});
