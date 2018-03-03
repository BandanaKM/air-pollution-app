import React, { Component } from 'react';
import './App.css';
import { getCityWeather } from './utils/axios';
import City from './City';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {inputValue: 'New York, New York'};

    // this.handleSearch = this.handleSearch.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // bind function, will always run in this context.
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
      // airQualityGrade: {grade: cityWeather.airQualityGrade.grade, color: cityWeather.airQualityGrade.color}
    })
  }

  handleInputChange (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {

    const { airQuality, airQualityGrade, airQualityColor, temperature, weatherIcon, humidity, windSpeed, windDirection } = this.state;

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
          <City airQuality={airQuality} airQualityGrade={airQualityGrade} airQualityColor={airQualityColor} temperature={temperature} weatherIcon={weatherIcon} humidity={humidity} windSpeed={windSpeed} windDirection={windDirection} />
          <p>{this.state.airQuality}</p>
          <p>{this.state.temperature}</p>
          <p>{this.state.weatherIcon}</p>
          <p>{this.state.humidity}</p>
          <p>{this.state.windSpeed}</p>
          <p>{this.state.windDirection}</p>
          <p>{this.state.airQualityGrade}</p>
        </div>
      </div>
    );
  }
}

export default App;
