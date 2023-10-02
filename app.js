document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "9b47e2ec44dee886bb405198b7a4b6b3"; // OpenWeather API key
  const form = document.querySelector("#weather-form");
  const locationSelect = document.querySelector("#location");
  const temperatureValue = document.querySelector("#temperature");
  const weatherConditionValue = document.querySelector("#weather-condition");
  const humidityValue = document.querySelector("#humidity");
  const windSpeedValue = document.querySelector("#wind-speed");
  const cityNameElement = document.querySelector("#city-name");
  const shareButton = document.querySelector("#share-button");

  // Function to update the sharing data based on the selected city
  function updateSharingData(selectedLocation) {
    const title = `Check out the weather in ${selectedLocation.toUpperCase()}!`;
    const weatherText = `Current weather in ${selectedLocation.toUpperCase()}: [From ForeClime(https://foreclime.vercel.app/)]\n
    - Weather Condition: ${weatherConditionValue.textContent.toUpperCase()}
    - Temperature: ${temperatureValue.textContent}
    - Humidity: ${humidityValue.textContent}
    - Wind Speed: ${windSpeedValue.textContent}`;
    return {
      title,
      text: weatherText,
    };
  }

  // Function to handle sharing when the share button is clicked
  async function shareWeatherText() {
    try {
      const selectedLocation = locationSelect.value;
      const sharingData = updateSharingData(selectedLocation);

      // Web Share API to provide sharing options for text
      if (navigator.share) {
        await navigator.share(sharingData);
      } else {
        // Fallback for browsers that don't support Web Share API
        alert("Sharing not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing weather:", error);
    }
  }

  // Code for fetching weather data from the API
  form.addEventListener("submit", function (event) {
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

        // Attached the shareWeatherText function to the share button click event
        shareButton.addEventListener("click", shareWeatherText);
      })
      .catch((error) => {
        console.error("Error fetching weather data try 30 seconds later:", error);
      });
  });
});
