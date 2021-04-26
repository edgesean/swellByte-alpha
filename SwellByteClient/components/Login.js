import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, Image } from 'react-native';
import swellLogo from '../images/wave.png'

const Login = ({ navigation }) => {
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}
  return (
    <ImageBackground source={image} style={styles.image}>
      <View>
          <View style={styles.logoView}><Text style={styles.logoText}>SwellByte</Text>
        <Image source={swellLogo} style={{width:107, height:99}}/>
        </View>

        <View style={styles.login}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.signIn}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Sign In</Text>
        </View>
        </TouchableOpacity>
        </View>
      </View>
      
      

    </ImageBackground>
  )
}

export default Login


const styles = StyleSheet.create({
  image: {
    flex:1,
    resizeMode: 'cover',
  },
  logoView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
 
    
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  login: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  signIn: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

  }

});