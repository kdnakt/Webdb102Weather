// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { getCurrentWeather } from './WeatherService';
import CurrentWeather from './CurrentWeather';

type State = {
  current: ?CurrentWeather,
}

class WeatherScreen extends Component<{}> {
  constructor(props: {}) {
    super(props);
    this.state = { current: null };
  }

  componentDidMount() {
    getCurrentWeather('Tokyo')
      .then((current) => {
        console.log('loaded weather info');
        this.setState({current});
      });
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
