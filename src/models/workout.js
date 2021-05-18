const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  exercises: [exerciseSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

workoutSchema.set('timestamps', true);

mongoose.model('Workout', workoutSchema);