import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import SpotDetails from './components/SpotDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
        // <SafeAreaView>
        
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
              <Stack.Screen name="SpotDetails" component={SpotDetails} options={{headerShown: false}}/>              
            </Stack.Navigator>
          </NavigationContainer>  
      
 
      
  );
}

