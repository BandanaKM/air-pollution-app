import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles.css';
import CityDayForecast from './CityDayForecast';

const CityForecast = () =>
  <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
      <Tab>Title 3</Tab>
    </TabList>

    <TabPanel>
      <CityDayForecast />
    </TabPanel>
    <TabPanel>
      <CityDayForecast />
    </TabPanel>
    <TabPanel>
      <CityDayForecast />
    </TabPanel>
  </Tabs>

export default CityForecast;
