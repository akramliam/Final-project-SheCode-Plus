let pDate = document.querySelector("#txt-date");
let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];


days = days[day];

if (minutes < 10) {
  minutes = "0" + minutes;
}

pDate.innerHTML = `${days} ${hour}:${minutes}`;
///////

function dailyForecast(response){
  console.log("dailyForecast function");

  console.log(response.data.daily);
let forecastElement=document.querySelector("#forecast");
let forecastHTML=`<div class="row">`;
let days=["Sat","Sun","Mon","Tue","Wed"];
days.forEach(function(day){
  forecastHTML=forecastHTML+`<div class="col-2">
  <div class="weather-forecast-date">
    ${day}
  </div>
<img src="images/sun.png" alt="sun" class="pic" alt="" width="45" />
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">19°</span>
    <span class="weather-forecast-temperature-min">14°</span>

  </div>
</div>`
});
forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;
}

////
function getForecast(coordinates){
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dailyForecast);
  console.log(apiUrl);


}
////
function showWeather(response) {
  console.log(response);
  let weatherDegree = document.querySelector("#current-degr");
  let temperature = Math.round(response.data.main.temp);
  let humidy = document.querySelector("#humidity-element");
  let humidity=Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind-element");
  let windy=Math.round(response.data.wind.speed*3.6);
  let descriptionElement= document.querySelector("#description");
  let description= response.data.weather[0].description  ;
  let currentImgElement = document.querySelector("#currentImg");
  currentImgElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentImgElement.setAttribute("alt", response.data.weather[0].description);
  console.log(windy);
  console.log(temperature);
  weatherDegree.innerHTML = `${temperature}`;
  humidy.innerHTML=`${humidity}`;
  wind.innerHTML=`${windy}`;
  descriptionElement.innerHTML=`${description}`
  /////
  console.log("showWeather Function");
console.log(response.data);
/////
getForecast(response.data.coord);


}
function searchCity(event) {
  event.preventDefault();

 let cityName = document.querySelector("#search-input");
let citylabel = document.querySelector("#city-lbl");
  citylabel.innerHTML = `${cityName.value}`;
  //////
  let apiKey = "3499ef150985eccadd080ff408a018df";
  console.log(`${cityName.value} ${apiKey}`);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&&units=metric`;
 axios.get(apiUrl).then(showWeather);
}


let SearchForm = document.querySelector("#search-form");

SearchForm.addEventListener("submit", searchCity);
///////////////////////////
//******************* */
//////////////////////////
function celToFarFunctions(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#current-degr");
  let temperature = temperatureElem.innerHTML;
  let cToFar = Math.round((temperature * 9) / 5 + 32);
  temperatureElem.innerHTML = cToFar;
}
///
function farToCelFunction(event) {
  event.preventDefault();

  let temperatureElem = document.querySelector("#current-degr");
  let temperature = temperatureElem.innerHTML;

  let fToCel = Math.round(((temperature - 32) * 5) / 9);

  temperatureElem.innerHTML = fToCel;
}

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", farToCelFunction);

let far = document.querySelector("#far");
far.addEventListener("click", celToFarFunctions);
//////
//dailyForecast();