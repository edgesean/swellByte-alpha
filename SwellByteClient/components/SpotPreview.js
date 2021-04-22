import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


const SpotPreview = ({forecastData}) => {

  const currentTime = new Date().getHours();
  let height = 0;
  let period = 0;
  let direction = 0;
  let windSpeed = 0;
  let windDir = 0;
  let spotName = 'Bogatell';
  if (forecastData.length) {
    height = forecastData[currentTime].waveHeight.dwd;
    period = forecastData[currentTime].swellPeriod.dwd;
    direction = forecastData[currentTime].swellDirection.dwd;
    windSpeed = Math.round(forecastData[currentTime].windSpeed.icon * 3.6);
    windDir = forecastData[currentTime].windDirection.icon;
  }
  

  
  
  return (
    <View style={styles.container}>

      <View style={styles.title}>
        <Text >{spotName}</Text>
      </View>
      

      <View style={styles.forecastFlex}>
        <View style={styles.waveContainer}>
        <Text style={styles.text}>{`${height} m`}</Text>
        <Text style={{transform: [{rotate: `${direction + 90}deg`}], color: 'white', fontSize: 20, fontWeight: 'bold'}} >➔</Text>
      </View>     
      <View style={styles.windContainer}>
        <Text style={styles.text}>{`${windSpeed} km/h`} </Text>
        <Text style={{transform: [{rotate: `${windDir + 90}deg`}], color: 'white', fontSize: 20, fontWeight: 'bold'}} >➔</Text>
      </View>
      </View>
      
      
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    height: 100,
    width: 150,
    margin: 10,
    padding: 1,
    marginTop: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    flex: 1,

  },
  forecastFlex: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
  },

  waveContainer: {
    borderWidth: 2,

  },
  windContainer: {
    borderWidth: 2,

  },

  
});

export default SpotPreview
