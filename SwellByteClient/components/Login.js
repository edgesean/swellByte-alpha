import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, Image, TextInput } from 'react-native';
import swellLogo from '../images/wave.png'

const Login = ({ navigation }) => {
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={{marginBottom: 5}}>
          <View style={styles.logoView}><Text style={styles.logoText}>SwellByte</Text>
        <Image source={swellLogo} style={{width:107, height:99,}}/>
        </View>

        <View style={styles.login}>
          
            <View>
              <View style={styles.emailCont}>
                <TextInput textContentType="emailAddress" style={styles.inputText} autoCorrect={false} placeholder="Email"/>
              </View>
              <View style={styles.passCont}>
                <TextInput secureTextEntry={true} style={styles.inputText}  placeholder="Password"/>
              </View>
            </View>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>  
        <View style={styles.signIn}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Sign In</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>  
        <View style={styles.noAcnt}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>continue without account</Text>
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
    margin: 30,
  },
  signIn: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  emailCont: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10

  },
  passCont: { 
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }, 
  inputText: {
    color: 'gray',
    textAlign: 'center',
  },
  noAcnt: {
    borderColor: 'white',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  }


});