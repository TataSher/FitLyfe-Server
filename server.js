const express = require("express")
require('./src/models/workout');
const routes = require('./src/routes/workoutRoutes')

function createServer() {
	const app = express()
	app.use(express.json())
	app.use(routes)
	return app
}

module.exports = createServer