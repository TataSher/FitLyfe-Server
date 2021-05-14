const createServer = require("./server")
const supertest = require("supertest");
const setupDatabase = require('./helpers/dbHelper');
const mongoose = require("mongoose");

const User = mongoose.model('User');

setupDatabase();

const app = createServer();

test("POST /signup passing test", async () => {
  // Send user data:

  const username = "taran314";
  const password = "taranisthebest";

  const data = { username, password };

  await supertest(app)
    .post("/signup")
    .send(data)
    .expect(200)
    .then( async (res) => {
      expect(res.body.token).toBeTruthy();
      // Has user been saved to db
      const user = await User.findOne({ username: username })
      expect(user).toBeTruthy();
    })
})

test("POST /signup failing test", async () => {
  await supertest(app)
    .post("/signup")
    .send({})
    .expect(422)
    .then( (res) => {
      expect(res.body.error).toEqual("Signup failed, try again")
    })
})

test("POST /signin passing test", async () => {
  const username = "taran314";
  const password = "taranisthebest";

  const user = new User({ username, password });
  await user.save();

  const data = { username, password}

  await supertest(app)
    .post("/signup")
    .send(data)
    .expect(200)
    .then( (res) => {
      expect(res.body.token).toBeTruthy();
    })

  await supertest(app)
    .post("/signin")
    .send(data)
    .expect(200)
    .then( (res) => {
      expect(res.body.token).toBeTruthy();
    })
})