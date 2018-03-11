import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './styles.css';

const panel = block('air-pollution');

const CityHourForecast = ({hourlyForecast}) =>
  <div className={panel('city-hour-forecast')()}>
    <div>{hourlyForecast.time}</div>
    <img src={`https://www.airvisual.com/images/${hourlyForecast.icon}.png`} height="20px" width="20px"/>
    <div>{hourlyForecast.temperature}</div>
    <div>{hourlyForecast.windDirection}</div>
    <div>{hourlyForecast.windSpeed}</div>
  </div>

CityHourForecast.propTypes = {
  hourlyForecast: PropTypes.object
}

export default CityHourForecast;
