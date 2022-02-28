function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayforecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = ` <div class="row"> `;
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    days.forEach(function (day){
         forecastHTML = forecastHTML + `<div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img src="pics/broken clouds.png" alt="" width="25px" height="25px">
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature">12°</span><span class="weather-forecast-temperature">18°</span>
                </div>
            </div>`;
    })
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#Temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#Humidity");
    let pressureElement = document.querySelector("#pressure");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    pressureElement.innerHTML = Math.round(response.data.main.pressure);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `pics/${response.data.weather[0].description}.png`);
}

function search(city) { 
let ApiKey = "2bb25f83d9730c68e1f5d645832d1509";
let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
axios.get(ApiUrl).then(displayTemperature);
}

function searchEngine(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#Temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);  
}

function displayCelsiusLinkTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#Temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);  
}

let celsiusTemperature = null;

displayforecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusLinkTemp);

search("New York");