import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './styles.css';
const FaAngleUp = require('react-icons/lib/fa/angle-up');

const panel = block('air-pollution');

const CityWeather = ({temperature, weatherIcon, humidity, windSpeed, windDirection, timestamp}) =>
  <div>
    <div className={panel('city-weather')()}>
      <div>
        <span>{temperature}</span>
        <img src={`https://www.airvisual.com/images/${weatherIcon}.png`} height="20px" width="20px"/>
      </div>
      <div>{humidity}</div>
      <div>
        <div className={panel('wind-arrow-display')()} style={{transform: `rotate(${windDirection}deg)`}}><FaAngleUp /></div>
        <span className={panel('wind-speed-display')()}>{windSpeed}</span>
      </div>
    </div>
    <div className={panel('timestamp')()}>
      {timestamp}
    </div>
  </div>

CityWeather.propTypes = {
  temperature: PropTypes.number,
  weatherIcon: PropTypes.string,
  humidity: PropTypes.number,
  windSpeed: PropTypes.number,
  windDirection: PropTypes.number,
  timestamp: PropTypes.string,
}

export default CityWeather;
