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

function formatDay(timestamp){
  let date= new Date(timestamp*1000);
  let day=date.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day];
}

function dailyForecast(response){
  console.log("dailyForecast function");

  let forecastDays = response.data.daily;

let forecastElement=document.querySelector("#forecast");
let forecastHTML=`<div class="row">`;
//let days=["Sun","Mon","Tue","Wed"];

forecastDays.forEach(function(forecastDay, index){
  if(index<5){
  forecastHTML=forecastHTML+`<div class="col-2">
  <div class="weather-forecast-date">
  
    ${formatDay(forecastDay.dt)}
  </div>
  <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="42"
/>
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>

  </div>
</div>`
}
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