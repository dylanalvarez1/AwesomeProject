import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';


export default class App extends React.Component {

myPress = () => {
  console.log('You Pressed the Button')
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
