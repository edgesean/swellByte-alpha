import React, {useState, useEffect, useContext} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import SpotPreview from './SpotPreview'
import { EXPO_API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
const Home = ({ navigation }) => {

  const [fuerteData, setFuerte] = useState([])
  const [bcnData, setBcnData] = useState([])
  const [maresmeData, setMaresme] = useState([])
  const [nhData, setNh] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [units, setUnits] = useState('eu')
  const image = { uri: 'https://i.imgur.com/Zs5yNSP.png'}
  const allDataFEtch = async (isMounted) => {

    try {
      let response = await fetch('https://swellbyte.herokuapp.com/getAllApi')
      let json = await response.json();
      
      if (isMounted) {
        setBcnData(json[0].swellData.hours);
        setMaresme(json[1].swellData.hours);
        setNh(json[2].swellData.hours);
        setFuerte(json[3].swellData.hours);
        setIsLoading(false)
      }
    
    } catch (error) {
      console.log(error)
    }  
  }
  
  useEffect(() => {
    let isMounted = true;
    allDataFEtch(isMounted)
    return () => {
      isMounted = false
    }
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
              <RNPickerSelect style={picker} value={units} 
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
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: bcnData, units: units})}>
               
            <SpotPreview forecastData={bcnData} name={'Bogatell'} units={units}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: maresmeData, units: units})}> 
            <SpotPreview forecastData={maresmeData} name={'Vilassar'} units={units}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: nhData, units: units})}> 
            <SpotPreview forecastData={nhData} name={'Hampton'} units={units}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('SpotDetails', {data: fuerteData, units: units})}> 
            <SpotPreview forecastData={nhData} name={'Cotillo'} units={units}/>
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
const picker = {
  inputIOS: {
    color: 'white',
    border: 2,
    fontSize: 14,
    fontWeight: 'bold',
  }
}

export default Home
