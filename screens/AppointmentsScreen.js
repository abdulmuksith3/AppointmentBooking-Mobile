import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function AppointmentsScreen({navigation}) {

  const [appointments, setAppointments] = useState([
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
      status: true
    }
  ]);

  const [activeButton, setActiveButton] = useState("upcoming")
  const [icon, setIcon] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.headerLeft}>
          <Icon
              size={25}
              type="feather"
              name={"arrow-left"}
              color={colors.BLACK}
          />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>Appointments</Text>
        </View>
        <View style={styles.headerRight}></View>
      </View>


      <View style={styles.center}>
        <View style={styles.buttonGroupContainer}>
          <TouchableOpacity onPress={()=> setActiveButton("upcoming")} style={activeButton === "upcoming" ? styles.activeButton : styles.inactiveButton}>
            <Text style={activeButton === "upcoming" ? styles.activeButtonText : styles.inactiveButtonText}>Upcoming</Text>
          </TouchableOpacity>
          <View style={styles.buttonGroupSeperator}></View>
          <TouchableOpacity onPress={()=> setActiveButton("pending")} style={activeButton === "pending" ? styles.activeButton : styles.inactiveButton}>
            <Text style={activeButton === "pending" ? styles.activeButtonText : styles.inactiveButtonText}>Pending</Text>
          </TouchableOpacity>
          <View style={styles.buttonGroupSeperator}></View>
          <TouchableOpacity onPress={()=> setActiveButton("completed")} style={activeButton === "completed" ? styles.activeButton : styles.inactiveButton}>
            <Text style={activeButton === "completed" ? styles.activeButtonText : styles.inactiveButtonText}>Completed</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          {appointments && appointments.filter(x=> x.status === true).map((item, index) =>
            <View key={index} style={styles.appointmentContainer}>
              <View style={styles.innerAppointmentContainer}>
                <View style={styles.innerAppointmentContainerTop}>
                  <View style={styles.innerAppointmentContainerTopLeft}>
                    <View style={styles.nameView}>
                      <Text style={styles.nameText}>Name</Text>
                    </View>
                    <View style={styles.detailView}>
                      <Icon
                          size={14}
                          type={"material"}
                          name={"location-on"}
                          color={colors.BLACK}
                      />
                      <Text style={styles.detailText}>Company</Text>
                    </View>
                    <View style={styles.detailView}>
                      <Icon
                          size={14}
                          type={"ant-design"}
                          name={"calendar"}
                          color={colors.BLACK}
                      />
                      <Text style={styles.detailText}>Date</Text>
                    </View>
                    <View style={styles.detailView}>
                      <Icon
                          size={14}
                          type={"ant-design"}
                          name={"clockcircleo"}
                          color={colors.BLACK}
                      />
                      <Text style={styles.detailText}>Time</Text>
                    </View>
                  </View>
                  <View style={styles.innerAppointmentContainerTopRight}>
                    {icon ?
                      <Text style={styles.appointmentUserImage}>IMG</Text>
                      :
                      <View style={styles.appointmentUserIcon}>
                        <Icon
                            size={25}
                            type={"feather"}
                            name={"user"}
                            color={colors.WHITE}
                        />
                      </View>
                    }
                  </View>
                </View>
                <View style={styles.innerAppointmentContainerBottom}>
                  <TouchableOpacity onPress={()=> console.log("Cancelled Pressed")} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>              
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingLeft:"1%",
    paddingRight:"1%"
  },


  //------------- HEADER ------------- 
  header:{
    flex:1,
    // backgroundColor: "red",
    flexDirection:"row"
  },
  headerLeft:{
    flex:1,
    // backgroundColor:"yellow",
    justifyContent:"center",
    alignItems:"center"
  },
  headerCenter:{
    flex:5,
    // backgroundColor:"yellow",
    justifyContent:"center",
    alignItems:"center"
  },
  headerText:{
    fontSize: 14,
    fontFamily: font.MEDIUM,
    color: colors.BLACK
  },
  headerRight:{
    flex:1,
    // backgroundColor:"yellow"
  },

  
  //------------- CENTER ------------- 
  center:{
    flex:1,
    // backgroundColor: "blue",
    justifyContent:"center",
    alignItems:"center"
  },
  buttonGroupContainer:{
    // flex:1,
    backgroundColor: colors.LIGHT_GRAY,
    flexDirection:"row",
    // margin: "5%",
    height: 50,
    width:"95%",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  activeButton:{
    backgroundColor: colors.PURPLE,
    // flex:0.9,
    justifyContent:"center",
    alignItems:"center",
    height:"80%",
    width:"30%",
    borderRadius:10,
  },
  inactiveButton:{
    backgroundColor: colors.LIGHT_GRAY,
    // flex:0.9,
    justifyContent:"center",
    alignItems:"center",
    height:"80%",
    width:"30%",
    borderRadius:10,
  },
  activeButtonText:{
    fontSize:12,
    fontFamily:font.REGULAR,
    color: colors.WHITE
  },
  inactiveButtonText:{
    fontSize:12,
    fontFamily:font.REGULAR,
    color: colors.GRAY
  },
  buttonGroupSeperator:{
    backgroundColor: colors.WHITE,
    height:"50%",
    width:"0.5%"
  },


  //------------- BODY ------------- 
  body:{
    flex:7,
    // backgroundColor: "red"
  },
  scrollView:{
    // margin:"3%",
    // backgroundColor:"yellow",
    // marginBottom: 0
  },
  appointmentContainer:{
    backgroundColor: colors.WHITE,
    // borderWidth:1,
    borderRadius:10,
    margin:"3%",
    marginBottom:"5%",

    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerAppointmentContainer:{
    // backgroundColor:"green",
    margin:"6%"
  },
  innerAppointmentContainerTop:{
    flexDirection:"row"
  },
  innerAppointmentContainerTopLeft:{
    // backgroundColor:"yellow",
    width:"70%",
    // height:"80%"
  },
  nameView:{
    marginBottom:5
  },
  nameText:{
    fontSize:16,
    fontFamily: font.MEDIUM,
    color: colors.BLACK
  },
  detailView:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:3
  },
  detailText:{
    fontSize:10,
    fontFamily: font.REGULAR,
    color: colors.GRAY,
    paddingLeft:"2%"
  },
  innerAppointmentContainerTopRight:{
    alignItems:'flex-end',
    // backgroundColor:"blue",
    width:"30%"
  },
  appointmentUserImage:{

  },
  appointmentUserIcon:{
    width:55,
    height:55,
    borderRadius:120,
    backgroundColor: colors.DARK_PURPLE,
    justifyContent:"center",
    alignItems:"center"
  },
  innerAppointmentContainerBottom:{
    // backgroundColor:"red",
    height: 45,
    borderTopWidth:1,
    borderColor: colors.LIGHT_GRAY,
    justifyContent:"flex-end",
    marginTop:10
  },
  cancelButton:{
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    height:32
  },
  cancelButtonText:{
    fontSize: 10,
    fontFamily: font.MEDIUM,
    color: colors.GRAY
  }


});
