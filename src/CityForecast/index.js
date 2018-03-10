import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles.css';
import CityDayForecast from './CityDayForecast';
import PropTypes from 'prop-types';

const CityForecast = ({todaysForecast, tomorrowsForecast, dayAftersForecast}) =>
  <Tabs>
    <TabList>
     <Tab>{todaysForecast.day}</Tab>
     <Tab>{tomorrowsForecast.day}</Tab>
     <Tab>{dayAftersForecast.day}</Tab>
    </TabList>
    <TabPanel>
      <CityDayForecast
        forecast={todaysForecast.forecast}
      />
    </TabPanel>
    <TabPanel>
      <CityDayForecast
        forecast={tomorrowsForecast.forecast}
      />
    </TabPanel>
    <TabPanel>
      <CityDayForecast
        forecast={dayAftersForecast.forecast}
      />
    </TabPanel>
  </Tabs>

  CityForecast.propTypes = {
    todaysForecast: PropTypes.object,
    tomorrowsForecast: PropTypes.object,
    dayAftersForecast: PropTypes.object,
  }

export default CityForecast;

/*

<TabList>
  <Tab>{todaysForecast.day}</Tab>
  <Tab>{tomorrowsForecast.day}</Tab>
  <Tab>{dayAftersForecast.day}</Tab>
</TabList>

potential issues:
 - the formatting for the day is different. could we use moment to format the day here?
 - it seems to skip over sunday, but we can look at this later
*/
