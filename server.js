const { masterKey, port } = require("./config");

// Setup empty JS object to act as endpoint for all routes
projectData = { 
  // Use an array to store each API call
  data: [],
};


/* Setup Server Environment */
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();


/* Dependencies */
// Require `body-parser`
const bodyParser = require("body-parser");


/* Middleware */
// Configure Express to use `body-parser` as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require `cors` to allow cross-origin resource sharing
const cors = require("cors");


/* Routes and Page Rendering */
// GET Route for weather data. Connected to `updateResults()` on client side.
app.get("/dataResults", retrieveData);

// Callback function that returns `projectData` object
function retrieveData(request, response) {
  response.send(projectData);
  console.log("Retrieved on the server side and sent to '/dataResults': ", projectData);
}

// POST Route for weather data
app.post("/addWeather", addWeather);

// Callback function that creates a new entry in the `projectData` object
function addWeather(request, response) {

  // Create an object that will store the values for each key, append them to the beginning of a nested array inside of the server side `projectData` object, and return them when pulled into HTML by the `updateResults()` function on the client side
  let newWeather = {
    // Date for the `#date` ID in HTML
    date: request.body.date,
    // Location for the `#location` ID in HTML
    location: request.body.location,
    // Weather for the `#weather` ID in HTML
    weather: request.body.weather,
    // Weather Icon for the `#weather` ID in HTML
    weatherIcon: request.body.weatherIcon,
    // Temperature for the `#temp` ID in HTML
    temp: request.body.temp,
    // Feeling content for the `#content` ID in HTML
    content: request.body.content,
  }
  // Use `.unshift()` to append data to the beginning of the array so that most recent information displays
  projectData.data.unshift(newWeather);
  response.send(projectData);
  console.log("Retrieved on the server side and sent to '/addWeather': ", projectData);
}


/* Server File and Port Configuration */
// Initialize the main project folder
app.use(express.static("app"));

// Setup Port and Server
const server = app.listen(process.env.PORT || port, listening);

// Callback function for port and server
function listening() {
  console.log(`server is running on localhost: ${port}`);
}