/* Global Variables */

// Create an object for API credentials and configurations
const apiCredential = {
  url: "//api.openweathermap.org/data/2.5/weather?",
  country: "us",
  key: "&appid=fff3da07f74837c2ecfeff995ffe453b",
};


/* Event Function to display dynamic data for weather and mood */
document.querySelector("#generate").addEventListener("click", weatherStats);


/* API Functions */
// Main callback function for retrieving weather from API
function weatherStats(event) {
    // Format zip code input from user to match API call specification
    const inputZip = `zip=${document.querySelector("#zip").value}`;
    // Format country key in `apiCredential` object to match API call specification along with temperature converted to Fahrenheit
    const inputCountry = `,${apiCredential.country}&units=imperial`;
    
    // Call `getWeather()` to retrieve information from API and then post through HTML     
    getWeather(apiCredential.url, inputZip, inputCountry, apiCredential.key)
   
    // Use `.then()` Promise method to format and post data to the server through "/addWeather" that will then update the HTML
    .then(function(data) {
        // Retrieves data as long as zip code is valid
        if (data.cod == 200) {
            // Create a new date instance dynamically with JS
            let d = new Date();
            // Use `postWeather()`
            postWeather("/addWeather", {
                // Use `Date` object to generate date and time for "/addWeather"
                date: `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
                // Use city name from API call in GET request and zip code from ID
                location: `${data.name}, ${document.querySelector("#zip").value}`,
                // Use current weather from API call in GET request
                weather: `${data.weather[0].main}`,
                // Use current weather icon from API call in GET request
                weatherIcon: `${getWeatherIcon(data.weather[0].icon)}`,
                // Use current rounded temperature from API call in GET request
                temp: `${Math.round(data.main.temp, 1)}°F`,
                // Use feelings content from ID generated from value selected
                content: `${document.querySelector("#feelings").value}`,
            });
            // Use `updateResults()`
            updateResults();
            clearInputResults();
        } else {
            // Log the empty or erroneous zip code
            console.log(`${document.querySelector("#zip").value} is not valid.`);
            // Display error message on-screen and clear previous search results if present with `errorClearResults()`
            errorClearResults();
        }
    });
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

// Helper callback function that POSTS API data asynchronously
const postWeather = async (url = "", data = {}) => {
    // Use an asynchronous `fetch` command to retrieve URL and convert data to JSON string
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // Try to wait for the data an return it for POST request
    try {
        const newData = await response.json();
        return newData;
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

// Callback function that updates the HTML page with the results pulled from the weather API hosted on the "/dataResults" route server-side
const updateResults = async () => {
    const request = await fetch("/dataResults");
    
    try {
        // Use async to pull the results stored to `projectData`
        const weatherData = await request.json();
        console.log("Retrieved on the client side: ", weatherData);
        // Ensures that `.title` inner HTML matches original content
        document.querySelector(".title").innerHTML = "Most Recent Entry";
        // Generate most recent date for `#date` ID using `newDate` object retrieved in `postWeather()`
        document.querySelector("#date").innerHTML = `Date and Time: ${weatherData.data[0].date}`;
        // Generate most recent city and zip code for `#location` ID using location data retrieved in `postWeather()`
        document.querySelector("#location").innerHTML = `City and Zip Code: ${weatherData.data[0].location}`;
        // Generate most recent weather and weather icon for `#weather` ID using temperature data retrieved in `postWeather()`
        document.querySelector("#weather").innerHTML = `<span class="weatherStatus">Current Weather: ${weatherData.data[0].weather}</span> <img src=${weatherData.data[0].weatherIcon} class="icon" alt="Icon for ${weatherData.data[0].weather} weather">`;
        // Generate most recent temperature for `#temp` ID using temperature data retrieved in `postWeather()`
        document.querySelector("#temp").innerHTML = `Current Temperature: ${weatherData.data[0].temp}`;
        // Generate most recent mood content using data from `#feelings` ID retrieved in `postWeather()`
        document.querySelector("#content").innerHTML = `Current Mood: ${weatherData.data[0].content}`;
    } catch(error) {
        console.log("error: ", error);
    }
};

// Callback function that clears zip code and feelings once results are generated inside of the "Most Recent Entry" Section
const clearInputResults = () => {
    // Restore placeholder value for zip code
    document.querySelector("#zip").value = "";
    // Restore placeholder value for current feelings
    document.querySelector("#feelings").value = "";
}

// Callback function that clears previous search results in case of error with new search
const errorClearResults = () => {
    // Sets inner HTML content to explain error message
    document.querySelector(".title").innerHTML = `Sorry, '${document.querySelector("#zip").value}' is not a valid US zip code. Please try again.`;
    // Resets `#date` content
    document.querySelector("#date").innerHTML = "";
    // Resets `#location` content
    document.querySelector("#location").innerHTML = "";
    // Resets `#weather` content
    document.querySelector("#weather").innerHTML = "";
    // Resets `#temp` content
    document.querySelector("#temp").innerHTML = "";
    // Resets `#content` content
    document.querySelector("#content").innerHTML = "";
}