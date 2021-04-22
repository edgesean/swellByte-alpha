import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { EXPO_BUOY_DATA } from '@env';

const SpotDetails = ({ route, navigation }) => {
  const currentTime = new Date().getHours();
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'};
  const forecastData = route.params.data;
  const [buoyData, setBuoy] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const buoyFetch = async () => {
    let response = await fetch(EXPO_BUOY_DATA);
    let jsonData = await response.json();
    setBuoy(jsonData);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)  
    return
  }
  
  useEffect(() => {
    buoyFetch()

  }, [])

  


  return (
    <ImageBackground source={image} style={styles.image}>
      {isLoading ?
        <Text>Loading...</Text> :
          <SafeAreaView style={styles.safeArea}>


            <View style={styles.currentContainer}>

            </View>

          

          </SafeAreaView>
      }
    </ImageBackground>
  )
}

export default SpotDetails
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',  
  },
  safeArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  currentContainer: {
    flexDirection: 'column',
    width: windowWidth-10,
    height: 190,
    borderWidth: 2,


  },

})
