const mongoose = require("mongoose");

const testMongoURI = "mongodb+srv://admin:passwordpassword@cluster0.cfznd.mongodb.net/test?retryWrites=true&w=majority";

function setupDatabase() {
  beforeEach((done) => {
    mongoose.connect(
      testMongoURI,
      { useNewUrlParser: true },
      () => done()
    )
  })

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    })
  })
}

module.exports = setupDatabase;