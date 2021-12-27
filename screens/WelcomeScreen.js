import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';

export default function WelcomeScreen({navigation}) {

  return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
            <Icon
                size={230}
                type="ant-design"
                name={"calendar"}
                color={colors.LIGHT_PURPLE}
            />
        </View>
        <View style={styles.containerBottom}>
            <Text style={styles.welcomeText}>Welcome to </Text>
            <Text style={styles.welcomeText}>NovaLabs</Text>
            <Text style={styles.welcomeTextCaption}>Book your appointment with ease</Text>
            <TouchableOpacity style={styles.getStartedButton} onPress={()=>navigation.navigate("HomeScreen")}>
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK_PURPLE,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: "3%"
  },


  containerTop:{
    flex:1,
    // backgroundColor:"red",
    justifyContent:"flex-end",
    alignItems:"flex-start",
    paddingLeft:"1%"
  },


  containerBottom:{
    flex:1,
    // backgroundColor:"blue",
    paddingLeft:"5%",
    paddingTop:"5%"
  },
  welcomeText:{
    fontSize:36,
    fontFamily: font.SEMI_BOLD,
    color: colors.WHITE
  },
  welcomeTextCaption:{
    fontSize: 14,
    fontFamily: font.LIGHT,
    color: colors.WHITE
  },
  getStartedButton:{
    height:45,
    width: 112,
    backgroundColor: colors.WHITE,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    marginTop:"4%"

  },
  getStartedText:{
    fontSize:14,
    fontFamily: font.REGULAR,
    color: colors.DARK_PURPLE
  }
});
