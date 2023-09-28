// JavaScript to fetch weather data from OpenWeather API
document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '9b47e2ec44dee886bb405198b7a4b6b3'; // OpenWeather API key
    const form = document.querySelector('#weather-form');
    const locationSelect = document.querySelector('#location');
    const temperatureValue = document.querySelector('#temperature');
    const weatherConditionValue = document.querySelector('#weather-condition');
    const humidityValue = document.querySelector('#humidity'); 
    const windSpeedValue = document.querySelector('#wind-speed'); 
    const cityNameElement = document.querySelector('#city-name');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const selectedLocation = locationSelect.value;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Update weather information in the HTML
                temperatureValue.textContent = `${data.main.temp}°C`;
                weatherConditionValue.textContent = data.weather[0].description.toUpperCase();
                humidityValue.textContent = `${data.main.humidity}%`; 
                windSpeedValue.textContent = `${data.wind.speed} km/h`; 

                // Updating the city name dynamically
                cityNameElement.textContent = selectedLocation.toUpperCase();
            })
            .catch((error) => {
                console.error('Error fetching weather data try 30 seconds later:', error);
            });
    });
});