// JavaScript to fetch weather data from OpenWeather API
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

  // Code for fetching weather data from api
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const selectedLocation = locationSelect.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update weather information in the HTML
        temperatureValue.textContent = `${data.main.temp}°C`;
        weatherConditionValue.textContent =
          data.weather[0].description.toUpperCase();
        humidityValue.textContent = `${data.main.humidity}%`;
        windSpeedValue.textContent = `${data.wind.speed} km/h`;

        // Updating the city name dynamically
        cityNameElement.textContent = selectedLocation.toUpperCase();

        // ForeClime Website Url
        function websiteUrl() {
          const webUrl = "https://foreclime.vercel.app/";
          return webUrl;
        }

        // Function to generate the URL [REMOVED]

        // Function to generate the shareable text and URL
        function generateShareableText() {
          const title = `Check out the weather in ${selectedLocation.toUpperCase()}! From ForeClime(${websiteUrl()})`;
          const weatherText = `Current weather in ${selectedLocation.toUpperCase()}:\n
          - Weather Condition: ${data.weather[0].description.toUpperCase()}
          - Temperature: ${data.main.temp}°C
          - Humidity: ${data.main.humidity}%
          - Wind Speed: ${data.wind.speed} km/h`;
        //   [REMOVED]const shareURL = generateShareableURL(); // Calling the existing function to generate the URL
          return `${title}\n\n${weatherText}`;
        }

        // Function to handle sharing when the share button is clicked
        async function shareWeatherText() {
          try {
            const shareText = generateShareableText();

            // Web Share API to provide sharing options for text
            if (navigator.share) {
              await navigator.share({ text: shareText });
            } else {
              // Fallback for browsers that don't support Web Share API
              alert("Sharing not supported on this browser.");
            }
          } catch (error) {
            console.error("Error sharing weather:", error);
          }
        }

        // Attached the shareWeatherText function to the share button
        const shareButton = document.getElementById("share-button");
        shareButton.addEventListener("click", shareWeatherText);
      })
      .catch((error) => {
        console.error(
          "Error fetching weather data try 30 seconds later:",
          error
        );
      });
  });
});
