//Displays Current Day
$(".currentDay").text(moment().format('LLLL'));

let cities = [];

let cityForm = document.querySelector("#city-search-form");
let cityInputEl = document.querySelector("#searched-city");
let weatherContainerEl = document.querySelector("#current-weather-container");
let citySearchInputEl = document.querySelector("#searched-city");
let forecastHeader = document.querySelector("#forecast-header");
let fivedayContainerEl = document.querySelector("#fiveday-container");
let pastCityButtonEl = document.querySelector("#past-city-buttons");
let cityHeader = document.querySelector(".city-header");
let searchBtn = document.querySelector(".search-button");

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
}

let saveSearch = function(){
    //set value of cities array to localStorage, convert to string
    localStorage.setItem("cities", JSON.stringify(cities));
};

let getCityWeather = function(city){
    let apiKey = "844421298d794574c100e3409cee0499"
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, searchCity){
   //clear old content
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   //create an image element
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   //create a span element to hold temperature data
   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   //create a span element to hold Humidity data
   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   //create a span element to hold Wind data
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   //append to container
   weatherContainerEl.appendChild(temperatureEl);

   //append to container
   weatherContainerEl.appendChild(humidityEl);

   //append to container
   weatherContainerEl.appendChild(windSpeedEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}
 
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainerEl.appendChild(uvIndexEl);
}

var get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};


// Diplay 5-Day Forecast
var display5Day = function(weather){
    fivedayContainerEl.textContent = ""
    forecastHeader.textContent = "5-Day Forecast:"
    
    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = "Temperature: " + dailyForecast.main.temp + "°F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        fivedayContainerEl.appendChild(forecastEl);
    }

}

//create past search buttons for cities
let pastSearch = function(pastSearch){
    pastCityEl = document.createElement("city-button");
    //text content of past city button
    pastCityEl.textContent = pastSearch;
    pastCityEl.classList = "d-flex justify-content-around w-100 btn-light p-2";
    //set attribute to hold city name value
    pastCityEl.setAttribute("data-city",pastSearch)
    pastCityEl.setAttribute("type", "submit");
    pastCityEl.style.backgroundColor = "white";
    pastCityEl.style.border = "none";
    pastCityEl.style.textTransform = "capitalize";
    //append to past search buttons
    pastCityButtonEl.prepend(pastCityEl);
}
//get past city weather information
let pastSearchHandler = function(event){
    let city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
        pastSearch();
        cityHeader.textContent = city.toUpperCase();
    }
};

//displays searched city weather information when 'Search' button is clicked
cityForm.addEventListener("submit", citySearchHandler);
////PastSearchHandler function executed when past city buttons are clicked
//displays city weather information
pastCityButtonEl.addEventListener("click", pastSearchHandler);

