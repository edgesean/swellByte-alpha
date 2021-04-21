import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import SpotPreview from './SpotPreview'

const Home = () => {

  const [allData, setAllData] = useState([])

  const waveDataFetch = async () => {
    let response = await fetch('http://localhost:3003/getApiData');
    let json = await response.json();
    setAllData(json[0].swellData.hours);
    console.log(json[0].swellData.hours)
    return
  }
  
  useEffect(() => {
    waveDataFetch()
  }, [])



  return (
    <View>
      <SpotPreview forecastData={allData}/>
    </View>
  )
}

export default Home
