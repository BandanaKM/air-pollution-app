import React from 'react';

const SearchedCities = ({}) =>
  <div>
    SearchedCities
    {searched.map((city) => {
      <div>
        <SearchedCityAirQuality city={city} />
        <SearchedCityForecast city={city} />
      </div>
    })}
  </div>

export default SearchedCities;
