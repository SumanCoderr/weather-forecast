
# Weather Forecast

It shows weather condition of differnt cities and country. It is very east to use.


## Acknowledgements

 Thanks for giving me this amazing project. Due to this project I am able to showcase my knowledge about JS. 


## Documentation

**Introduction**

This is the weather forecast website. It tell us the weather condition of differnt cities in a very efficient manner. this website is very easy to use.

**Types of weather forecast**

It tell us the current weather of the particular city.
It tell us next 5-days weather forecast.

**Key Terminology**

Definitions of common terms like temperature, humidity, wind and description.

**Forecast Components**

Temperature: Expected highs and lows.

Wind: Speed and direction.

Humidity: Levels and how they affect comfort.

description: Condition of the weather. for example :- If the rainy weather of any city it tell the what type of rain will happen (light rain, heavy rain, moderate rain, very heavy rain etc.)


## API Reference

#### Get all items

```http
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
|  `lat`    | `number` | **Required**. lat of city  |
|  `lon`    | `number` | **Required**. lon of city  |

#### Get item

```http
  https://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={API key}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city_name`      | `string` | **Required**. name of the city |




## Demo
``https://weather-condition-web.netlify.app/``


## Authors

- [@suman](https://github.com/SumanCoderr)

