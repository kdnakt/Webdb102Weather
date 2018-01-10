// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  getCurrentWeather,
  getWeatherForecast,
} from './WeatherService';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import ForecastListItem from './ForecastListItem';

type State = {
  current: ?CurrentWeather,
  forecasts: WeatherForecast[],
}

class WeatherScreen extends Component<{}> {
  constructor(props: {}) {
    super(props);
    this.state = { current: null, forecasts: [] };
  }

  componentDidMount() {
    const city = 'Tokyo';
    getCurrentWeather(city)
      .then((current) => {
        console.log('loaded weather info', current);
        this.setState({current});
      });
    getWeatherForecast(city)
      .then((forecasts) => {
        console.log('loaded forecasts info', forecasts);
        this.setState({forecasts});
      });
  }

  renderForecasts() {
    return (
      <FlatList
        data={this.state.forecasts}
        renderItem={({ item }) => <ForecastListItem item={item} />}
        keyExtractor={item => item.date.toString()}
      />
    );
  }

  render() {
    const { current } = this.state;
    if (current == null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    const { main, iconURL } = current;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {main}
        </Text>
        <Image
          source={{ uri: iconURL }}
          style={styles.icon}
        />
        {this.renderForecasts()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 8,
  },
  icon: {
    width: 100,
    height: 100,
  }
});

export default WeatherScreen;
