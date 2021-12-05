/* Event Function to display dynamic data for weather and mood */
document.querySelector("#generate").addEventListener("click", getWeatherStats);


/* API Functions */
// Main callback function for retrieving weather from API
function getWeatherStats(event) {
    if (document.querySelector("#zip").value != "") {
        // Use `updateResults()`
        updateResults();
    } else {
        document.querySelector("#entryHolder").innerHTML = 
        `<p>Please enter a zip code value.</p>`
    }
    // Use `event.preventDefault()` in order to keep browser from refreshing/resetting automatically once submit button is clicked
    event.preventDefault();
    // Use `clearInputResults()` within `setTimeout()` for 0.125 seconds in order to allow the browser to capture the failed zip code before resetting input fields
    setTimeout(clearInputResults, 125);
}


/* Helper Functions */
// Asynchronous callback function that updates the HTML page with the results pulled from the weather API hosted on the "/zipcode" endpoint server-side by using the zip code as a parameter
const updateResults = async () => {
    // Use `postUserFeelings()` function to add to "/weather" route data
        postUserFeelings("/weather", {
            feelings: document.querySelector("#feelings").value,
        });

    // Fetch "/weather" endpoint details
    const request = await fetch(`/weather/${document.querySelector("#zip").value}`);
    
    try {
        // Use `await` to retrieve weather data sent by the response from the server-side "/weather" endpoint in JSON format
        const weatherData = await request.json();
        console.log("Retrieved on the client side: ", weatherData);
        // Display `weatherData` object key-value data in HTML body
        // Ensures that `.title` inner HTML matches original content
        document.querySelector(".title").innerHTML = "Most Recent Entry";
        // Display most recent date for `#date` ID with date data retrieved from the server
        document.querySelector("#date").innerHTML = `Date and Time: ${weatherData.zipCodeData[0].date}`;
        // Display most recent city and zip code for `#location` ID with location data retrieved from the server
        document.querySelector("#location").innerHTML = `City and Zip Code: ${weatherData.zipCodeData[0].location}`;
        // Display most recent weather and weather icon for `#weather` ID with weather and icon data retrieved from the server
        document.querySelector("#weather").innerHTML = `<span class="weatherStatus">Current Weather: ${weatherData.zipCodeData[0].weather}</span> <img src=${weatherData.zipCodeData[0].weatherIcon} class="icon" alt="Icon for ${weatherData.zipCodeData[0].weather} weather">`;
        // Display most recent temperature for `#temp` ID with temperature data retrieved from the server
        document.querySelector("#temp").innerHTML = `Current Temperature: ${weatherData.zipCodeData[0].temp}`;
        // Display most recent mood content for `#feelings` ID with content data retrieved from the server
        document.querySelector("#content").innerHTML = `Current Mood: ${weatherData.zipCodeData[0].content}`;
        // Move scroll position to display weather results once data is retrieved
        document.querySelector("#content").scrollIntoView(true, {behavior: "smooth"});
    } catch(error) {
        console.log("error: ", error);
        errorResults();
    }
};

// Helper callback function to post user feelings/mood from <textarea> field to route on server
const postUserFeelings = async (feelings = "", data = {}) => {
    // Use an asynchronous `fetch` command to retrieve URL and convert data to JSON string
    const response = await fetch(feelings, {
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

// Callback function that clears zip code and feelings once results are generated inside of the "Most Recent Entry" Section
const clearInputResults = () => {
    // Restore placeholder value for zip code
    document.querySelector("#zip").value = "";
    // Restore placeholder value for current feelings
    document.querySelector("#feelings").value = "";
};

// Callback function that clears previous search results in case of error with new search as well as indicating which zip code failed
const errorResults = () => {
    // Sets inner HTML content to explain error message
    document.querySelector("#entryHolder").innerHTML =
            `<p>There was an error when trying to find the weather for this zip code. Are you sure that <strong><em>${document.querySelector("#zip").value}</em></strong> is valid? Please try another zip code if this happens again.</p>`;
};