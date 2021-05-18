const express = require("express");
require('../src/models/workout');
require('../src/models/user');
const workoutRoutes = require('../src/routes/workoutRoutes');
const authRoutes = require('../src/routes/authRoutes');

function createServer() {
	const app = express()
	app.use(express.json())
	app.use(workoutRoutes)
	app.use(authRoutes)
	return app
}

module.exports = createServer