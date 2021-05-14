const createServer = require("./server")
const supertest = require("supertest");
const setupDatabase = require('./helpers/dbHelper');
const mongoose = require("mongoose");

const User = mongoose.model('User');

setupDatabase();

const app = createServer();

test("POST /signup passing request", async () => {
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

test("POST /signup failing request", async () => {
  await supertest(app)
    .post("/signup")
    .send({})
    .expect(422)
    .then( (res) => {
      expect(res.body.error).toEqual("Signup failed, try again")
    })
})

test("POST /signin passing request", async () => {
  var username = "taran314";
  var password = "taranisthebest";

  const data = { username, password}

  // Mock data by populating db with seed data in helper?
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

test("POST /signin no username or password sent", async () => {
  await supertest(app)
    .post("/signin")
    .send({})
    .expect(422)
    .then( (res) => {
      expect(res.body.error).toEqual("Must provide username and password")
    })
})

test("POST /signin user has not signed up", async () => {
  const username = "taran314";
  const password = "taranisthebest";

  const data = { username, password}
  await supertest(app)
    .post("/signin")
    .send(data)
    .expect(422)
    .then( (res) => {
      expect(res.body.error).toEqual("Invalid password or username")
    })
})

// Data needs to be seeded before we can cover line 45 on authRoutes.