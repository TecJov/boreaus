const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const API_KEY = process.env.WEATHER_API_KEY;  // This will be stored securely in Netlify
    const city = event.queryStringParameters.city;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch weather data' }),
        };
    }
};
