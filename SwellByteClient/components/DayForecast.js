import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import moment from 'moment'

const DayForecast = ({ dayData, model }) => {
  const swellDirection = dayData[0];
  const day = moment(Date.parse(dayData[0].time)).format('ddd')
  const sixAm = dayData[6];
  const twelve = dayData[12];
  const sixPm = dayData[18];

  function getCardinalDirection(angle) {
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    return directions[Math.round(angle / 45) % 8];
  }



  

  return (
    <View style={styles.container}>
      { twelve.waveHeight[model] ? 
      <View>
        <Text style={{color: 'white', fontSize: 18, margin: 10,}}>{day}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }}/>

      <Text style={{color: 'white', fontSize: 18, margin: 10}}>
        {`6am | ${sixAm.waveHeight[model] ? sixAm.waveHeight[model] : 'no model data'}m | ${
          sixAm.swellHeight[model]}m@${sixAm.swellPeriod[model]}  ${getCardinalDirection(sixAm.swellDirection.sg)} | ${
            Math.round(sixAm.windSpeed.sg*3.6)}km/h ${getCardinalDirection(sixAm.windDirection.sg)}`}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }}/>

      <Text style={{color: 'white', fontSize: 18, margin: 10}}>{`12pm | ${twelve.waveHeight[model]}m | ${twelve.swellHeight[model]}m@${twelve.swellPeriod[model]}  ${twelve.swellDirection[model]?getCardinalDirection(twelve.swellDirection[model]): `${getCardinalDirection(twelve.swellDirection.sg)}`} | ${Math.round(twelve.windSpeed.sg*3.6)}km/h ${getCardinalDirection(twelve.windDirection.sg)} `}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }}/>

      <Text style={{color: 'white', fontSize: 18, margin: 10}}>{`6pm | ${sixPm.waveHeight[model]}m | ${sixPm.swellHeight[model]}m@${sixPm.swellPeriod[model]}  ${sixPm.windDirection[model]?getCardinalDirection(sixPm.windDirection[model]): `${getCardinalDirection(sixPm.windDirection.sg)}`} | ${Math.round(sixPm.windSpeed.sg*3.6)}km/h ${getCardinalDirection(sixPm.windDirection.sg)} `}</Text>

      </View> :
      <Text>{`${model} does not supprt this day, try changing to another model`}</Text>
      }
      
    </View>
  )
}

export default DayForecast
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    
    width: windowWidth-5,
    height: 180,
  }
})
