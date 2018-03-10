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
