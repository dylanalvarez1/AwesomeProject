// import React, { Component } from 'react';
// import { Button, StyleSheet, Text, View, Screen, Spinner, AppRegistry, Image, Switch } from 'react-native';

import React, { Component } from 'react'
import {WebView, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { AlertIOS, Alert, View, Text, Switch, StyleSheet, PermissionsAndroid, Image, Button, response, responseData } from 'react-native'

class SwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
       latitude: '29.6235084',
       longitude: '-82.3767511',
    }
  }

   watchID: ?number = null;

   myPress = () => {
     console.log('Button was pressed')
     console.log()
     //GET https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972

     //fetch('https://api.yelp.com/v3/businesses/search')
     //console.log("Cheers")
     //console.log(lastPosition)
   };

/*Almost works, but not what we need, we need a GET Request
   _onPressButtonPOST() {
      fetch("https://api.yelp.com/v3/businesses/search", {method: "POST", body: JSON.stringify({username: "nraboy", firstname: "Nic", lastname: "Raboy"})})
      .then((response) => response.json())
      .then((responseData) => {
          AlertIOS.alert(
              "POST Response",
              "Response Body -> " + JSON.stringify(responseData.body)
          )
      })
      .done();
}
*/
/*
_onPressButtonGET() {
        fetch(`https://api.yelp.com/v3/businesses/search?latitude=${this.state.latitude}&longitude=${this.state.longitude}`, {
          method: "GET",
          headers: {
            'API_KEY': 'eW9jmPoQISmugQHayM0WJhdid_zNWaKB8dmnYywcLdAwufu8eoysWTj8PGhPnmq6drh1qpdG7kCtzOK2fm_WQidIXskWfks74EzDcI-64Q-ni6aYdBBsxFW7K5djWnYx'
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                //Put latitude and longitude data here (I think its from state)
                "Search Query -> " + responseData.search
            )
              console.log('Response is', responseData)
        })
        .done();
    }
*/
_onPressButtonGET() {
        fetch(`https://api.yelp.com/v3/businesses/search?latitude=${this.state.latitude}&longitude=${this.state.longitude}&limit=5&radius=500`, {
          method: "GET",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eW9jmPoQISmugQHayM0WJhdid_zNWaKB8dmnYywcLdAwufu8eoysWTj8PGhPnmq6drh1qpdG7kCtzOK2fm_WQidIXskWfks74EzDcI-64Q-ni6aYdBBsxFW7K5djWnYx',
        },
      })

        .then((response) => response.json())
        .then((responseData) => {
          let message;
          let message1;
          let message2;
          if(responseData.businesses == undefined)
          {
            message = "No matches"
          }
          else if(responseData.businesses.length == 0)
          {
            message = "No matches"
          }
          else {

            for(var i = 0; i < 5; i++) {
              message += responseData.businesses[i].url
              //console.log("" + i)
                //Put latitude and longitude businessesdata here (I think its from state)
            }

              }
Alert.alert(
  'Restaurants Near You',
  'Select your Current Location',
  [
    {text: responseData.businesses[0].id, onPress: () => Linking.openURL(responseData.businesses[0].url)},
    {text: responseData.businesses[1].id, onPress: () => Linking.openURL(responseData.businesses[1].url)},
    {text: responseData.businesses[2].id, onPress: () => Linking.openURL(responseData.businesses[2].url)},
    {text: 'Cancel' , onPress: () => console.log('Cancelled')},
  ],
  { cancelable: false }
)
        })
        .done();
    }




   componentDidMount = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const initialPosition = JSON.stringify(position);
            this.setState({ "initialPosition": initialPosition });
         },
         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        this.state.latitude = position.coords.latitude
        this.state.longitude = position.coords.longitude
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });
   }
   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }
   render() {
     return (
       <View style={styles.container}>




   <Image
             style={{width: 350, height: 350}}
             source={{uri: 'https://i.imgur.com/Tsy3trZ.png'}}
           />

           <TouchableOpacity
                    style={styles.button}
                    onPress={this._onPressButtonGET.bind(this)}
                  >
                    <Text style = {styles.boldText}> Need a Byte? </Text>
                  </TouchableOpacity>

 <Image
           style={styles.stretch}
           source={{uri: 'https://s3-media1.fl.yelpcdn.com/assets/srv0/styleguide/47bf4c6daf6c/assets/img/brand_guidelines/old_stroke.png'}}
         />


       </View>
     )
   }
}
export default SwitchExample

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#DCE6DC",
      marginTop: 0,

   },
   boldText: {
      fontSize: 25,
      color: '#3b3b3b',
      fontFamily: 'Helvetica',

   },
   stretch : {
     width:100,
     height:50,
     marginTop: 115,
     resizeMode: 'contain'

   },
   button: {
    alignItems: 'center',
    backgroundColor: '#3c9078',
    padding: 30,
    borderRadius: 1000,
    borderColor: "#3b3b3b",
    borderWidth: 2
   }
})

// export default class App extends React.Component {
//
// myPress = () => {
//   console.log('Button was pressed')
//   console.log()
// };
//
//  randomHex = () => {
//         let letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++ ) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }
//
// render() {
//     return (
//       <View style={styles.container}>
//         <Text>Welcome to our hack</Text>
//  <Text> </Text>
//
//   <Image
//             style={{width: 200, height: 200}}
//             source={{uri: 'http://2018.swamphacks.com/public/img/justisland.png'}}
//           />
//
// <Button
//   onPress={this.myPress}
//   title="Show Me The Menu"
//   color="#8F8F29"
// />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#bafcd6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//
// });
