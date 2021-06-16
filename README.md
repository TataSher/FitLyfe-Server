# FitLyst server

## Project Overview

- FitLyst is our final project at Makers which is a fitness app which lets you create and track customisable workouts!
- This repository contains the backend node server, we created the frontend in react-native [here](https://github.com/Emmapr123/ControLLyfe-ReactNative).
- See our presentation for the app [here](https://docs.google.com/presentation/d/1RAreAAcFBBwqKJzzTdg3jYobHmaJ4x4WhKINr6EscDw/edit?usp=sharing).

## Instructions

- `npm i` to install dependencies
- `npm i --save-dev nodemon`
- To run the server `npm run dev`

## Dependencies
- Express
- JsonWebTokens
- bcrypt
- Mongoose
Development:
- Nodemon
- Jest
- Supertest

## API routes

| Endpoint          | Functionality            | Deployed         |
| ----------------  | -------------------------|------------------|
| Workout           |
| POST /workout     | Create new workout       |:heavy_check_mark:|
| GET /workout      | Returns all workouts     |:heavy_check_mark:|
| GET /workout:id   | Return the workout of :id|:heavy_check_mark:|
| PUT /workout:id   | Update the workout of :id|:heavy_check_mark:|
| DELETE /workout:id| Delete the workout of :id|:heavy_check_mark:|
| User              |
| POST /signup      | Create new user          |:heavy_check_mark:|
| POST /signin      | Authenticates user       |:heavy_check_mark:|

API Notes
--------

- Example Input for POST /signup and POST /signin (need to provide username and password)

```JSON
  {
    "email": "test1@hotmail.co.uk",
    "password": "mypassword"
  }
```

- Example Input for POST /workout and PUT /workout:id (need to provide workoutTitle and exercises)

```JSON
  {
    "workoutTitle": "Upper body",
    "exercises": [
        {
            "title": "Curl",
            "duration": 60,
            "description": "oof",
            "image": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Squat_press_move.jpg"
        }
    ]
}
```

Example output
```JSON
{
    "_id": "609d419518946222fd77dd85",
    "workoutTitle": "Upper body",
    "exercises": [
        {
            "_id": "609d419518946222fd77dd86",
            "title": "Curl",
            "duration": 60,
            "description": "oof",
            "image": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Squat_press_move.jpg"
        }
    ],
    "createdAt": "2021-05-13T15:11:17.726Z",
    "updatedAt": "2021-05-13T15:11:17.726Z",
    "__v": 0
}
```

## Team

Emma Priester | Tarandeep Nandhra | Ralph Bartley | Natalia Sherchenkova
