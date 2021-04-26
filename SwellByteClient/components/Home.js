import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import SpotPreview from './SpotPreview'
import { EXPO_API_URL } from '@env';
const Home = ({ navigation }) => {

  const [bcnData, setBcnData] = useState([])
  const [maresmeData, setMaresme] = useState([])
  const [nhData, setNh] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}

  const BCNwaveDataFetch = async () => {
    let response = await fetch(EXPO_API_URL);
    let json = await response.json();
    setBcnData(json[json.length-1].swellData.hours);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)   
    return
  }

  const NhDataFetch = async () => {
    let response = await fetch('http://192.168.1.169:3003/getNh');
    let json = await response.json();
    setNh(json[json.length-1].swellData.hours);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)   
    return
  }

  const MaresmeDataFetch = async () => {
    let response = await fetch('http://192.168.1.169:3003/getApiMaresme');
    let json = await response.json();
    setMaresme(json[json.length-1].swellData.hours);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)   
    return
  }
  
  useEffect(() => {
    BCNwaveDataFetch()
    MaresmeDataFetch()
    NhDataFetch()
  }, [])

  return (
    
    <ImageBackground source={image} style={styles.image}>
    <SafeAreaView  style={styles.safe}>
      
          {isLoading ? 
        <Text>loading...</Text>  :
        <View style={styles.container}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>SwellByte</Text>
          </View>
          
          {maresmeData.length ? 
            <View style={styles.spots}>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: bcnData})}> 
            <SpotPreview forecastData={bcnData} name={'Bogatell'}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: maresmeData})}> 
            <SpotPreview forecastData={maresmeData} name={'Vilassar'}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: nhData})}> 
            <SpotPreview forecastData={nhData} name={'Hampton'}/>
             </TouchableOpacity>    
            </View> : null}
                   
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
    color: 'white',
  },
  safe: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    color: 'white',
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
    color: 'white',
  },
  logoText: {
    marginTop: 10,
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
