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
    const selectedLocation = locationSelect.value;

    function generateShareableURL() {
        const weatherData = {
          temperature: temperatureValue.textContent,
          condition: weatherConditionValue.textContent,
          humidity: humidityValue.textContent,
          windSpeed: windSpeedValue.textContent,
        };
      
        //  URL with query parameters
        const shareURL = `https://foreclime.vercel.app/?location=${selectedLocation}&temp=${weatherData.temperature}&cond=${weatherData.condition}&hum=${weatherData.humidity}&wind=${weatherData.windSpeed}`;
      
        return shareURL;
      }

      function captureWeatherImage() {
        const weatherBox = document.querySelector('.weather-box');
      
        return html2canvas(weatherBox, { useCORS: true }).then((canvas) => {
          return canvas.toDataURL('image/jpeg', 0.9);
        });
      }

      async function shareWeather() {
        try {
          const shareURL = generateShareableURL();
          const shareData = {
            title: 'Check out the weather!',
            text: `Current weather in ${selectedLocation}: ${weatherConditionValue.textContent}, ${temperatureValue.textContent}`,
            url: shareURL,
          };
      
          // Capture the weather box as an image
          const weatherImage = await captureWeatherImage();
      
          // Adding the image to the share data
          shareData.files = [new File([weatherImage], 'weather.jpg', { type: 'image/jpeg' })];
      
          // Web Share API to provide sharing options
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            // Fallback for browsers that don't support Web Share API
            alert('Sharing not supported on this browser.');
          }
        } catch (error) {
          console.error('Error sharing weather:', error);
        }
      }
      
      // shareWeather function to the share button
      const shareButton = document.getElementById('share-button');
      shareButton.addEventListener('click', shareWeather);

      // Code for fetching weather data from api
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