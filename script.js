const apiKey = '105067465fe24010bf2174436241409'; 

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
    const backgroundImage = document.querySelector('.background-image');
    
    if (!cityInput) {
        alert('Please enter a city name');
        return;
    }

    weatherInfo.textContent = 'Loading...';
    weatherInfo.classList.remove('show');

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityInput)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const condition = data.current.condition.text.toLowerCase();
        const isRainy = condition.includes('rain');
        const isSunny = condition.includes('sun') || condition.includes('clear');
        const isWindy = data.current.wind_kph > 20;

        let newBackground = "url('sun.gif')";
        if (isRainy && isWindy) {
            newBackground = "url('storm.gif')";
        } else if (isRainy) {
            newBackground = "url('rain.gif')";
        } else if (isSunny) {
            newBackground = "url('sun.gif')";
        }

        backgroundImage.classList.add('fade-out');
        setTimeout(() => {
            backgroundImage.style.backgroundImage = newBackground;
            backgroundImage.classList.remove('fade-out');
        }, 500);

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
