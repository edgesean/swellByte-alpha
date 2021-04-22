import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
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
    <SafeAreaView  style={styles.safe}>
      
          {isLoading ? 
        <Text>loading...</Text>  :
        <View style={styles.container}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>SwellByte</Text>
          </View>
          
          <View style={styles.spots}>
            <SpotPreview forecastData={allData}/>
          </View>
          
        </View>
        
        }

    </SafeAreaView>
    </ImageBackground>
  )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  safe: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  image: {
    flex:1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  logo: {

    margin: 5,
    padding: 5,
    width: '40%',
    textAlign: 'center',
  },
  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  spots: {
    width: windowWidth-10,
    height: windowHeight-60,
    alignItems: 'center'

  }




});

export default Home
