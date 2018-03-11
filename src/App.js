import React, { Component } from 'react';
import './App.css';
import { getCityWeather, getForecast, getCityForecast } from './utils/axios';
import City from './City';
import CityForecast from './CityForecast';
import SearchedCities from './SearchedCities';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      inputValue: 'New York, New York',
      searched: []
    };
  }

  async handleSearch (event) {
    event.preventDefault();
    const inputValue = this.state.inputValue;
    const inputArray = inputValue.split(',');
    const city = inputArray[0];
    const state = inputArray[1];

    const cityWeather = await getCityWeather(city, state);
    const cityForecast = await getForecast(city);

    this.setState({
      ...cityWeather,
      ...cityForecast
    })

    const previousSearched = JSON.parse(localStorage.getItem('airLiteSearch')) || [];
    previousSearched.push(inputValue);
    const previousSearchedForecast = previousSearched.map((value) => {
      const inputValue = value;
      const inputArray = inputValue.split(',');
      const city = inputArray[0];
      const state = inputArray[1];
      const searchedCityForecast = await getCityForecast(city, state);
      return searchedCityForecast;
    })
    this.setState({
      searched: previousSearchedForecast
    })
    localStorage.setItem('airLiteSearch', JSON.stringify(previousSearched));
  }

  handleInputChange (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {

    const {
      airQuality,
      airQualityGrade,
      airQualityColor,
      temperature,
      weatherIcon,
      humidity,
      windSpeed,
      windDirection,
      timestamp,
      todaysForecast,
      tomorrowsForecast,
      dayAftersForecast
    } = this.state;

    return (
      <div className="App">
        <header>
          <h1>AirLite</h1>
          <form onSubmit={(event) => this.handleSearch(event)}>
              <input type="text" onChange={(event) => this.handleInputChange(event)} value={this.state.inputValue} placeholder="Enter a City" />
              <button onClick={(event) => this.handleSearch(event)}>Submit</button>
          </form>
        </header>
        <div className="main">
          {temperature &&
            <City
              airQuality={airQuality}
              airQualityGrade={airQualityGrade}
              airQualityColor={airQualityColor}
              temperature={temperature}
              weatherIcon={weatherIcon}
              humidity={humidity}
              windSpeed={windSpeed}
              windDirection={windDirection}
              timestamp={timestamp}
            />}
          {(todaysForecast || tomorrowsForecast || dayAftersForecast) &&
            <CityForecast
              todaysForecast={todaysForecast}
              tomorrowsForecast={tomorrowsForecast}
              dayAftersForecast={dayAftersForecast}
            />}
            <SearchedCities
              searched={this.state.searched}
            />
        </div>
      </div>
    );
  }
}

export default App;
