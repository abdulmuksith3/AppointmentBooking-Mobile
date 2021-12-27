import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SellerScreen from '../screens/SellerScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() { 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{
          headerShown:false
        }} >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} 
            options={{
            }}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} 
            options={{
            }}
          />
          <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} 
            options={{
            }}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} 
            options={{
            }}
          />
          <Stack.Screen name="SellerScreen" component={SellerScreen} 
            options={{
            }}
          />

          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }