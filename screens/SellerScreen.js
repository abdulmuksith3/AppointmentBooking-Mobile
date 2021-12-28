import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SellerScreen({navigation}) {
  const [icon, setIcon] = useState(false);
  const [timings, setTimings] = useState([
    {
      status: true
    },
    {
      status: true
    },
    {
      status: true
    },
    {
      status: false
    },
    {
      status: true
    },
    {
      status: true
    },
    {
      status: true
    },
    {
      status: false
    },
    {
      status: true
    },
    {
      status: true
    },
    {
      status: false
    },
    {
      status: true
    },
    {
      status: true
    },
    {
      status: true
    },
    {
      status: false
    }
  ]);
  return (
    <View style={styles.container}>
        
      <View style={styles.containerTop}>
        <View style={styles.topSide}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Icon
                size={25}
                type="feather"
                name={"arrow-left"}
                color={colors.WHITE}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topCenter}>
          {icon ?
            <Text style={styles.userImage}>IMG</Text>
            :
            <View style={styles.userIcon}>
              <Icon
                  size={25}
                  type={"feather"}
                  name={"user"}
                  color={colors.DARK_PURPLE}
              />
            </View>
          }
          <Text style={styles.nameText}>Name</Text>
          <Text style={styles.companyText}>Company</Text>
          <View style={styles.communicationActionContainer}>
            <TouchableOpacity style={styles.communicationContainer}>
              <Icon
                size={21}
                type={"material"}
                name={"phone"}
                color={colors.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.communicationContainer}>
              <Icon
                size={21}
                type={"material"}
                name={"email"}
                color={colors.WHITE}
              />
            </TouchableOpacity>
            
          </View>
        </View>
        <View style={styles.topSide}>
          {/* EMPTY VIEW FOR DESIGN */}
        </View>
      </View>


      <View style={styles.containerBottom}>
        <ScrollView style={styles.bodyScrollView}>
          <View style={styles.about}>
            <Text style={styles.aboutHeadText}>About Me</Text>
            <Text style={styles.aboutBodyText}>About Me</Text>
          </View>
          <View style={styles.availability}>
            <Text style={styles.availabilityText}>Availability</Text>
            <ScrollView horizontal style={styles.dateScrollView} contentContainerStyle={styles.dateScrollViewContent}>
              {timings && timings.map( (item, index) => 
                <TouchableOpacity key={index} onPress={()=>console.log(index)} style={styles.dateButton}>
                  <Text style={styles.dateText}>27</Text>
                  <Text style={styles.monthText}>Dec</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
            <View style={styles.timings}>
              
              {timings && timings.map( (item, index) => 
                <TouchableOpacity key={index} onPress={()=>console.log(index)} style={styles.timeButton}>
                  <Text style={styles.timeText}>11.00 AM</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bookButtonContainer}>
          <TouchableOpacity onPress={()=> console.log("BOOK")} style={styles.bookButton}>
            <Text style={styles.bookText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK_PURPLE,
  },

  //------------- TOP ------------- 
  containerTop:{
    flex: 1,
    backgroundColor: colors.DARK_PURPLE,
    flexDirection:"row"
  },
  topSide:{
    flex:1,
    // backgroundColor:"yellow",
    alignItems:"center",
    marginTop:"5%"
  },
  topCenter:{
    flex:4,
    // backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center",
    
  },
  userImage:{

  },
  userIcon:{
    width:70,
    height:70,
    borderRadius:120,
    backgroundColor: colors.WHITE,
    justifyContent:"center",
    alignItems:"center"
  },
  nameText:{
    fontSize: 18,
    fontFamily: font.MEDIUM,
    color: colors.WHITE
  },
  companyText:{
    fontSize: 12,
    fontFamily: font.REGULAR,
    color: colors.WHITE
  },
  communicationActionContainer:{
    flexDirection:"row",
    // backgroundColor:"red",
    width:"50%",
    justifyContent:"space-evenly",
    marginTop:"7%"
  },
  communicationContainer:{
    height: 40,
    width: 40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 100,
    backgroundColor: colors.LIGHT_PURPLE
  },


  //------------- BOTTOM ------------- 
  containerBottom:{
    flex: 1.6,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  bodyScrollView:{
    // backgroundColor:"red",
    margin: "5%",
    marginBottom: 0,
    marginRight: 0
  },
  about:{
    // backgroundColor:"yellow",
    paddingBottom: "10%",
    marginRight: "5%"
  },
  aboutHeadText:{
    fontSize:16,
    fontFamily: font.MEDIUM,
    color: colors.BLACK
  },
  aboutBodyText:{
    fontSize:14,
    fontFamily: font.LIGHT,
    color: colors.BLACK
  },
  availability:{
    // backgroundColor:"blue",
  },
  availabilityText:{
    fontSize:16,
    fontFamily: font.MEDIUM,
    color: colors.BLACK
  },
  dateScrollView:{
    // backgroundColor:"green",
    height: 70,
  },
  dateScrollViewContent:{
    alignItems:"center"
  },
  dateButton:{
    width:45,
    height:45,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colors.WHITE,
    borderRadius:100,
    borderWidth:1,
    borderColor: colors.DARK_PURPLE,
    marginRight:10
  },
  dateText:{
    fontSize:12,
    fontFamily: font.REGULAR,
    color: colors.DARK_PURPLE
  },
  monthText:{
    fontSize:9,
    fontFamily: font.REGULAR,
    color: colors.DARK_PURPLE
  },
  timings:{
    // backgroundColor:"yellow",
    flexDirection:"row",
    flexWrap: 'wrap',
    marginTop: "5%",
    marginRight: "5%"
  },
  timeButton:{
    width:"23%",
    height: 40,
    backgroundColor: colors.WHITE,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 10,
    marginRight:"2%",
    marginBottom:"4%",
    borderWidth:1,
    borderColor: colors.PURPLE

  },
  timeText:{
    fontSize:12,
    fontFamily: font.REGULAR,
    color: colors.DARK_PURPLE
  },
  bookButtonContainer:{
    backgroundColor:colors.WHITE,
    height: 80,
    width:"100%",
    borderTopWidth:1,
    borderColor: colors.LIGHT_GRAY,
    justifyContent:"center",
    alignItems:"center"
  },
  bookButton:{
    backgroundColor: colors.DARK_PURPLE,
    justifyContent:"center",
    alignItems:"center",
    height:45,
    width:"80%",
    borderRadius: 10
  },
  bookText:{
    fontSize:14,
    fontFamily: font.MEDIUM,
    color: colors.WHITE
  }
});
