import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, Button, Image, FlatList } from 'react-native';
import { EXPO_BUOY_DATA } from '@env';
import DayForecast from './DayForecast';
import buoy from '../images/buoy-icon-28.png'
import RNPickerSelect from 'react-native-picker-select';

const SpotDetails = ({ route, navigation }) => {
  const currentTime = new Date().getHours();
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'};
  const forecastData = route.params.data;
  const {
    waveHeight,
    swellHeight,
    swellPeriod,
    swellDirection,
    // currentWindSpeed,
    // currentWindDir,
  } = forecastData[currentTime];
  const [buoyData, setBuoy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setModel] = useState('icon');
  // const [currentWaveHeight, setHeight] = useState('');
  // const [currentSwellHeight, setSwellHeight] = useState('');
  // const [currentSwellPer, setSwellPer] = useState('');
  // const [currentSwellDirection, setDirection] = useState('');
  const [currentWindSpeed, setSpeed] = useState('');
  const [currentWindDir, setWindDir] = useState('');
  // const [swellDirStr, setSwellStr] = useState('');
  const [daysArr, setDays] = useState([]);
  
  const [myState, setMyState] = useState({
    currentWaveHeight: '',
    currentSwellHeight: '',
    currentSwellPeriod: '',
    currentSwellDirection: '',
    currentWindSpeed: '',
    currentWindDir: '',
  })

  const buoyFetch = async () => {
    let response = await fetch(EXPO_BUOY_DATA);
    let jsonData = await response.json();
    const nowCastTime = forecastData[currentTime];
    // setHeight(nowCastTime.waveHeight[selectedModel]);
    // setSwellHeight(nowCastTime.swellHeight[selectedModel]);
    // setSwellPer(nowCastTime.swellPeriod[selectedModel]);
    // setDirection(nowCastTime.swellDirection[selectedModel]);
    setMyState({...nowCastTime})
    if (selectedModel === 'dwd' || selectedModel === 'meteo') {
      setSpeed(nowCastTime.windSpeed.icon);
      setWindDir(nowCastTime.windDirection.icon);
    } else {
      // setWindDir(nowCastTime.windDirection[selectedModel]);
      // setSpeed(nowCastTime.windSpeed[selectedModel]);
    }
    setDays(dayGenerator(forecastData));
    
    setBuoy(jsonData);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return
  }
 

  

  const dayGenerator = (input) => {
    const allData = [...input];
    const res = [];
    for (let i = 0; i < allData.length/24; i++) {
      res.push(allData.splice(0,24))
    }
    return res;
  }
  

  useEffect(() => {
    buoyFetch()
  }, [])

  function getCardinalDirection(angle) {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      return directions[Math.round(angle / 45) % 8];
    }
    // console.log(daysArr)

  return (
    <ImageBackground source={image} style={styles.image}>
      {isLoading ?
        <Text>Loading...</Text> :
          <SafeAreaView style={styles.safeArea}>
            {console.log('🤩🤩🤩🤩🤩🤩🤩🤩🤩', daysArr)}
            <View style={styles.currentContainer}>

              <View style={styles.wavesAndWind}>


                <View style={styles.currentLeft}>
                  <Text>{`${waveHeight[selectedModel]}m`}</Text>
                  <Text>{`${swellHeight[selectedModel]}m@${swellPeriod[selectedModel]}sec`}</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text>{getCardinalDirection(swellDirection[selectedModel])}</Text>
                  <Text style={{transform: [{rotate: `${swellDirection[selectedModel] + 90}deg`}], color: 'white', fontSize: 20, fontWeight: 'bold', width: 30, margin: 1}} >  ➔  </Text>
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

              <View style={styles.buoyButtonView}>
                  
                  <View style={styles.buoy}>
                    <Image source={buoy} style={{width:50, height:50}} />
                    <Text>{`${buoyData.height}@${buoyData.period}sec`}</Text>
                  </View>

                  <View style={styles.button}>
                    <RNPickerSelect style={{borderRadius: 10}} value={selectedModel}
                      onValueChange={(value) => setModel(value)}
                      items={[
                          { label: 'dwd', value: 'dwd' },
                          { label: 'icon', value: 'icon' },
                          { label: 'meteo', value: 'meteo' },
                          { label: 'noaa', value: 'noaa' },
                          { label: 'sg', value: 'sg' },
                      ]}
                    />
                  </View>

              </View>
   
            </View>
            
              <FlatList
              data={daysArr}
              renderItem={({item}) => <DayForecast dayData={item} model={selectedModel}></DayForecast>}
              keyExtractor={item => item[0]._id}
            />

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
  buoyButtonView: {
    flexDirection: 'row',
    borderWidth: 2,
    width: 366,
    height: 60,
  },
  buoy: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 2,
    height: 55,
    width: 20,
    justifyContent: 'center'

  },
  button: {
    flex: 1,
    borderWidth: 2,
    height: 55,
    width: 20,
  }

})
