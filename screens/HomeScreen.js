import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image} from 'react-native';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';
import { conn } from '../conn';
import moment from 'moment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HomeScreen({route, navigation}) {
  const USER = "61cef5e86f6c09d08e9dfcd2"; //Abdul
  // const USER = "61d1df084d99c961936ffc76"; //Mubarak

  const [user, setUser] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState(null);

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      // console.log("REFRESHING")
      fetchUser(USER);
      fetchSellers();
      // console.log("REFRESHING END")
   });
  }, []);

  useEffect(() => {
    if(user){
      const acceptedAppointments = user.appointments?.filter(appointment => appointment.status === "ACCEPTED");
      
      const upcomingAppointment = acceptedAppointments ? acceptedAppointments[0] : null;

      const appointmentSeller = sellers?.filter(seller => seller._id === upcomingAppointment?.sellerId)[0]

      const appointmentData = {
        appointment: upcomingAppointment,
        seller: appointmentSeller
      }
      setUpcomingAppointment(appointmentData)
    }
  }, [user]);

  const fetchUser = async (userId) => {
    try {
      let url = `${conn}/buyer/findOne/${userId}`
      const response = await fetch(url, {
        method: "GET",
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(data)
      })
      let res = await response.json()
      // console.log("user - ",res)
      setUser(res)
    } catch (err) {
      console.log("FetchUser Errror ",err.message)
    }
  }

  const fetchSellers = async () => {
    try {
      let url = `${conn}/seller/findAll`
      const response = await fetch(url, {
        method: "GET",
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(data)
      })
      let res = await response.json()
      // console.log("Sellers - ",res)
      setSellers(res)
    } catch (err) {
      console.log("fetchSellers Errror ",err.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.headerView}>
          <View style={styles.headerViewLeft}>
            <View><Text style={styles.helloText}>Hello</Text></View>
            <View><Text style={styles.nameText}>{user?.fullName ? user.fullName : "Loading"}</Text></View>
          </View>
          <View style={styles.headerViewRight}>
            {user?.photoURL ?
              <Image 
                source={{uri: user.photoURL}}
                style={styles.headerUserImage}
              />
              :
              <View style={styles.headerUserIcon}>
                <Icon
                    size={25}
                    type="feather"
                    name={"user"}
                    color={colors.WHITE}
                />
              </View>
            }
          </View>
      </View>


      <View style={styles.searchView}>
        <TouchableOpacity onPress={()=> navigation.navigate("SearchScreen", {sellerList: sellers, buyerId: user._id})} style={styles.searchButton}>
          <View style={styles.searchIconView}>
            <Icon
              size={25}
              type="feather"
              name={"search"}
              color={colors.GRAY}
            />
          </View>
          <View style={styles.searchTextView}>
            <Text style={styles.searchText}>Search for a seller</Text>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.appointmentView}>
        <View style={styles.appointmentViewTop}>
          <Text style={styles.appointmentText}>Upcoming Appointments</Text>
          <TouchableOpacity onPress={()=> navigation.navigate("AppointmentsScreen", {view: "UPCOMING", allSellers: sellers, allAppointments: user?.appointments ? user.appointments : null})} style={styles.appointmentButton}>
            <Text style={styles. appointmentButtonText}>See All</Text>
          </TouchableOpacity>
        </View>
        { upcomingAppointment?.appointment && upcomingAppointment?.seller ?
          <View style={styles.appointmentViewBottom}>
            <TouchableOpacity onPress={()=>navigation.navigate("AppointmentsScreen", {view: "UPCOMING", allSellers: sellers, allAppointments: user?.appointments ? user.appointments : null})} style={styles.appointmentContainer}>
              <View style={styles.appointmentContainerTop}>
                <View style={styles.appointmentContainerTopLeft}>
                  {upcomingAppointment.seller.photoURL ?
                    <Image 
                      source={{uri: upcomingAppointment.seller.photoURL}}
                      style={styles.appointmentUserImage}
                    />
                    :
                    <View style={styles.appointmentUserIcon}>
                      <Icon
                          size={25}
                          type="feather"
                          name={"user"}
                          color={colors.DARK_PURPLE}
                      />
                    </View>
                  }
                </View>
                <View style={styles.appointmentContainerTopRight}>
                  <Text style={styles.appointmentNameText}>{upcomingAppointment.seller.fullName}</Text>
                  <Text style={styles.appointmentCompanyText}>{upcomingAppointment.seller.company}</Text>
                </View>
              </View>
              <View style={styles.appointmentContainerBottom}>
                <View style={styles.appointmentDateTimeContainer}>
                  <View style={styles.appointmentDateView}>
                    <Icon
                        size={23}
                        type="ant-design"
                        name={"calendar"}
                        color={colors.WHITE}
                    />
                    <Text style={styles.appointmentDateText}>{upcomingAppointment.appointment.date}</Text>
                  </View>
                  <View style={styles.appointmentTimeView}>
                    <Icon
                        size={23}
                        type="feather"
                        name={"clock"}
                        color={colors.WHITE}
                    />
                    <Text style={styles.appointmentTimeText}>{upcomingAppointment.appointment.time}</Text>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
        </View>
        :
        <View style={styles.noAppointmentViewBottom}>
          <Text style={styles.noAppointmentText}>No upcoming appointments</Text>
        </View>
      }
      </View>


      <View style={styles.sellerView}>
        <View style={styles.sellerViewTop}>
          <Text style={styles.sellerText}>Top Sellers</Text>
        </View>
        {sellers?.length > 0 ?
          <View style={styles.sellerViewBottom}>
            {sellers.map((item, index) =>
              index < 4 && 
              <TouchableOpacity key={index} onPress={()=>navigation.navigate("SellerScreen", {sellerId: item._id, buyerId: user._id})} style={[styles.sellerContainer, index%2 !== 0 && {marginLeft:"7%"}]}>
                <View style={styles.sellerContainerTop}>
                  {item?.photoURL ?
                    <Image 
                      source={{uri: item.photoURL}}
                      style={styles.sellerUserImage}
                    />
                    :
                    <View style={styles.sellerUserIcon}>
                      <Icon
                          size={28}
                          type="feather"
                          name={"user"}
                          color={colors.WHITE}
                      />
                    </View>
                  }
                </View>
                <View style={styles.sellerContainerBottom}>
                  <Text style={styles.sellerNameText}>{item?.fullName ? item?.fullName :"Loading"}</Text>
                </View>
              </TouchableOpacity>
            )}
            {/* {sellers && sellers.length%2 === 0 && <View style={styles.emptySellerContainer}></View>} */}

          </View>
          :
          <View style={styles.noSellerViewBottom}>
            <Text style={styles.noSellerText}>There are no sellers yet</Text>
          </View>
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingLeft:"6%",
    paddingRight: "6%"
  },

  //------------- HEADER ------------- 
  headerView:{
    // flex:1,
    // backgroundColor:"green",
    height: height/7,
    flexDirection:"row"
  },
  headerViewLeft:{
    // backgroundColor:"red",
    flex:3,
    justifyContent:"center"

  },
  helloText:{
    fontSize:14,
    fontFamily:font.REGULAR,
    color: colors.BLACK

  },
  nameText:{
    fontSize:20,
    fontFamily:font.SEMI_BOLD,
    color: colors.BLACK
  },

  headerViewRight:{
    // backgroundColor:"yellow",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  headerUserImage:{
    width:55,
    height:55,
    resizeMode: "cover",
    // backgroundColor:"red",
    borderRadius: 100

  },
  headerUserIcon:{
    width:55,
    height:55,
    borderRadius:120,
    backgroundColor: colors.DARK_PURPLE,
    justifyContent:"center",
    alignItems:"center"
  },



 //------------- SEARCH ------------- 
  searchView:{
    // flex:1,
    // backgroundColor:"blue",
    height: height/12,
    justifyContent:"center"
  },
  searchButton:{
    flexDirection:"row",
    backgroundColor:colors.LIGHT_GRAY,
    // flex:1,
    height: 45,
    // width:"100%",
    alignItems:"center",
    borderRadius:10,
    
  },
  searchIconView:{
    // flex:1,
    // backgroundColor:"red",
    width:"15%"
  },
  searchTextView:{
    // flex:1,
    // backgroundColor:"yellow",
    // width:"80%"
  },
  searchText:{
    fontSize:14,
    fontFamily: font.MEDIUM,
    color: colors.GRAY
  },



  //------------- APPOINTMENT ------------- 
  appointmentView:{
    // flex:1,
    // backgroundColor:"green",
    height: height/3
  },
  appointmentViewTop:{
    // backgroundColor:"yellow",
    height: "30%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-end",
    paddingBottom:"3%"
  },
  appointmentText:{
    fontSize: 16,
    fontFamily: font.REGULAR,
    color: colors.BLACK
  },
  appointmentButton:{

  },
  appointmentButtonText:{
    fontSize: 14,
    fontFamily: font.MEDIUM,
    color: colors.DARK_PURPLE
  },
  appointmentViewBottom:{
    // backgroundColor:"red",
    height:"70%",
    justifyContent:"center"

  },
  appointmentContainer:{
    height:"90%",
    backgroundColor:colors.DARK_PURPLE,
    borderRadius:10,
    alignItems:"center"
  },
  appointmentContainerTop:{
    height:"55%",
    // backgroundColor:"green",
    width:"90%",
    // margin:"5%",
    flexDirection:"row"

  },
  appointmentContainerTopLeft:{
    // width:"30%",
    height:"100%",
    // backgroundColor:"red",
    justifyContent:"flex-end",
    // alignItems:"center",
    paddingBottom:"2%"
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
    backgroundColor: colors.LIGHT_GRAY,
    justifyContent:"center",
    alignItems:"center"
  },
  appointmentContainerTopRight:{
    // width:"70%",
    height:"100%",
    // backgroundColor:"blue",
    justifyContent:"flex-end",
    paddingLeft:"4%",
    paddingBottom:"3%"
  },
  appointmentNameText:{
    fontSize:16,
    fontFamily: font.MEDIUM,
    color: colors.WHITE
  },
  appointmentCompanyText:{
    fontSize:10,
    fontFamily: font.REGULAR,
    color: colors.WHITE
  },
  appointmentContainerBottom:{
    height:"45%",
    // backgroundColor:"yellow",
    width:"90%",
    justifyContent:"center"
  },
  appointmentDateTimeContainer:{
    height:"65%",
    backgroundColor:colors.LIGHT_PURPLE,
    width:"100%",
    borderRadius:10,
    opacity: 0.9,
    flexDirection:"row"
  },
  appointmentDateView:{
    width:"50%",
    // backgroundColor:"red",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"


  },
  appointmentDateText:{
    fontSize: 12,
    fontFamily: font.REGULAR,
    color: colors.WHITE,
    paddingLeft: "10%"
  },
  appointmentTimeView:{
    width:"50%",
    // backgroundColor:"red",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  appointmentTimeText:{
    fontSize: 12,
    fontFamily: font.REGULAR,
    color: colors.WHITE,
    paddingLeft: "10%"
  },
  noAppointmentViewBottom:{
    // backgroundColor:"red",
    height:"70%",
    justifyContent:"center",
    alignItems:"center"
  },
  noAppointmentText:{
    fontSize:14,
    fontFamily: font.REGULAR,
    color: colors.GRAY
  },




  //------------- SELLER ------------- 
  sellerView:{
    // backgroundColor:"blue",
  },
  sellerViewTop:{
    // backgroundColor:"red",
    height: height/11,
    justifyContent:"flex-end",
    paddingBottom:"3%",
  },
  sellerText:{
    fontSize: 16,
    fontFamily: font.REGULAR,
    color: colors.BLACK
  },
  sellerViewBottom:{
    flexDirection:"row",
    flexWrap:"wrap",
    // justifyContent:"space-evenly",
    // marginLeft:"1%",
    // marginRight:"1%"
  },
  sellerContainer:{
    backgroundColor: colors.WHITE,
    height: 190,
    width: "45%",
    borderRadius:10,
    marginBottom:"8%",
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sellerContainerTop:{
    height:"60%",
    justifyContent:"flex-end",
    alignItems:"center"
  },
  sellerUserIcon:{
    width:80,
    height:80,
    borderRadius:160,
    backgroundColor: colors.DARK_PURPLE,
    justifyContent:"center",
    alignItems:"center"
  },
  sellerUserImage:{
    width:80,
    height:80,
    resizeMode: "cover",
    // backgroundColor:"red",
    borderRadius: 160
  },
  sellerContainerBottom:{
    height:"40%",
    justifyContent:"center",
    alignSelf:"center"
  },
  sellerNameText:{
    fontSize:14,
    fontFamily:font.MEDIUM,
    color: colors.BLACK
  },
  emptySellerContainer:{
    backgroundColor: "transparent",
    height: 190,
    width: "45%",
    borderRadius:10,
    marginBottom:"8%"

  },
  noSellerViewBottom:{
    // backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    height: height/7
  },
  noSellerText:{
    fontSize:14,
    fontFamily: font.REGULAR,
    color: colors.GRAY
  }
});
