import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './styles.css';

const panel = block('air-pollution');
const container = panel('city-weather');
const rotation = direction => 'rotate('+direction+'deg)';

const CityWeather = ({temperature, weatherIcon, humidity, windSpeed, windDirection, timestamp}) =>
  <div>
    <div className={container()}>
      <div>
        <span>{temperature}</span>
        <img src={`https://www.airvisual.com/images/${weatherIcon}.png`} height="20px" width="20px"/>
      </div>
      <div>{humidity}</div>
      <div>
        <span style={{transform: `rotate(${windDirection}deg)`}}>l</span>
        <span>{windSpeed}</span>
      </div>
    </div>
    <div>
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
