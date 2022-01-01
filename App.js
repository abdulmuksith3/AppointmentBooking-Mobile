import React, {useState, useEffect, StatusBar} from 'react';
import { StyleSheet, LogBox} from 'react-native';
// import db from './db';
import AppNavigator from './navigator/AppNavigator'


LogBox.ignoreAllLogs();


export default function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
  }, []);

  
  return (
    <AppNavigator />
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#45A05D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
