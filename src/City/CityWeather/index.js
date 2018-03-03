import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CityWeather = ({temperature, weatherIcon, humidity, windSpeed, windDirection}) =>
  <div>
    <div>{temperature}</div>
    <img src={`https://www.airvisual.com/images/${weatherIcon}.png`} height="20px" width="20px"/>
    <div>{humidity}</div>
    <div>{windSpeed}</div>
    <div>{windDirection}</div>
  </div>

CityWeather.propTypes = {
  temperature: PropTypes.number,
  weatherIcon: PropTypes.string,
  humidity: PropTypes.number,
  windSpeed: PropTypes.number,
  windDirection: PropTypes.number
}

export default CityWeather;
