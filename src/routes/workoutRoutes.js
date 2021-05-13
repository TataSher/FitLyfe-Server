const express = require('express');
const mongoose = require('mongoose');

const Workout = mongoose.model('Workout');

const router = express.Router();

router.get('/workout', async (req, res) => {
  const workouts = await Workout.find({});
  res.send(workouts);
});

router.get('/workout/:id', async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id });
    res.send(workout);
  } catch {
    res.status(404);
    res.send({ error: "Workout doesn't exist!" });
  }
});

router.post('/workout', async (req, res) => {
  const { workoutTitle, exercises } = req.body;
  
  if (!workoutTitle || !exercises) {
    return res.status(422).send({ error: "You must provide a workout title and exercises" })
  }

  try {
    const workout = new Workout({ workoutTitle, exercises });
    await workout.save();
    res.send(workout);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete('/workout/:id', async (req, res) => {
  try {
    await Workout.findOneAndRemove({ _id: req.params.id });
    res.send({ message: "Deleted" });
  } catch {
    res.status(404).send({ error: "Workout doesn't exist!"});
  }
});

router.put('/workout/:id', async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, {
      workoutTitle: req.body.workoutTitle,
      exercises: req.body.exercises
    });

    res.send({ message: "Workout updated" });      

    } catch(err) {
      res.status(404).send({ error: "Workout doesn't exist!"});
  }
});

module.exports = router;