import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';

const Login = ({ navigation }) => {
  const image = { uri: 'https://i.imgur.com/clZpR3S.png'}
  return (
    <ImageBackground source={image} style={styles.image}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View><Text>Login</Text></View>
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
});