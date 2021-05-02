import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import Hampton from '../images/hampotn1.png'
import Vilassar from '../images/vilssar.png'

const SpotPreview = ({forecastData, name, units}) => {

  let image = {uri: 'https://www.barcelona.cat/sites/all/static/platges/clabsa/camara6.jpg'}
  if (name === 'Bogatell') {
    image.uri = 'https://www.barcelona.cat/sites/all/static/platges/clabsa/camara6.jpg'
  } else if (name === 'Vilassar') {
    image = Vilassar
  } else image = Hampton
  const currentTime = new Date().getHours();
  let height = 0;
  let period = 0;
  let direction = 0;
  let windSpeed = 0;
  let windDir = 0;
  let spotName = name;
  if (forecastData.length) {
    height = forecastData[currentTime].waveHeight.sg;
    period = forecastData[currentTime].swellPeriod.sg;
    direction = forecastData[currentTime].swellDirection.icon;
    windSpeed = Math.round(forecastData[currentTime].windSpeed.sg * 3.6);
    windDir = forecastData[currentTime].windDirection.icon;
  }

    if (units === 'us') {
      windSpeed = Math.round(windSpeed*0.62)
      height = Math.round(height*3.28)

    }


  
  return (


        <View style={styles.container}>
    <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 5, overflow: 'hidden'}}>

          
            <Text style={styles.title} >{spotName}</Text>
            
        

          <View style={styles.forecastFlex}>

            <View style={styles.waveContainer}>
              <Text style={styles.text}>{`${height.toFixed(1)} ${units === 'us' ? 'ft' : 'm'}`}</Text>
              <Text style={{transform: [{rotate: `${direction+90}deg`}], color: 'white', fontSize: 30, fontWeight: 'bold', width: 30}} >➔</Text>
            </View>

            <View style={styles.windContainer}>
                <Text style={styles.text}>{`${windSpeed.toFixed()} ${units === 'us' ? 'mph' : 'km/h'}`} </Text>

                <Text style={{transform: [{rotate: `${windDir}deg`}], color: 'white', fontSize: 30, fontWeight: 'bold', width: 30}} >➔</Text>
            </View>

          </View>     
      
    </ImageBackground>
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
    marginLeft: 5

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
    marginEnd: 15,

  },
  image: {
    height: 150,
    width: 310,
    // borderRadius: 15,
    overflow: 'hidden',
    // borderWidth: 2,
    // borderColor: 'white',
    // borderRadius: 5,
  }

  
});

export default SpotPreview
