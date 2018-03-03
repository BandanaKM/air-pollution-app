import React, { Component } from 'react';
import CityAirQuality from './CityAirQuality';
import CityWeather from './CityWeather';
import PropTypes from 'prop-types';

const City = ({airQuality, airQualityGrade, airQualityColor, temperature, weatherIcon, humidity, windSpeed, windDirection}) =>
  <div>
    <CityAirQuality airQuality={airQuality} airQualityGrade={airQualityGrade} airQualityColor={airQualityColor} />
    <CityWeather temperature={temperature} weatherIcon={weatherIcon} humidity={humidity} windSpeed={windSpeed} windDirection={windDirection} />
  </div>

City.propTypes = {
  airQuality: PropTypes.number,
  airQualityGrade: PropTypes.string,
  airQualityColor: PropTypes.string,
  temperature: PropTypes.number,
  weatherIcon: PropTypes.string,
  humidity: PropTypes.number,
  windSpeed: PropTypes.number,
  windDirection: PropTypes.number,
}

export default City;
