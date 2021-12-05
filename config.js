// Module to use `dotenv()`
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    apiCountry: process.env.API_COUNTRY,
    port: process.env.PORT,
};

