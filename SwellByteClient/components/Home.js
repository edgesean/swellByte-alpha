import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import SpotPreview from './SpotPreview'
import { EXPO_API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
const Home = ({ navigation }) => {

  const [bcnData, setBcnData] = useState([])
  const [maresmeData, setMaresme] = useState([])
  const [nhData, setNh] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [units, setUnits] = useState('eu')
  const image = { uri: 'https://i.imgur.com/Zs5yNSP.png'}


  const BCNwaveDataFetch = async () => {
    let response = await fetch('https://swellbyte.herokuapp.com/getApiData');
    let json = await response.json();
    setBcnData(json[json.length-1].swellData.hours);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)   
    return
  }

  const NhDataFetch = async () => {
    let response = await fetch('https://swellbyte.herokuapp.com/getNh');
    let json = await response.json();
    setNh(json[json.length-1].swellData.hours);
    setTimeout(() => {
      setIsLoading(false)
    }, 300)   
    return
  }

  const MaresmeDataFetch = async () => {
    let response = await fetch('https://swellbyte.herokuapp.com/getApiMaresme');
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
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, marginEnd: 5 }}><Ionicons name="ios-menu" size={32} color="white" /></View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}></View><Text style={styles.logoText}>SwellByte</Text>           
            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginStart: 5, flex: 1, paddingTop: 10}}>
            <RNPickerSelect value={units} style={{color: 'white', fontSize: 18}}
                      onValueChange={(value) => value == null ? setUnits('eu') : setUnits(value)}
                      items={[
                          { label: 'EU', value: 'eu' },
                          { label: 'US', value: 'us' },
                      ]}
                    />
            </View>
          </View>
          
          {maresmeData.length ? 
            <View style={styles.spots}>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: bcnData})}> 
            <SpotPreview forecastData={bcnData} name={'Bogatell'} units={units}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: maresmeData})}> 
            <SpotPreview forecastData={maresmeData} name={'Vilassar'} units={units}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: nhData})}> 
            <SpotPreview forecastData={nhData} name={'Hampton'} units={units}/>
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
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  logoText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    width: '75%'
  },
  spots: {
    width: windowWidth-10,
    height: windowHeight-60,
    alignItems: 'center'

  }

});

export default Home
