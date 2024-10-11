let body = document.querySelector("body");
let input = document.querySelector("#input");
let search = document.querySelector("#search");
let container = document.querySelector(".container");
let button_div = document.querySelector(".button-div");
let current_weather_card = document.querySelector(".current_weather_card");
let weather_card = document.querySelector(".weather_card");
let location_btn = document.querySelector(".location");
let datalist = document.querySelector("datalist");
let cities = [];

// display weather on webpage
const weatherCard = (
  city_name,
  temp,
  humidity,
  speed,
  dt_txt,
  icon,
  description,
  index,
  temp_max,
  temp_min,
) => {
  // current day weather forecast
  if (index === 0) {
    return ` <div class = "hover:cursor-pointer duration-700 hover:scale-110">
    <h2 class="text-center pt-4 font-bold text-xl uppercase md:text-xl">${city_name}</h2>
    <p class="text-center mt-2 md:font-medium md:text-lg">(${dt_txt.split(" ")[0]})</p>
    <p class=" text-center mt-2 font-medium md:text-xl">Temperature: ${(
      temp - 273.15
    ).toFixed(2)}&degC</p>
    <div class="flex justify-evenly">
    <p class = "px-12 py-2 text-center font-medium">Max_Temp: ${(
      temp_max - 273.15
    ).toFixed(2)}&degC</p>
    <p class = "px-12 py-2 text-center font-medium">Min_Temp: ${(
      temp_min - 273.15
    ).toFixed(2)}&degC</p> 
    </div>
    <div class="flex justify-center text-lg">
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather_condition">
    </div>
    <p class="text-center font-bold uppercase md:text-xl ">${description}</p>
    <div class="flex justify-evenly py-5 md:text-xl">
    <p class = "font-medium md:text-xl">Wind: ${speed}M/S</p>
    <p class = "font-medium md:text-xl">Humidity: ${humidity}%</p>
    </div>
    </div>`;
  }

  // 5-days weather forecast
  else {
    return `<section>
    <div class="bg-slate-500"> 
    <p class="text-center mt-2 pt-4 ">${dt_txt.split(" ")[0]}</p>
    <div class="flex justify-between">
    <div class="flex flex-col gap-y-6 justify-between py-8 px-4">
    <p>Temperature: ${(temp - 273.15).toFixed(2)}&degC</p>
    <p>Wind: ${speed}M/S</p>
    <p>Humidity: ${humidity}%</p>
    </div>
    
    <div class="flex justify-evenly flex-col px-8 ">
    <div class = "w-25">
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather condition">
    </div>
    <p class = "text-center">${description}</p>
    </div>
    </div>
    </div>
    </section>`;
  }
};

search.addEventListener("click", getCoordinates);

// get coordinates of city
function getCoordinates() {
  let city_name = input.value.trim(); //removes extra spaces from starting and end

  suggestion(city_name); //dropdown in inputbox

  if (city_name === "") {   // validation : if the input field is empty 
    alert("please fill the field");
    return;
  }
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=13a61ecb183b433bfa1c21e2cf1c7448`
  )
    .then((res) => res.json())
    .then((res) => {
      const { lat, lon } = res[0];
      getweather(lat, lon, city_name);
    })
    .catch((error) =>{ 
      if(error.message === "Failed to fetch"){  //internet problem
        alert("No Internet")
      }
      else if(error.message === "Cannot destructure property 'lat' of 'res[0]' as it is undefined.")  //invalid location
      alert("Please enter valid location")  

      else{
        alert("Something went wrong")
      }
      });
  input.value = ""; //empty input box after clicking on search button
}

// get weather of the city using latitude and longitude
function getweather(lat, lon, city_name) {
  let name = city_name;
  const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=13a61ecb183b433bfa1c21e2cf1c7448`;
  fetch(weatherApi)
    .then((value) => value.json())
    .then((value) => {
      const uniqueDaysData = []; //storing unique days weather

      // getting upcoming 5-days weather forecast
      const uniqueDaysWeather = value.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueDaysData.includes(forecastDate))
          return uniqueDaysData.push(forecastDate);
      });

      // remove previous weather forecast
      weather_card.innerHTML = " ";
      current_weather_card.innerHTML = " ";

      uniqueDaysWeather.forEach((weatherItem, index) => {
        const { dt_txt } = weatherItem;
        const { icon, description } = weatherItem.weather[0];
        const { temp, humidity, temp_max, temp_min } = weatherItem.main;
        const { speed } = weatherItem.wind;

        // display current day weather forecast
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
              index,
              temp_max,
              temp_min,
            )
          );
        }
        // display upcoming days weather forecast
        else {
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
    })
    .catch((error) => {
      alert("Opps! Something went wrong"); //handle error
    });
}

// change background of current-day according to the current weather
const change_Bg_Color = (weatherItem) => {
  switch (weatherItem.weather[0].main) {
    case "Clear":
      current_weather_card.style.background =
        "url('https://media.istockphoto.com/id/1328689113/photo/summer-blue-sky-and-white-cloud-white-background-beautiful-clear-cloudy-in-sunlight-calm.jpg?s=612x612&w=0&k=20&c=37qEuwdxyQSx9kuS-_Gz0WiKFX6jMXZN9aRY47mN2vI=')";
      current_weather_card.style.backgroundSize = "cover";
      break;
    case "Clouds":
      current_weather_card.style.background =
        "url('https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?cs=srgb&dl=pexels-pixabay-531756.jpg&fm=jpg')";
      current_weather_card.style.backgroundSize = "cover";
      current_weather_card.style.color = "black";

      break;
    case "Rain":
      current_weather_card.style.color = "white";
      current_weather_card.style.background =
        "url('https://images.pexels.com/photos/15617018/pexels-photo-15617018/free-photo-of-people-walking-in-heavy-rain-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      current_weather_card.style.backgroundSize = "cover";
      break;
    case "Thunderstorm":
      current_weather_card.style.color = "white";
      current_weather_card.style.background =
        "url('https://c02.purpledshub.com/uploads/sites/41/2020/08/GettyImages-NA006117-b5eac24.jpg')";
      current_weather_card.style.backgroundSize = "cover";
      break;
    case "Snow":
      current_weather_card.style.background =
        "url('https://thumbs.dreamstime.com/b/beautiful-snowy-forest-towering-mountains-distance-breathtaking-view-white-mountain-background-showcasing-natural-320282386.jpg')";
      current_weather_card.style.backgroundSize = "cover";
      break;
    case "Drizzle":
      current_weather_card.style.color = "white";
      current_weather_card.style.background =
        "url('https://www.shutterstock.com/image-photo/tamarind-leaves-sunshine-drizzle-rain-600nw-1721781844.jpg')";
      current_weather_card.style.backgroundSize = "cover";
      break;
    default:
      current_weather_card.style.color = "white";
      current_weather_card.style.background =
        "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg')";
      current_weather_card.style.backgroundSize = "cover";
  }
};

// getting user location weather forecast
const userCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const reverse_geocoding_url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=13a61ecb183b433bfa1c21e2cf1c7448`;
      fetch(reverse_geocoding_url)
        .then((res) => res.json())
        .then((res) => {
          const { name } = res[0];
          getweather(latitude, longitude, name);
        })
        .catch(() => alert("An error occured while fetching the city"));
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("Geolocation permission denied! Please grant permission.");
      }
    }
  );
};

location_btn.addEventListener("click", userCoordinates);

// drop_down datalist
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
