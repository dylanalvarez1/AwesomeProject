import React, { Component } from 'react';
import { StyleSheet, Text, View, Screen, Spinner } from 'react-native';
import { Button } from 'react-native';

// import { Screen, Spinner, Examples } from '@shoutem/ui';
// import { stringify as queryString } from 'query-string';

// import RecommendationsMap from './RecommendationsMap';
// import { OverlayTopics, BottomTopics } from './Topics';

const API_DEBOUNCE_TIME = 2000;

class locationService extends Component {
  state = {
    mapRegion: null,
    gpsAccuracy: null,
    recommendations: [],
    lookingFor: null,
    headerLocation: null,
    last4sqCall: null
  }
  watchID = null

  componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, position.coords.accuracy);
    });
  }

  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region, gpsAccuracy) {
    this.setState({
      mapRegion: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    });
  }

  render() {
    const { mapRegion, lookingFor } = this.state;

    if (mapRegion) {
      return (
        <Screen style = {styles.centered}>
          <Text> {mapRegion.latitude}, {mapRegion.longitude}</Text>
        </Screen>
      );
    }else{
      return (
        <Screen style={styles.centered}>
          <Spinner />
        </Screen>
      );
    }
  }
}

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

export default class App extends React.Component {

myPress = () => {
  console.log('Button was pressed')
  console.log()
};

 randomHex = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

render() {
    return (
      <View style={styles.container}>
        <Text >Welcome to our hack</Text>
	<Text> </Text>



<Button
  onPress={this.myPress}
  title="Show Me The Menu"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bafcd6',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
