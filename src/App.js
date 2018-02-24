import React, { Component } from 'react';
import './App.css';
import { getCityWeather } from './utils/axios';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {inputValue: 'Los Angeles, California'};

    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSearch(event) {
    event.preventDefault();
    const inputValue = this.state.inputValue;
    const inputValueArray = inputValue.split(',');
    const city = inputValueArray[0];
    const state = inputValueArray[1];

    const cityWeather = await getCityWeather(city, state);

    this.setState({
      ...cityWeather,
      airQualityGrade: cityWeather.airQualityGrade.grade
    })
  }

  handleInputChange(event){
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>AirLite</h1>
          <form>
              <input type="text" onChange={this.handleInputChange} value={this.state.inputValue} placeholder="Enter a City" />
              <button onClick={this.handleSearch}>Submit</button>
          </form>
        </header>
        <div className="main">
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
