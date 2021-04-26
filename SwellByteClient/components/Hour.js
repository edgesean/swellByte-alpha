import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment, { normalizeUnits } from 'moment'

const Hour = ({hourData, model}) => {
  const time = moment(Date.parse(hourData.time)-7200000).format('h a')
  function getCardinalDirection(angle) {
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    return directions[Math.round(angle / 45) % 8];
  }
  let windModel;
  if (model === 'meteo') {
    windModel = 'sg';
  } else windModel = model;
  let waveDirModel;
  if (hourData.swellDirection[model]) {
    waveDirModel = model
  } else waveDirModel = 'sg'


  return (
    <View>
    { 
      hourData.swellHeight[model] ? <View style={styles.hourContainer}>
      
      <View style={styles.hourCont}><Text style={styles.hourT}>{`${time}`}</Text></View>
      <View style={styles.viewCont}><Text style={styles.heightT}>{`${hourData.waveHeight.sg.toFixed(1)}m`}</Text></View>
      <View style={styles.swellCont}><Text style={styles.swellH}>
        {` ${hourData.swellHeight[model].toFixed(1)}m @${Math.round(hourData.swellPeriod[model])}sec   ${getCardinalDirection(hourData.swellDirection[waveDirModel]+180)}  `}</Text></View>
      <View style={styles.windCont}><Text style={styles.swellP}>{`${Math.round(hourData.windSpeed[windModel]*2.236)}k/h ${getCardinalDirection(hourData.windDirection[windModel]+180)}`}</Text></View>
    </View>
    : null

    }
    </View>
  )
}

export default Hour

const styles = StyleSheet.create({
  hourContainer: {
    flexDirection: 'row',
    marginVertical: 3,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white'
  },
  hourCont: {
    flex: 1,
    width: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewCont: {
    flex: 1,
    width: 70,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  swellCont: {
    flex: 1,
    width: 140,
    alignItems: 'center'

  },
  windCont: {
    flex: 1,
    alignItems: 'flex-end',
    paddingEnd: 10

  },
  hourT: {
    color: 'white',
    padding: 1,
    fontSize: 18,
    fontWeight: '700',
    maxWidth: 70
  
  },
  heightT: {
    color: 'white',
    padding: 1,
    fontSize: 18,
    fontWeight: '700',
    maxWidth: 70
  
  },
  waveH: {
    color: 'white',
    padding: 1,
    fontSize: 18,
    fontWeight: '700',
    
  },
  swellH: {
    color: 'white',
    padding: 1,
    fontSize: 18,
    fontWeight: '700',
    width: 150

  },
  swellP: {
    color: 'white',
    padding: 1,
    fontSize: 18,
    fontWeight: '700',

  },
  swellDir: {
    width: 30,
    color: 'white',
    padding: 1,
    fontSize: 18,
    fontWeight: '700',
  }
})
