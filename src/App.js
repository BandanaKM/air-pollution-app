import React, { Component } from 'react';
import './App.css';
import { getCityWeather } from './utils/axios';
import City from './City';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {inputValue: 'New York, New York'};
  }

  async handleSearch (event) {
    event.preventDefault();
    const inputValue = this.state.inputValue;
    const inputArray = inputValue.split(',');
    const city = inputArray[0];
    const state = inputArray[1];

    const cityWeather = await getCityWeather(city, state);

    this.setState({
      ...cityWeather,
    })
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
      timestamp
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
          />
        </div>
      </div>
    );
  }
}

export default App;
