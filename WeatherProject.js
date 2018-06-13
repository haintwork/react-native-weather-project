import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import Forecast from './src/components/Forecast';

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '1234',
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7
      }
    };
  }

  _handleTextChange = (event) => {
    const zip = event.nativeEvent.text;
    this.setState({
      zip: zip
    });
    fetch('https://api.openweathermap.org/data/2.5/weather?zip='
      + zip + ',us&appid=9110918e55541625503a982bb50c334d')
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode='contain'
          source={require('./assets/images/flower.jpg')}>
        </ImageBackground>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode, styles.mainText]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange}
              ></TextInput>
            </View>
          </View>
          <Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}
          ></Forecast>
        </View>
      </View>
    );
  }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var baseFontSize = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    // resizeMode: 'cover',
    left: 0,
    top: 0,
    width: viewportWidth,
    height: viewportHeight,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
  },
  zipContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    fontSize: baseFontSize,
    margin: 10,
    color: '#FFFFFF'
  },
});
