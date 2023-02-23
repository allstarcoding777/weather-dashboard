//Displays Current Day
$(".currentDay").text(moment().format('LLLL'));

let cities = [];
let cityForm = document.querySelector("#city-search-form");
let cityInputEl = document.querySelector("#searched-city");
let weatherDataEl = document.querySelector("#current-weather-container");
let citySearchInputEl = document.querySelector("#searched-city");
let forecastHeader = document.querySelector("#forecast-header");
let fivedayContainerEl = document.querySelector("#fiveday-container");
let pastCityButtonEl = document.querySelector("#past-city-buttons");
let cityHeader = document.querySelector(".city-header");
let searchBtn = document.querySelector(".search-button");

// Fetch weather data from openweathermap api
let getCityWeather = function(city){
    let apiKey = "12e404ad3fb6723e05bd884ac853d668"
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

//Search button function
let citySearchHandler = function(event){
    event.preventDefault();
    let city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
        cityHeader.textContent = city.toUpperCase();
    }
    saveSearch();
    pastSearch(city);
};


let saveSearch = function(){
    // set value of cities array to localStorage, convert to string
    localStorage.setItem("cities", JSON.stringify(cities));
};


let pastSearch = function(pastSearch){
    // create past search buttons for cities
    pastCityEl = document.createElement("city-button");
    pastCityEl.textContent = pastSearch;
    pastCityEl.classList = "d-flex justify-content-around w-100 btn-light p-2";
    // set attribute to hold city name value
    pastCityEl.setAttribute("data-city",pastSearch)
    pastCityEl.setAttribute("type", "submit");
    pastCityEl.style.backgroundColor = "white";
    pastCityEl.style.border = "none";
    pastCityEl.style.textTransform = "capitalize";
    // append to past search buttons
    pastCityButtonEl.prepend(pastCityEl);
}

// get weather information for past cities searched
let pastSearchHandler = function(event){
    let city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
        pastSearch();
        cityHeader.textContent = city.toUpperCase();
    }
};

// display weather data
let displayWeather = function(weather, searchCity){

   //clear out old weather data
   weatherDataEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   //create an element to hold temperature data
   let temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   //create element to hold Humidity data
   let humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   //create element to hold Wind data
   let windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   //append to current weather data container
   weatherDataEl.appendChild(temperatureEl);

   //append to current weather data container
   weatherDataEl.appendChild(humidityEl);

   //append to current weather data container
   weatherDataEl.appendChild(windSpeedEl);
   let lat = weather.coord.lat;
   let lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

// get UV index
let getUvIndex = function(lat,lon){
    let apiKey = "12e404ad3fb6723e05bd884ac853d668"
    let apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
        });
    });
}
 
let displayUvIndex = function(index){
    let uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    //append index value to index element
    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather container
    weatherDataEl.appendChild(uvIndexEl);
}

let get5Day = function(city){
    let apiKey = "12e404ad3fb6723e05bd884ac853d668"
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Days(data);
        });
    });
};

// Diplay 5-Day Forecast
let display5Days = function(weather){
    fivedayContainerEl.textContent = ""
    forecastHeader.textContent = "5-Day Forecast:"

    // variable to hold forecast data
    let forecast = weather.list;
        for(let i=5; i < forecast.length; i=i+8){
       let dailyForecast = forecast[i];
       // create card element to hold forecast data 
       let fiveDayForecast=document.createElement("div");
       fiveDayForecast.classList = "card bg-primary text-light m-2";

       //create date element
       let fiveDayDates = document.createElement("h5")

       //moment.unix converts the date from unix to a readable format
       fiveDayDates.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       fiveDayDates.classList = "card-header text-center"
       //append to forecast card
       fiveDayForecast.appendChild(fiveDayDates);
       
       //create temperature span
       let forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = "Temperature: " + dailyForecast.main.temp + "°F";

        //append to forecast card
        fiveDayForecast.appendChild(forecastTempEl);

       //create humidity span
       let forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";

       //append to forecast card
       fiveDayForecast.appendChild(forecastHumEl);

       //append to five day container
        fivedayContainerEl.appendChild(fiveDayForecast);
    }
};

// Displays searched city weather information when 'Search' button is clicked
cityForm.addEventListener("submit", citySearchHandler);

// Displays city weather information when past city button is clicked
pastCityButtonEl.addEventListener("click", pastSearchHandler);

