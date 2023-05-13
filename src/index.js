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
function showWeather(response) {
  console.log(response);
  let weatherDegree = document.querySelector("#current-degr");
  let temperature = Math.round(response.data.main.temp);
  let humidy = document.querySelector("#humidity-element");
 let humidity=Math.round(response.data.main.humidity);
let wind = document.querySelector("#wind-element");
 let windy=response.data.wind.speed;
  console.log(temperature);
  weatherDegree.innerHTML = `${temperature}`;
  humidy.innerHTML=`${humidity}`
  wind.innerHTML=`${windy}`;
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
  console.log(temperature);
  let cToFar = Math.round((temperature * 9) / 5 + 32);
  console.log(cToFar);
  temperatureElem.innerHTML = cToFar;
}
///
function farToCelFunction(event) {
  event.preventDefault();

  let temperatureElem = document.querySelector("#current-degr");
  let temperature = temperatureElem.innerHTML;
  console.log(temperature);

  let fToCel = Math.round(((temperature - 32) * 5) / 9);

  temperatureElem.innerHTML = fToCel;
}

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", farToCelFunction);

let far = document.querySelector("#far");
far.addEventListener("click", celToFarFunctions);
