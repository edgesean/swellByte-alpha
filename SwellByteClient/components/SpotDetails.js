import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { EXPO_BUOY_DATA } from '@env';
import DayForecast from './DayForecast';

const SpotDetails = ({ route, navigation }) => {
  const currentTime = new Date().getHours();
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'};
  const forecastData = route.params.data;
  const [buoyData, setBuoy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setModel] = useState('meteo');
  const [currentWaveHeight, setHeight] = useState('');
  const [currentSwellHeight, setSwellHeight] = useState('');
  const [currentSwellPer, setSwellPer] = useState('');
  const [currentSwellDirection, setDirection] = useState('');
  const [currentWindSpeed, setSpeed] = useState('');
  const [currentWindDir, setWindDir] = useState('');
  const [buoyHeight, setBuoyHeight] = useState('');
  const [buoyPeriod, setBuoyPer] = useState('');
  const [swellDirStr, setSwellStr] = useState('');
  

  const buoyFetch = async () => {
    let response = await fetch(EXPO_BUOY_DATA);
    let jsonData = await response.json();
    setBuoy(jsonData);
    const nowCastTime = forecastData[currentTime];
    setHeight(nowCastTime.waveHeight[selectedModel]);
    setSwellHeight(nowCastTime.swellHeight[selectedModel]);
    setSwellPer(nowCastTime.swellPeriod[selectedModel]);
    setDirection(nowCastTime.swellDirection[selectedModel]);
    if (selectedModel === 'dwd' || selectedModel === 'meteo') {
      setSpeed(nowCastTime.windSpeed.icon);
      setWindDir(nowCastTime.windDirection.icon);
    } else {
      setWindDir(nowCastTime.windDirection[selectedModel]);
      setSpeed(nowCastTime.windDirection[selectedModel]);
    }
    setBuoyHeight(buoyData.height);
    setBuoyPer(buoyData.period);

    
    setTimeout(() => {
      setIsLoading(false)
    }, 300)  
    return
  }
  useEffect(() => {
    buoyFetch()
    
  }, [])
  function getCardinalDirection(angle) {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      return directions[Math.round(angle / 45) % 8];
    }


  return (
    <ImageBackground source={image} style={styles.image}>
      {isLoading ?
        <Text>Loading...</Text> :
          <SafeAreaView style={styles.safeArea}>


            <View style={styles.currentContainer}>

              <View style={styles.wavesAndWind}>


                <View style={styles.currentLeft}>
                  <Text>{`${currentWaveHeight}m`}</Text>
                  <Text>{`${currentSwellHeight}m@${currentSwellPer}sec`}</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text>{getCardinalDirection(currentSwellDirection)}</Text>
                  <Text style={{transform: [{rotate: `${currentSwellDirection + 90}deg`}], color: 'white', fontSize: 20, fontWeight: 'bold', width: 30, margin: 1}} >  ➔  </Text>
                  </View>
                </View>

                <View style={styles.currentRight}>

                  <Text>{`${Math.round(currentWindSpeed*3.6)}km/h`}</Text>
                  <Text>{`${Math.round(currentWindSpeed*3.6)+5}km/h`}</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text>{getCardinalDirection(currentWindDir)}</Text>
                  <Text style={{transform: [{rotate: `${currentWindDir + 90}deg`}], color: 'white', fontSize: 20, fontWeight: 'bold', width: 30, margin: 1}} >  ➔  </Text>
                  </View>

                </View>


              </View >

              
              
              
              
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  currentContainer: {
    flexDirection: 'column',
    width: windowWidth-10,
    height: 190,
    borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wavesAndWind: {
    flexDirection: 'row',
    height: 127,
    width: 367,
    borderWidth: 2,

  },
  currentLeft: {
    flex: 1,
    flexDirection: 'column',
    width: 50,
    height: 123,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    

  },
  currentRight: {
    flex: 1,
    flexDirection: 'column',
    width: 50,
    height: 123,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,

  },
  dayContainer: {
    flexDirection: 'row',
    width: windowWidth-10,
    height: 160,
    borderWidth: 2,

  },

})
