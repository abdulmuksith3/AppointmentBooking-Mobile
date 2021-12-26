import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, LogBox, SafeAreaView} from 'react-native';
// import db from './db';
// import AuthContainer from './navigator/AuthContainer'
// import AppContainer from './navigator/AppContainer'


LogBox.ignoreAllLogs();


export default function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
  }, []);

  
  return (
    <SafeAreaView>
      <View>
        <Text>Homee</Text>
      </View>
    </SafeAreaView>
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
