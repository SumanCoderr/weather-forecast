let body = document.querySelector("body");
let input = document.querySelector("#input");
let search = document.querySelector("#search");
let container = document.querySelector(".container");
let button_div = document.querySelector(".button-div");
let current_weather_card = document.querySelector(".current_weather_card");
let weather_card = document.querySelector(".weather_card");
let datalist = document.querySelector("datalist");
let cities = [];

const weatherCard = (
  city_name,
  temp,
  humidity,
  speed,
  dt_txt,
  icon,
  description,
  temp_max,
  temp_min,
  index
) => {
  if (index === 0) {
    return ` <div>
                <h2 class="text-center pt-4 font-bold text-xl uppercase">${city_name}</h2>
                <p class="text-center mt-2">(${dt_txt.split(" ")[0]})</p>
                <p class="py-4 text-center px-10">Temperature: ${(
                  temp - 273.15
                ).toFixed(2)}&degC</p>
                <div class="flex justify-evenly">
                      <p class = "px-12 py-2 text-center">Max_Temp: ${(
                        temp_max - 273.15
                      ).toFixed(2)}&degC</p>
                      <p class = "px-12 py-2 text-center">Min_Temp: ${(
                        temp_min - 273.15
                      ).toFixed(2)}&degC</p> 
                </div>
                <div class="flex justify-center">
                      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather_condition">
                      </div>
                      <p class="text-center font-bold uppercase">${description}</p>
                <div class="flex justify-evenly py-5">
                      <p>Wind: ${speed}M/S</p>
                      <p>Humidity: ${humidity}%</p>
                </div>
              </div>`;
  } else {
    return `  <section>
                <div class="bg-gradient-to-r from-blue-500 to-slate-600 ">
                  <p class="text-center mt-2 pt-4">${dt_txt.split(" ")[0]}</p>
                  <div class="flex justify-between">
                    <div class="flex flex-col gap-y-6 justify-between py-8 px-4">
                      <p>Temperature: ${(temp - 273.15).toFixed(2)}&degC</p>
                      <p>Wind: ${speed}M/S</p>
                      <p>Humidity: ${humidity}%</p>
                    </div>
      
                    <div class="flex justify-between flex-col py-10 px-8">
                      <div class = "w-25">
                          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
                      </div>
                      <p class = "text-center">${description}</p>
                    </div>
                  </div>
                </div>
              </section>`;
  }
};

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
      getweather(lat, lon, city_name);
    })
    .catch(() => alert("something went wrong"));
  input.value = "";
}

function getweather(lat, lon, city_name) {
  let name = city_name;
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

      weather_card.innerHTML = " ";
      current_weather_card.innerHTML = " ";
      fiveDaysWeather.forEach((weatherItem, index, city_name) => {
        const { dt_txt } = weatherItem;
        const { icon, description } = weatherItem.weather[0];
        const { temp, humidity, temp_max, temp_min, pressure } =
          weatherItem.main;
        const { speed } = weatherItem.wind;

        if (index === 0) {
          change_Bg_Color(weatherItem);
          current_weather_card.insertAdjacentHTML(
            "beforeend",
            weatherCard(
              name,
              temp,
              humidity,
              speed,
              dt_txt,
              icon,
              description,
              temp_max,
              temp_min,
              index
            )
          );
        } else {
          weather_card.insertAdjacentHTML(
            "beforeend",
            weatherCard(
              name,
              temp,
              humidity,
              speed,
              dt_txt,
              icon,
              description,
              index
            )
          );
        }
      });

      console.log(value);
    })
    .catch(() => {
      alert("Opps! Something went wrong");
    });
}

const change_Bg_Color = (weatherItem) => {
  switch (weatherItem.weather[0].main) {
    case "Clear":
      body.style.background = "url('https://media.istockphoto.com/id/1328689113/photo/summer-blue-sky-and-white-cloud-white-background-beautiful-clear-cloudy-in-sunlight-calm.jpg?s=612x612&w=0&k=20&c=37qEuwdxyQSx9kuS-_Gz0WiKFX6jMXZN9aRY47mN2vI=')";
      body.style.backgroundSize = "cover"
      break;
    case "Clouds":
      body.style.background = "url('https://live.staticflickr.com/2106/1909487867_de140c7eb8_b.jpg')";
      body.style.backgroundSize = "cover"
      break;
    case "Rain":
      let label1 = document.querySelector("label")
      label1.style.fontWeight = "bold"
      body.style.background = "url('https://images.pexels.com/photos/15617018/pexels-photo-15617018/free-photo-of-people-walking-in-heavy-rain-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      body.style.backgroundSize = "cover"      
      break;
    case "Thunderstorm":
      let h = document.querySelector("h1")
      let label = document.querySelector("label")
      h.style.color = "white"
      label.style.color = "white"
      body.style.background = "url('https://c02.purpledshub.com/uploads/sites/41/2020/08/GettyImages-NA006117-b5eac24.jpg')";
      body.style.backgroundSize = "cover"      
      break;
    case "Snow":
      body.style.background = "url('https://thumbs.dreamstime.com/b/beautiful-snowy-forest-towering-mountains-distance-breathtaking-view-white-mountain-background-showcasing-natural-320282386.jpg')";
      body.style.backgroundSize = "cover"      
      break;
    case "Drizzle":
      body.style.background = "url('https://www.shutterstock.com/image-photo/tamarind-leaves-sunshine-drizzle-rain-600nw-1721781844.jpg')";
      body.style.backgroundSize = "cover"     
       break;
    default:
      body.style.background = "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg')";
      body.style.backgroundSize = "cover"  }
};

function suggestion(city_name) {
  if (!city_name == "" && !cities.includes(city_name)) {
    cities.push(city_name);
  }
  sessionStorage.setItem("cities", JSON.stringify(cities));
  cities = JSON.parse(sessionStorage.getItem("cities"));
  datalist.innerHTML = "";
  for (i = 0; i < cities.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = cities[i];
    datalist.appendChild(option);
  }
}
