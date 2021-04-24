import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment, { normalizeUnits } from 'moment'

const Hour = ({hourData, model}) => {
  const time = moment(Date.parse(hourData.time)-7200000).format('h a')
  function getCardinalDirection(angle) {
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    return directions[Math.round(angle / 45) % 8];
  }

  return (
    <View style={styles.hourContainer}>
      <View style={styles.viewCont}><Text style={styles.hourT}>{`${time} |`}</Text></View>
      <View style={styles.viewCont}><Text style={styles.swellH}>{`${hourData.swellHeight[model]}@`}</Text></View>
      <View style={styles.viewCont}><Text style={styles.swellP}>{`${hourData.swellPeriod[model]}sec`}</Text></View>
      <View style={styles.viewCont}><Text style={styles.swellP}>{`${getCardinalDirection(hourData.swellDirection.icon+180)} |`}</Text></View>
      <View style={styles.viewCont}><Text style={styles.swellP}>{`${hourData.windSpeed[model]}k/h`}</Text></View>
      <View style={[styles.viewCont]}><Text style={styles.swellP}>{`${getCardinalDirection(hourData.windDirection.icon)}`}</Text></View>

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
  },
  viewCont: {
    flex: 1,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hourT: {
    color: 'white',
    padding: 1,
    fontSize: normalizeUnits(15),
    

  },
  waveH: {
    color: 'white',
    padding: 1,
    fontSize: normalizeUnits(15),
    
  },
  swellH: {
    color: 'white',
    padding: 1,
    fontSize: normalizeUnits(15),

  },
  swellP: {
    color: 'white',
    padding: 1,
    fontSize: normalizeUnits(15),

  }
})
