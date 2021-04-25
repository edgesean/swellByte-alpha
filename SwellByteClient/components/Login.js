import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, Image } from 'react-native';
import swellLogo from '../images/wave.png'

const Login = ({ navigation }) => {
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.logoView}><Text style={styles.logoText}>SwellByte</Text>
      <Image source={swellLogo} style={{width:107, height:99}}/>
      </View>





      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View>
        <Text>Sign In</Text>
      </View>
      </TouchableOpacity>

    </ImageBackground>
  )
}

export default Login


const styles = StyleSheet.create({
  image: {
    flex:1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  logoView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 20,
    

  }

});