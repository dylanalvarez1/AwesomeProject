// import React, { Component } from 'react';
// import { Button, StyleSheet, Text, View, Screen, Spinner, AppRegistry, Image, Switch } from 'react-native';

import React, { Component } from 'react'
import { AlertIOS, View, Text, Switch, StyleSheet, PermissionsAndroid, Image, Button, response, responseData } from 'react-native'

class SwichExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
       latitude: '40.741895',
       longitude: '-73.989308',
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
        fetch(`https://api.yelp.com/v3/businesses/search?latitude=${this.state.latitude}&longitude=${this.state.longitude}`, {
          method: "GET",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eW9jmPoQISmugQHayM0WJhdid_zNWaKB8dmnYywcLdAwufu8eoysWTj8PGhPnmq6drh1qpdG7kCtzOK2fm_WQidIXskWfks74EzDcI-64Q-ni6aYdBBsxFW7K5djWnYx',
        },
      })

        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                //Put latitude and longitude data here (I think its from state)

                "Search Query -> " + responseData
            )
              console.log('Response is', responseData)
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
         <Text style = {styles.boldText}>Need a Byte?</Text>
   <Text> </Text>

   <Image
             style={{width: 200, height: 200}}
             source={{uri: 'http://2018.swamphacks.com/public/img/justisland.png'}}
           />

 <Button
   onPress={this._onPressButtonGET.bind(this)}
   title="Show Me The Menu"
   color="#8F8F29"
 />


 <Image
           style={styles.stretch}
           source={{uri: 'https://s3-media1.fl.yelpcdn.com/assets/srv0/styleguide/47bf4c6daf6c/assets/img/brand_guidelines/old_stroke.png'}}
         />


       </View>
     )
   }
}
export default SwichExample

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#ededed",
      // marginTop: 100
   },
   boldText: {
      fontSize: 35,
      color: '#123456',
      // Add font family later if wanted: fontFamily: 'Times New Roman',

   },
   stretch : {
     width:100,
     height:50,
     marginTop: -15,
     resizeMode: 'contain'

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
// 	<Text> </Text>
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
