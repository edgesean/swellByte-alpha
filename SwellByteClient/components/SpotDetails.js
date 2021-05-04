import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, Button, Image, FlatList, ScrollView } from 'react-native';
import { EXPO_BUOY_DATA } from '@env';
import DayForecast from './DayForecast';
import buoy from '../images/buoy-icon-28.png'
import RNPickerSelect from 'react-native-picker-select';

const SpotDetails = ({ route, navigation}) => {
  const currentTime = new Date().getHours();
  const image = { uri: 'https://i.imgur.com/Zs5yNSP.png'};
  const forecastData = route.params.data;
  const units = route.params.units;
  
  const {
    waveHeight,
    swellHeight,
    swellPeriod,
    swellDirection,

  } = forecastData[currentTime];
  const [buoyData, setBuoy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setModel] = useState('icon');
  const [currentWindSpeed, setSpeed] = useState('');
  const [currentWindDir, setWindDir] = useState('');
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
    let response = await fetch('https://swellbyte.herokuapp.com/buoy');
    let jsonData = await response.json();
    const nowCastTime = forecastData[currentTime];
    setMyState({...nowCastTime})
    if (selectedModel === 'dwd' || selectedModel === 'meteo') {
      setSpeed(nowCastTime.windSpeed.sg);
      setWindDir(nowCastTime.windDirection.sg);
    } else {
      setWindDir(nowCastTime.windDirection[selectedModel]);
      setSpeed(nowCastTime.windSpeed[selectedModel]);
    }
    setDays(dayGenerator(forecastData));    
    setBuoy(jsonData);
    
    setIsLoading(false)
    
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
      const directions = ['N↓', 'NE↙', 'E←', 'SE↖', 'S↑', 'SW↗', 'W→', 'NW↘'];
      //'N↑', 'NE↗', 'E→', 'SE↘', 'S↓', 'SW↙', 'W←', 'NW↖'
      return directions[Math.round(angle / 45) % 8];
    }
    

  return (
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView>
      {isLoading ?
        <Text></Text> :
          <SafeAreaView style={styles.safeArea}>            
            <View style={styles.currentContainer}>
              <View style={styles.wavesAndWind}>
                <View style={styles.currentLeft}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', width: 95, margin: 5, textAlign: 'left'}}>{units === 'eu' ? `${waveHeight[selectedModel].toFixed(1)}m` : `${(waveHeight[selectedModel]*3.28).toFixed(1)}ft` }</Text>
                  <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', width: 124, margin: 5, textAlign: 'left', paddingLeft: 15}}>{units === 'eu' ? `${swellHeight[selectedModel].toFixed(1)}m@${Math.floor(swellPeriod[selectedModel])}s` : `${(Math.round(waveHeight[selectedModel]*3.28))}ft@${Math.round(swellPeriod[selectedModel])}s` }</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', width: 65, margin: 5}}>{getCardinalDirection(swellDirection[selectedModel])}</Text>
                  </View>
                </View>

                <View style={styles.currentRight}>

                  <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', width: 95, margin: 5}}>{units === 'eu' ? `${Math.round(currentWindSpeed*3.6)}km/h` : `${Math.round(currentWindSpeed*2.23)}mph` }</Text>
                  <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', width: 65, margin: 5}}>{units === 'eu' ? `${Math.round(currentWindSpeed*3.6)+5}km/h` : `${Math.round(currentWindSpeed*2.23)+5}mph` }</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', width: 60, margin: 5}}>{getCardinalDirection(currentWindDir-90)}</Text>
                </View>

                </View>
              </View >

              <View style={styles.buoyButtonView}>
                  
                  <View style={styles.buoy}>
                    <Image source={buoy} style={{width:45, height:45}} />
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', width: 124, margin: 5}}>{units === 'eu' ? `${buoyData.height}m@${Math.round(+buoyData.period)}sec` : `${Math.round(buoyData.height*3.2)}ft@${Math.round(+buoyData.period)}sec`}</Text>
                  </View>
                  

                  <View style={styles.button}>
                    <RNPickerSelect style={picker} value={selectedModel}
                      onValueChange={(value) => value == null ? setModel('icon') : setModel(value)}
                      items={[
                          { label: 'icon', value: 'icon' },
                          { label: 'meteo', value: 'meteo' },
                          { label: 'noaa', value: 'noaa' },
                          { label: 'SwellByte', value: 'sg' },
                      ]}
                    />
                  </View>

              </View>
   
            </View>
            <View style={styles.flatListCont}>
              <FlatList
              data={daysArr}
              renderItem={({item}) => item[6].waveHeight[selectedModel]?<DayForecast dayData={item} model={selectedModel} units={units}></DayForecast> : null}
              keyExtractor={item => item[0]._id}
            />
            </View>

          </SafeAreaView>
      }
      </SafeAreaView>
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
    color: 'white',  
  },
  safeArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',

  },
  currentContainer: {
    flexDirection: 'column',
    width: windowWidth-10,

    height: windowHeight*.25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
  },
  wavesAndWind: {
    flexDirection: 'row',
    height: 127,
    width: 367,
    color: 'white',
  },
  currentLeft: {
    flex: 1,
    flexDirection: 'column',
    width: 50,
    height: 123,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  currentRight: {
    flex: 1,
    flexDirection: 'column',
    width: 50,
    height: 123,
    justifyContent: 'center',
    alignItems: 'center',    
    color: 'white',

  },
  dayContainer: {
    flexDirection: 'row',
    width: windowWidth-10,
    height: 160,   
    color: 'white',
  },
  buoyButtonView: {
    flexDirection: 'row',
    
    width: 366,
    height: 60,
    color: 'white',
  },
  buoy: {
    flexDirection: 'row',
    flex: 1,
    
    height: 55,
    width: 20,
    justifyContent: 'center',
    color: 'white',

  },
  button: {
    flex: 1,
    height: 55,
    width: 20,
    color: 'white',
  },
  flatListCont: {
    marginTop: 5,
    height: windowHeight*.75
  },

})

const picker = {
  inputIOS: {
    color: 'white',
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  }
}