document.getElementById('get-weather').addEventListener('click', getWeather);

document.getElementById('city-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        getWeather();
    }
});

async function getWeather() {
    const cityInput = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    
    if (!cityInput) {
        alert('Please enter a city name');
        return;
    }

    weatherInfo.textContent = 'Loading...';
    weatherInfo.classList.remove('show');

    try {
        // Call the Netlify function instead of directly calling WeatherAPI
        const response = await fetch(`/.netlify/functions/getWeather?city=${encodeURIComponent(cityInput)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        weatherInfo.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p><strong>${data.current.temp_c}°C</strong> / ${data.current.temp_f}°F</p>
            <p>${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} km/h, ${data.current.wind_dir}</p>
        `;
        weatherInfo.classList.add('show');
    } catch (error) {
        console.error('Error:', error);
        weatherInfo.textContent = 'Error fetching weather data. Please try again.';
        weatherInfo.classList.add('show');
    }
}
