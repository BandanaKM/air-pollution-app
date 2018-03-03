import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CityAirQuality = ({airQuality, airQualityGrade, airQualityColor}) =>
  <div style={{backgroundColor: airQualityColor}}>CityAirQuality
    <span>{airQuality}</span>
    <span>{airQualityGrade}</span>
  </div>

CityAirQuality.propTypes = {
  airQuality: PropTypes.number,
  airQualityGrade: PropTypes.string,
  airQualityColor: PropTypes.string
}

export default CityAirQuality;
