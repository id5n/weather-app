const { apiUrl, apiKey, apiCountry, port } = require("./config");


// Setup empty JS object to act as endpoint for all routes
const weatherData = { 
  // Use an array to store each API call
  zipCodeData: [],
  userFeelings: [],
};


/* Setup Server Environment */
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();


/* Dependencies */
// Require `body-parser`
const bodyParser = require("body-parser");

// Require "node-fetch"
const fetch = require("node-fetch");


/* Middleware */
// Configure Express to use `body-parser` as middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require `cors` to allow cross-origin resource sharing
const cors = require("cors");
app.use(cors());

/* Routes and Page Rendering */
//Use the POST method on the "/weather" endpoint in order to receive user input on feelings/mood
app.post("/weather/", (req,res) => {
    // Append most recent feelings/mood from value generated with "feelings"cID on client-side
    weatherData.userFeelings.unshift(req.body.feelings);
    res.send(weatherData.userFeelings);
});

// Use the GET method on the "/weather" endpoint in order to receive zip codes as a parameter and process it for weather data
app.get("/weather/:zip", zipCodeWeather);

// Callback function that creates a new entry in the `projectData` object based on endpoint parameters
function zipCodeWeather(req, res) {
  // Format zip code input from user to match API call specification based on endpoint parameter received
    const inputZip = `zip=${req.params.zip}`;
    // Call `getWeather()` to retrieve information from API and then post through HTML     
    getWeather(apiUrl, inputZip, apiCountry, apiKey)
    // Use `.then()` Promise method to retrieve and format data from the OpenWeather API
    .then(function(data) {
        // Retrieves data as long as zip code is valid
        if (data.cod == 200) {
            // Create instance of new `Date()` object
            const dateObj = new Date();
            // Convert date object to local date and timezone
            const localDateTime = dateObj.toLocaleString('en-US');
            // Create object that retrieves and displays key-values for the API call
            let newWeatherData = {
                // Create a new date instance dynamically with JS
                date: `${localDateTime}`,
                // Use city name from API call in GET request and zip code from client-side
                location: `${data.name}, ${req.params.zip}`, 
                // Use current weather from API call in GET request
                weather: `${data.weather[0].main}`,
                // Use current weather icon from API call in GET request
                weatherIcon: `${getWeatherIcon(data.weather[0].icon)}`,
                // Use current rounded temperature from API call in GET request
                temp: `${Math.round(data.main.temp, 1)}°F`,
                // Use feelings/mood stored in first index from "userFeelings" array
                content: `${weatherData.userFeelings[0]}`,
            };
            // Add new weather data object to "weatherData"
            weatherData.zipCodeData.unshift(newWeatherData);
            // Remove older feeling entries moved to the end of the index for "userFeelings"
            weatherData.userFeelings.pop();
            // Display updated object
            console.log(weatherData);
            res.send(weatherData);
        } else {
            // Log the empty or erroneous zip code
            console.log(`${req.params.zip} is not a valid zip code.`);
            // Send the error response so that the client side can access it for the on-screen error message
            res.send(req.params.zip);
        }
    });
    return weatherData;
}

// Helper callback function that fetches/GETS API data asynchronously
const getWeather = async (url, zip, country, key) => {
    // Use an asynchronous `fetch` command to combine strings for API call
    const response = await fetch(url + zip + country + key);
    // Try to wait for the JSON data to come in and return it for GET request
    try {
        const queryData = await response.json();
        return queryData;
    } catch(error) {
        console.log("error: ", error);
    }
};

// Callback function that retrieves icon based on weather
const getWeatherIcon = (weather) => {
    // Set base URL based on specifications from "openweathermap.org"
    const urlHead = "http://openweathermap.org/img/wn/";
    return `${urlHead}${weather}.png`;
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