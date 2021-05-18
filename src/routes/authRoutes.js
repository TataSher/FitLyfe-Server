const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();

    // Change secret key to env variable
    // Sign JWT with userid so future reqs can send JWT with data
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY' );
    // Token stuff not working so also sending userId
    res.send({ token, userId: user._id });
  } catch (err) {
    return res.status(422).send({ error: "Signup failed, try again" });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).send({ error: "Must provide username and password" });
  }

  // mongoose reaches out to DB
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(422).send({ error: "Invalid password or username" });
  }

  // password comparison
  // user will be this in comparePassword
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token, userId: user._id });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or username" });
  }

})

module.exports = router;