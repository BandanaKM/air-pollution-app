import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './styles.css';

const panel = block('air-pollution');
const container = (airQualityColor) => panel('city-air-quality').mix(airQualityColor);

const CityAirQuality = ({airQuality, airQualityGrade, airQualityColor}) =>
  <div className={container(airQualityColor)()}>
    <span>{airQuality}</span>
    <span>{airQualityGrade}</span>
  </div>

CityAirQuality.propTypes = {
  airQuality: PropTypes.number,
  airQualityGrade: PropTypes.string,
  airQualityColor: PropTypes.string
}

export default CityAirQuality;
