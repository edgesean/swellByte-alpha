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
    height = forecastData[currentTime].waveHeight.icon;
    period = forecastData[currentTime].swellPeriod.icon;
    direction = forecastData[currentTime].swellDirection.icon;
    windSpeed = Math.round(forecastData[currentTime].windSpeed.icon * 3.6);
    windDir = forecastData[currentTime].windDirection.icon;
  }
  

  
  
  return (
    <View style={styles.container}>

      
        <Text style={styles.title} >{spotName}</Text>
     

      <View style={styles.forecastFlex}>

        <View style={styles.waveContainer}>
          <Text style={styles.text}>{`${height} m`}</Text>
          <Text style={{transform: [{rotate: `${direction + 90}deg`}], color: 'white', fontSize: 30, fontWeight: 'bold', width: 30}} >➔</Text>
        </View>

        <View style={styles.windContainer}>
            <Text style={styles.text}>{`${windSpeed} km/h`} </Text>
            <Text style={{transform: [{rotate: `${windDir + 90}deg`}], color: 'white', fontSize: 30, fontWeight: 'bold', width: 30}} >➔</Text>
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
    width: 310,
    height: 150,
    maxHeight: 150,
    margin: 10,
    padding: 1,
    marginTop: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },
  forecastFlex: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 347,
    height: 70,
    padding: 10,
    margin: 5,

  },

  waveContainer: {
    flex: 1,
    alignItems: 'center',
    width: '50%',
   

  },
  windContainer: {
    flex: 1,
    alignItems: 'center',
    width: '50%',

  },

  
});

export default SpotPreview
