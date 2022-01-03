import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image} from 'react-native';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';
import { conn } from '../conn';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function AppointmentsScreen({route, navigation}) {
  const {allAppointments, view, allSellers} = route.params;
  const [appointments, setAppointments] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [activeButton, setActiveButton] = useState("UPCOMING")
  const [icon, setIcon] = useState(false);
  
  useEffect(() => {
    if(view){
      setActiveButton(view)
    }
  }, []);

  useEffect(() => {
    if(activeButton === "UPCOMING"){
      const filteredAppointments = [];
      const tempAppointments = allAppointments?.filter(item => item.status === "ACCEPTED");

      tempAppointments?.forEach(element => {
        const seller = allSellers?.filter(seller => seller._id === element.sellerId)[0];

        filteredAppointments.push({
          seller: seller,
          appointment: element
        })
      });

      setAppointments(filteredAppointments)
    } else if (activeButton === "PENDING"){
      const filteredAppointments = [];
      const tempAppointments = allAppointments?.filter(item => item.status === "PENDING");

      tempAppointments?.forEach(element => {
        const seller = allSellers?.filter(seller => seller._id === element.sellerId)[0];

        filteredAppointments.push({
          seller: seller,
          appointment: element
        })
      });

      setAppointments(filteredAppointments)
    } else if (activeButton === "COMPLETED"){
      const filteredAppointments = [];
      const tempAppointments = allAppointments?.filter(item => item.status === "COMPLETED" || item.status === "CANCELLED" || item.status === "REJECTED");

      tempAppointments?.forEach(element => {
        const seller = allSellers?.filter(seller => seller._id === element.sellerId)[0];

        filteredAppointments.push({
          seller: seller,
          appointment: element
        })
      });

      setAppointments(filteredAppointments)
    }
  }, [activeButton]);

  const handleCancel = async (item) => {
    const data = {
      appointmentId: item._id,
      sellerId: item.sellerId,
      buyerId: item.buyerId,
      status: item.status
    }

    try {
      let url = `${conn}/buyer/cancelAppointment`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      let res = await response.json()

      if(res.message = "Success"){
        navigation.navigate("HomeScreen", {refresh: true})
      }
    } catch (err) {
      console.log("handleCancel Errror ",err.message)
    }
  }

  

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
          <TouchableOpacity onPress={()=> setActiveButton("UPCOMING")} style={activeButton === "UPCOMING" ? styles.activeButton : styles.inactiveButton}>
            <Text style={activeButton === "UPCOMING" ? styles.activeButtonText : styles.inactiveButtonText}>Upcoming</Text>
          </TouchableOpacity>
          <View style={styles.buttonGroupSeperator}></View>
          <TouchableOpacity onPress={()=> setActiveButton("PENDING")} style={activeButton === "PENDING" ? styles.activeButton : styles.inactiveButton}>
            <Text style={activeButton === "PENDING" ? styles.activeButtonText : styles.inactiveButtonText}>Pending</Text>
          </TouchableOpacity>
          <View style={styles.buttonGroupSeperator}></View>
          <TouchableOpacity onPress={()=> setActiveButton("COMPLETED")} style={activeButton === "COMPLETED" ? styles.activeButton : styles.inactiveButton}>
            <Text style={activeButton === "COMPLETED" ? styles.activeButtonText : styles.inactiveButtonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.body}>
        {appointments?.length > 0 ?
        <ScrollView style={styles.scrollView}>
          {appointments.map((item, index) =>
            <View key={index} style={styles.appointmentContainer}>
              <View style={styles.innerAppointmentContainer}>
                <View style={styles.innerAppointmentContainerTop}>
                  <View style={styles.innerAppointmentContainerTopLeft}>
                    <View style={styles.nameView}>
                      <Text style={styles.nameText}>{item.seller.fullName}</Text>
                    </View>
                    <View style={styles.detailView}>
                      <Icon
                          size={14}
                          type={"material"}
                          name={"location-on"}
                          color={colors.BLACK}
                      />
                      <Text style={styles.detailText}>{item.seller.company}</Text>
                    </View>
                    <View style={styles.detailView}>
                      <Icon
                          size={14}
                          type={"ant-design"}
                          name={"calendar"}
                          color={colors.BLACK}
                      />
                      <Text style={styles.detailText}>{item.appointment.date}</Text>
                    </View>
                    <View style={styles.detailView}>
                      <Icon
                          size={14}
                          type={"ant-design"}
                          name={"clockcircleo"}
                          color={colors.BLACK}
                      />
                      <Text style={styles.detailText}>{item.appointment.time}</Text>
                    </View>
                  </View>
                  <View style={styles.innerAppointmentContainerTopRight}>
                    {item.seller.photoURL ?
                      <Image 
                        source={{uri: item.seller.photoURL}}
                        style={styles.appointmentUserImage}
                      />
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
                  <TouchableOpacity onPress={()=> handleCancel(item.appointment)} disabled={item.appointment.status === "COMPLETED" || item.appointment.status === "CANCELLED"} style={(item.appointment.status === "COMPLETED" || item.appointment.status === "CANCELLED") ? styles.noCancelButton:styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>
                      { item.appointment.status === "COMPLETED" ? "COMPLETED" :
                        item.appointment.status === "CANCELLED" ? "CANCELLED" :
                        "CANCEL"
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>              
            </View>
          )}
        </ScrollView>
        :
        <View style={styles.noAppointmentView}>
          <Text style={styles.noAppointmentText}>There are no appointments</Text>
        </View>  
      }
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
    width:55,
    height:55,
    resizeMode: "cover",
    // backgroundColor:"red",
    borderRadius: 100
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
  noCancelButton:{
    backgroundColor: 'transparent',
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    height:32
  },
  cancelButtonText:{
    fontSize: 10,
    fontFamily: font.MEDIUM,
    color: colors.GRAY
  },
  noAppointmentView:{
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    height: "40%"
  },
  noAppointmentText:{
    fontSize:14,
    fontFamily: font.REGULAR,
    color: colors.GRAY
  }


});
