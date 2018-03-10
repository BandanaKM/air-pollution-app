import React, { Component } from 'react';
import CityHourForecast from './CityHourForecast';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './styles.css';

const panel = block('air-pollution');

const CityDayForecast = ({forecast}) =>
  <div className={panel('city-day-forecast')()}>
    {forecast.map((hour, index) =>
      <CityHourForecast
        key={index}
        hourlyForecast={hour}
      />
    )}
  </div>

CityDayForecast.propTypes = {
  forecast: PropTypes.array
}

export default CityDayForecast;
