let input = document.querySelector("#input");
let search = document.querySelector("#search");
let container = document.querySelector(".container");
let button_div = document.querySelector(".button-div");
let datalist = document.querySelector("datalist");
let cities = [];

search.addEventListener("click", () => getCoordinates());

function getCoordinates() {
  let city_name = input.value.trim();

  suggestion(city_name);
  if (city_name === "") {
    alert("please fill the field");
    return;
  }
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=13a61ecb183b433bfa1c21e2cf1c7448`
  )
    .then((res) => res.json())
    .then((res) => {
      const { lat, lon } = res[0];
      console.log(lat, lon);
      getweather(lat, lon);
    })
    .catch(() => alert("something went wrong"));
  input.value = "";
}

function getweather(lat, lon) {
  const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=13a61ecb183b433bfa1c21e2cf1c7448`;
  fetch(weatherApi)
    .then((value) => value.json())
    .then((value) => {
      const uniqueDaysData = [];
      const fiveDaysWeather = value.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueDaysData.includes(forecastDate))
          return uniqueDaysData.push(forecastDate);
      });

      console.log(fiveDaysWeather);
      //    const {temp, humidity} = value.main
      //    const {speed} = value.wind
      //    let city_name = input.value.trim()
      //    let date =new Date()
      //    console.log(`${city_name}\n ${date} \ntemperature: ${temp} \nhumidity: ${humidity} \nwind: ${speed}`)
    });
}

function suggestion(city_name) {
    console.log(datalist)
  if (!city_name == "" && !cities.includes(city_name)) {
    cities.push(city_name);
    console.log(cities);
  }
  sessionStorage.setItem("cities", JSON.stringify(cities));
  cities = JSON.parse(sessionStorage.getItem("cities"));
  console.log(cities.length);
  console.log(cities);
  datalist.innerHTML = ""
  for (i = 0; i < cities.length; i++) {
    console.log("hello");
    let option = document.createElement("option");
    option.innerHTML = cities[i];
    datalist.appendChild(option);
    console.log(datalist)
  }
}
