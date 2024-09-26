let dateTime = document.querySelector(".weather-date-time");

let weatherForecast = document.querySelector(".weather-forecast");

let weatherTemperature = document.querySelector(".weather-temperature");

let weatherIcon = document.querySelector(".weather-icon");

let weatherMinimumTemperature = document.querySelector(".weather-min");

let weatherMaximumTemperature = document.querySelector(".weather-max");

let weatherCity = document.querySelector(".weather-city");

let weatherFeelsLike = document.querySelector(".weather-feels-like");

let weatherHumidity = document.querySelector(".weather-humidity");

let weatherWind = document.querySelector(".weather-wind");

let weatherPressure = document.querySelector(".weather-pressure");

let citySearch = document.querySelector(".weather-search");

// Get current date and time

const getDateTime = (dt) => {

    const currentDate = new Date(dt * 1000); // Convert seconds to milliseconds

    console.log(currentDate);

    const options = {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric",

        hour: "numeric",

        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);

    const formattedDate = formatter.format(currentDate);

    return formattedDate;
};

// Search function

let city = "Mumbai";

citySearch.addEventListener("submit", (e) => {

    e.preventDefault();

    let cityName = document.querySelector(".city-name"); // This is the input field

    city = cityName.value;

    getWeatherData();

    cityName.value = ""; // Clear the input field after search
});

// Get weather data

const getWeatherData = async () => {

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=db869d95363f78c6c96ea15cba4c4cbb`;

    try {

        const response = await fetch(weatherURL);

        const data = await response.json();

        console.log(data);

        const { main, name, sys, weather, wind, dt } = data;

        weatherCity.innerHTML = `${name}, ${sys.country}`;

        dateTime.innerHTML = getDateTime(dt);

        weatherForecast.innerHTML = `${weather[0].main}`;

        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;
        
        weatherTemperature.innerHTML = `${main.temp}&#176`;

        weatherMinimumTemperature.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;

        weatherMaximumTemperature.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        weatherFeelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`;

        weatherHumidity.innerHTML = `${main.humidity}%`;

        weatherWind.innerHTML = `${wind.speed} m/s`;

        weatherPressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {

        console.log(error);
    }
};

// Use window object to attach the load event

window.addEventListener("load", getWeatherData);