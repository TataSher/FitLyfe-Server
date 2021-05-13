const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: Number,
  description: String,
  image: String
});

const workoutSchema = mongoose.Schema({
  workoutTitle: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema]
});

workoutSchema.set('timestamps', true);

mongoose.model('Workout', workoutSchema);