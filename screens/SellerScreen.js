import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image, Linking} from 'react-native';
import moment from 'moment';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';
import { conn } from '../conn';
import { RefreshControl } from 'react-native-web';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SellerScreen({route, navigation}) {
  const {sellerId, buyerId} = route.params;
  const [seller, setSeller] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(null);
  const [refresh, setRefresh] = useState(false);
  // const [busyTimings, setBusyTimings] = useState([]);

  const busyTimings = useRef([])

  useEffect(() => {
    let dateArray =[]
    let DT = moment()
    DT.subtract(1, 'days')

    for (let index = 0; index < 31; index++) {
      dateArray.push({
        id: index,
        date: DT.add(1, 'days').format('DD'),
        month: DT.format('MMM'),
        year: DT.format('YYYY'),
        fullDate: DT.format('DD MMM YYYY')
        // dateString: new Date(DT).toISOString({ timeZone: "Asia/Qatar" })
      })        
    }

    setDates(dateArray)
    setSelectedDate(dateArray[0])
  }, []);

  useEffect(() => {
    if(sellerId){
      fetchSellerDetails()
    }
  }, [sellerId]);

  useEffect(() => {
    if(selectedDate && seller){
      checkAvailability()
    }
    // console.log("---------------------------checkAvailability")
    // const timings = []
    // const sellerAppointments = seller?.appointments?.filter((x)=> x.status === "ACCEPTED");

    // sellerAppointments?.forEach(item => {
    //   if(item.date === selectedDate.fullDate){
    //     timings.push(item.time)
    //   }
    // });

    // setBusyTimings(timings)

    // console.log("---------------------------busyTimings",busyTimings)
  }, [selectedDate, seller]);

  const fetchSellerDetails = async () => {
    console.log("fetchSellerDetails - Start")

    try {
      let url = `${conn}/seller/findOne/${sellerId}`
      const response = await fetch(url, {
        method: "GET",
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(data)
      })
      let res = await response.json()
      // console.log("Seller - ",res)
      setSeller(res)
    } catch (err) {
      console.log("fetchSellerDetails Errror ",err.message)
    }

    console.log("fetchSellerDetails - End")
  }

  const handleBooking = async () => {
    console.log("handleBooking - Start")

    const data = {
      buyerId: buyerId,
      sellerId: sellerId,
      date: selectedDate.fullDate,
      time: selectedTime.time,

    }

    try {
      let url = `${conn}/buyer/bookAppointment`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      let res = await response.json()

      if(res.message === "Success"){
        navigation.navigate("AppointmentsScreen", {view:"PENDING"})
      }

    } catch (err) {
      console.log("handleBooking Errror ",err.message)
    }

    console.log("handleBooking - End")
  }

  const checkAvailability = () => {
    
    console.log("---------------------------checkAvailability")
    const timings = []
    const sellerAppointments = seller?.appointments?.filter((x)=> x.status === "ACCEPTED");

    sellerAppointments.forEach(item => {
      if(item.date === selectedDate.fullDate){
        timings.push(item.time)
      }
    });
    busyTimings.current = timings
    console.log(busyTimings.current.includes("8.00 AM"))
    console.log("---------------------------busyTimings",busyTimings.current)
  }

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
          {seller?.photoURL ?
            <Image 
              source={{uri: seller.photoURL}}
              style={styles.userImage}
            />
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
          <Text style={styles.nameText}>{seller?.fullName ? seller.fullName : "Loading"}</Text>
          <Text style={styles.companyText}>{seller?.company ? seller.company : "Loading"}</Text>
          <View style={styles.communicationActionContainer}>
            {seller?.phone &&
              <TouchableOpacity style={styles.communicationContainer} onPress={()=>Linking.openURL(`tel:${seller.phone}`)}>
                <Icon
                  size={21}
                  type={"material"}
                  name={"phone"}
                  color={colors.WHITE}
                />
              </TouchableOpacity>
            }
            {seller?.email &&
              <TouchableOpacity style={styles.communicationContainer} onPress={()=>Linking.openURL(`mailto:${seller.email}`)}>
                <Icon
                  size={21}
                  type={"material"}
                  name={"email"}
                  color={colors.WHITE}
                />
              </TouchableOpacity>
            }
            
          </View>
        </View>
        <View style={styles.topSide}>
          {/* EMPTY VIEW FOR DESIGN */}
        </View>
      </View>


      <View style={styles.containerBottom}>
        <ScrollView style={styles.bodyScrollView}>
          {seller?.about &&
            <View style={styles.about}>
              <Text style={styles.aboutHeadText}>About Me</Text>
              <Text style={styles.aboutBodyText}>{seller.about}</Text>
            </View>
          }
          <View style={styles.availability}>
            <Text style={styles.availabilityText}>Availability</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScrollView} contentContainerStyle={styles.dateScrollViewContent}>
              {dates?.length > 0 && dates.map( (item, index) => 
                <TouchableOpacity key={index} onPress={()=> setSelectedDate(item)} style={item.id === selectedDate.id ? styles.selectedDateButton :styles.dateButton}>
                  <Text style={item.id === selectedDate.id ? styles.selectedDateText :styles.dateText}>{item.date}</Text>
                  <Text style={item.id === selectedDate.id ? styles.selectedMonthText :styles.monthText}>{item.month}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
            {seller?.availability?.filter((time)=> time.status === true).length > 0  ?
            <View style={styles.timings}>
              {seller.availability.filter((time)=> time.status === true && busyTimings.current.indexOf(time) === -1).map( (item, index) => 
                <TouchableOpacity key={index} disable={busyTimings.current.includes(item.time)} onPress={()=>setSelectedTime(item)} style={selectedTime?.time === item.time ? styles.selectedTimeButton: styles.timeButton}>
                  <Text style={selectedTime?.time === item.time ? styles.selectedTimeText : styles.timeText}>{item.time}</Text>
                </TouchableOpacity>
              )}
            </View>
            :
            <View style={styles.noTimings}>
              <Text style={styles.noTimingsText}>Sorry, there are no availabile timings for the seller</Text>
            </View>
            }
          </View>
        </ScrollView>
        <View style={styles.bookButtonContainer}>
          <TouchableOpacity onPress={()=> handleBooking()} disabled={selectedTime === null ? true : false} style={selectedTime === null ? styles.disabledBookButton : styles.bookButton}>
            <Text style={selectedTime === null ? styles.disabledBookText : styles.bookText}>Book Appointment</Text>
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
    width:70,
    height:70,
    resizeMode: "cover",
    // backgroundColor:"red",
    borderRadius: 160
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
    marginRight:8
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
  selectedDateButton:{
    width:45,
    height:45,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colors.DARK_PURPLE,
    borderRadius:100,
    borderWidth:1,
    borderColor: colors.DARK_PURPLE,
    marginRight:8
  },
  selectedDateText:{
    fontSize:12,
    fontFamily: font.REGULAR,
    color: colors.WHITE
  },
  selectedMonthText:{
    fontSize:9,
    fontFamily: font.REGULAR,
    color: colors.WHITE
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
  noTimings:{
    // backgroundColor:"red",
    height: height/6,
    marginRight:"5%",
    justifyContent:"center",
    alignItems:"center"
  },
  noTimingsText:{
    fontSize:12,
    fontFamily: font.REGULAR,
    color: colors.GRAY
  },
  selectedTimeButton:{
    width:"23%",
    height: 40,
    backgroundColor: colors.DARK_PURPLE,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 10,
    marginRight:"2%",
    marginBottom:"4%",
    borderWidth:1,
    borderColor: colors.DARK_PURPLE

  },
  selectedTimeText:{
    fontSize:12,
    fontFamily: font.REGULAR,
    color: colors.WHITE
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
  },
  disabledBookButton:{
    backgroundColor: colors.LIGHT_GRAY,
    justifyContent:"center",
    alignItems:"center",
    height:45,
    width:"80%",
    borderRadius: 10
  },
  disabledBookText:{
    fontSize:14,
    fontFamily: font.MEDIUM,
    color: colors.GRAY
  }
});
