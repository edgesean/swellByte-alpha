import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { EXPO_BUOY_DATA } from '@env';

const SpotDetails = ({ route, navigation }) => {
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}
  const forecastData = route.params.data;
  const [buoyData, setBuoy] = useState({});

  const buoyFetch = async () => {
    let response = await fetch(EXPO_BUOY_DATA);
    let json = await response.json();
    // setBuoy(json);
    console.log(json);
  }
  
  useEffect(() => {
    buoyFetch();
  }, [])

  


  return (
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView>

        <Text>Spot Details</Text>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default SpotDetails

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',  
  },

})
