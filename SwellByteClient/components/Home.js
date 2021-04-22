import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SpotPreview from './SpotPreview'
import { EXPO_API_URL } from '@env';
const Home = () => {

  const [allData, setAllData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}

  const waveDataFetch = async () => {
    let response = await fetch(EXPO_API_URL);
    let json = await response.json();
    setAllData(json[json.length-1].swellData.hours);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)   
    return
  }
  
  useEffect(() => {
    waveDataFetch()
  }, [])

  // isLoading && return <Loader></Loader>
  return (
    <ImageBackground source={image} style={styles.image}>
    <SafeAreaView style={styles.container}>
      
          {isLoading ? 
        <Text>loading...</Text>  :
        <SpotPreview forecastData={allData}/>
        }

      
      
        
    
    </SafeAreaView>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '100%',
    
  },
  image: {
    flex:1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }


  
});

export default Home
