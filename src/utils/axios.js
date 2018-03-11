import axios from 'axios';
import moment from 'moment';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export async function getCityWeather (city, state) {
  const axiosResponse = await axios.get(`http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=USA&key=JQSzBFurGKXDZE3yy
`)
  const response = axiosResponse.data;

  let airQualityGrade;
  let airQualityColor;
  const airQuality = response.data.current.pollution.aqius;

  if (airQuality <= 50) {
    airQualityGrade = 'good';
    airQualityColor = 'green';
  } else if (airQuality <= 100) {
    airQualityGrade = 'moderate';
    airQualityColor = 'yellow';
  } else if (airQuality <= 150) {
    airQualityGrade = 'unhealthy for sensitive groups';
    airQualityColor = 'orange';
  }

  return {
    airQuality,
    temperature: response.data.current.weather.tp,
    weatherIcon: response.data.current.weather.ic,
    humidity: response.data.current.weather.hu,
    windSpeed: response.data.current.weather.ws,
    windDirection: response.data.current.weather.wd,
    airQualityGrade,
    airQualityColor,
    timestamp: moment(response.data.current.weather.ts).format('h:MMa')
  }
}

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf('day');
const TOMORROW = REFERENCE.clone().add(1, 'days').startOf('day');
const DAYAFTER = REFERENCE.clone().add(2, 'days').startOf('day');

function isToday(momentDate) {
    return momentDate.isSame(TODAY, 'd');
}
function isTomorrow(momentDate) {
    return momentDate.isSame(TOMORROW, 'd');
}
function isDayAfter(momentDate) {
    return momentDate.isSame(DAYAFTER, 'd');
}

export async function getForecast (city) {
  const axiosResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},US&appid=3227d8e4cb9a96c65c3375e1941aeee9`);
  const response = axiosResponse.data;

  const today = [];
  const tomorrow = [];
  const dayAfter = [];

  response.list.forEach((forecast) => {
    const time = moment(forecast.dt_txt);
    const json = {
      icon: (forecast.weather[0].icon).replace('04n', '04d'),
      temperature: Number.parseInt(forecast.main.temp, 10),
      windDirection: Number.parseInt(forecast.wind.deg, 10),
      windSpeed: Number.parseInt(forecast.wind.speed, 10),
      time: time.format('h:[00]a')
    }

    if (isToday(time)) {
      today.push(json);
    } else if (isTomorrow(time)) {
      tomorrow.push(json);
    } else if (isDayAfter(time)) {
      dayAfter.push(json);
    }
  })

  return {
    todaysForecast: {day: weekdays[moment().day()], forecast: today},
    tomorrowsForecast: {day: moment().day(0).format('dddd'), forecast: tomorrow},
    dayAftersForecast: {day: moment().day(1).format('dddd'), forecast: dayAfter}
  }
}

export async function getCityForecast (city, state) {
  const axiosResponse = await axios.get(`http://api.apixu.com/v1/forecast.json?key=5601e348c2eb4b03b89204103181103&q=${city}&days=3
`)
  const response = axiosResponse.data;

  const todayResponse = response.forecast.forecastday[0];
  const tomorrowResponse = response.forecast.forecastday[1];
  const dayAfterResponse = response.forecast.forecastday[2];

  const today = {
    day: moment().format('ddd'),
    averageTemperature: todayResponse.day.avgtemp_f,
    weatherIcon: todayResponse.day.condition.icon
  }

  const tomorrow = {
    day: moment().day(0).format('ddd'),
    averageTemperature: tomorrowResponse.day.avgtemp_f,
    weatherIcon: tomorrowResponse.day.condition.icon
  }

  const dayAfter = {
    day: moment().day(1).format('ddd'),
    averageTemperature: dayAfterResponse.day.avgtemp_f,
    weatherIcon: dayAfterResponse.day.condition.icon,
  }

  const cityWeather = await getCityWeather(city, state)

  return {
    weather: {
      ...cityWeather
    },
    forecast: {
      today,
      tomorrow,
      dayAfter,
    },
    localTime: moment(response.location.localtime, 'YYYY-MM-DD HH:mm').format('h:mma')
  }

}
