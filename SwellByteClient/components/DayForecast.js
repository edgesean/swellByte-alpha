import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import moment from 'moment'

const DayForecast = ({ dayData, model }) => {
  const swellDirection = dayData[0];
  const day = moment(Date.parse(dayData[0].time)).format('ddd')
  const sixAm = dayData[6];
  const twelve = dayData[12];
  const sixPm = dayData[18];
  

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text style={{color: 'white', fontSize: 18, margin: 10,}}>{day}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }}/>

      <Text style={{color: 'white', fontSize: 18, margin: 10}}>{`6am | ${sixAm.waveHeight[model]}m | ${sixAm.swellHeight[model]}m@${sixAm.swellPeriod[model]}  E  <- | ${Math.round(sixAm.windSpeed[model]*3.6)}km/h`}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }}/>

      <Text style={{color: 'white', fontSize: 18, margin: 10}}>{`12pm | ${twelve.waveHeight[model]}m | ${twelve.swellHeight[model]}m@${twelve.swellPeriod[model]}  E  <- | ${Math.round(twelve.windSpeed[model]*3.6)}km/h`}</Text>

      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }}/>

      <Text style={{color: 'white', fontSize: 18, margin: 10}}>{`6pm | ${sixPm.waveHeight[model]}m | ${sixPm.swellHeight[model]}m@${sixPm.swellPeriod[model]}  E  <- | ${Math.round(sixPm.windSpeed[model]*3.6)}km/h`}</Text>

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
