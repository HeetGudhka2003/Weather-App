// Select DOM elements related to the weather information

let dateTime = document.querySelector(".weather-date-time"); // Element to display date and time

let weatherForecast = document.querySelector(".weather-forecast"); // Element to display the weather forecast (like 'Clear', 'Cloudy')

let weatherTemperature = document.querySelector(".weather-temperature"); // Element to display the current temperature

let weatherIcon = document.querySelector(".weather-icon"); // Element to display the weather icon

let weatherMinimumTemperature = document.querySelector(".weather-min"); // Element to display the minimum temperature

let weatherMaximumTemperature = document.querySelector(".weather-max"); // Element to display the maximum temperature

let weatherCity = document.querySelector(".weather-city"); // Element to display the city and country

let weatherFeelsLike = document.querySelector(".weather-feels-like"); // Element to display the 'feels like' temperature

let weatherHumidity = document.querySelector(".weather-humidity"); // Element to display the humidity

let weatherWind = document.querySelector(".weather-wind"); // Element to display the wind speed

let weatherPressure = document.querySelector(".weather-pressure"); // Element to display the pressure

let citySearch = document.querySelector(".weather-search"); // Element representing the search form

// Function to format and display the current date and time

const getDateTime = (dt) => {

    // Convert Unix timestamp (seconds) into JavaScript Date object (milliseconds)

    const currentDate = new Date(dt * 1000);

    // Log the date object to the console for debugging

    console.log(currentDate);

    // Options to format the date and time

    const options = {

        weekday: "long", // Display the full name of the day (e.g., "Monday")

        year: "numeric", // Display the full year (e.g., "2024")

        month: "long", // Display the full name of the month (e.g., "September")

        day: "numeric", // Display the day of the month (e.g., "26")

        hour: "numeric", // Display the hour

        minute: "numeric", // Display the minutes
    };

    // Create a new formatter using the above options

    const formatter = new Intl.DateTimeFormat("en-US", options);

    // Format the current date using the formatter

    const formattedDate = formatter.format(currentDate);

    // Return the formatted date string

    return formattedDate;
};

// Search function to allow users to input and submit a city name

let city = "Mumbai"; // Default city is set to 'Mumbai'

// Add event listener to handle form submission for searching weather data by city

citySearch.addEventListener("submit", (e) => {

    e.preventDefault(); // Prevent the form from refreshing the page on submit

    let cityName = document.querySelector(".city-name"); // Get the city name input field

    city = cityName.value; // Assign the input value to the `city` variable

    getWeatherData(); // Fetch the weather data for the new city

    cityName.value = ""; // Clear the input field after search
});

// Function to fetch weather data from OpenWeather API

const getWeatherData = async () => {

    // OpenWeather API URL, dynamically inserting the city name and API key

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=db869d95363f78c6c96ea15cba4c4cbb`;

    try {

        // Make an asynchronous request to fetch weather data

        const response = await fetch(weatherURL);

        // Convert the response to JSON format

        const data = await response.json();

        // Log the entire data object to the console for debugging

        console.log(data);

        // Destructure the necessary weather data from the API response

        const { main, name, sys, weather, wind, dt } = data;

        // Update the DOM elements with the retrieved weather data

        weatherCity.innerHTML = `${name}, ${sys.country}`; // Display city and country

        dateTime.innerHTML = getDateTime(dt); // Format and display the current date and time

        weatherForecast.innerHTML = `${weather[0].main}`; // Display the main weather condition (e.g., "Clouds", "Clear")

        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`; // Display the weather icon

        // Display temperatures (current, min, max, and feels-like) with the degree symbol

        weatherTemperature.innerHTML = `${main.temp}&#176`;

        weatherMinimumTemperature.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;

        weatherMaximumTemperature.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        weatherFeelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`; 

        // Display humidity, wind speed, and pressure

        weatherHumidity.innerHTML = `${main.humidity}%`;

        weatherWind.innerHTML = `${wind.speed} m/s`;

        weatherPressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {

        // Log the error in case the API request fails

        console.log(error);
    }
};

// Add an event listener to the window to fetch weather data for the default city on page load

window.addEventListener("load", getWeatherData);