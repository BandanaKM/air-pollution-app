import axios from 'axios';

export async function getCityWeather (city, state) {
  const axiosResponse = await axios.get(`http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=USA&key=JQSzBFurGKXDZE3yy
`)
  const response = axiosResponse.data; 

  let airQualityGrade;
  const airQuality = response.data.current.pollution.aqius;

  if (airQuality <= 50) {
    airQualityGrade = { grade: 'good', color: 'green' }
  } else if (airQuality <= 100) {
    airQualityGrade = { grade: 'moderate', color: 'yellow' }
  } else if (airQuality <= 150) {
    airQualityGrade = { grade: 'unhealthy for sensitive groups', color: 'orange' }
  }

  return {
    airQuality,
    temperature: response.data.current.weather.tp,
    weatherIcon: response.data.current.weather.ic,
    humidity: response.data.current.weather.hu,
    windSpeed: response.data.current.weather.ws,
    windDirection: response.data.current.weather.wd,
    airQualityGrade
  }
}
