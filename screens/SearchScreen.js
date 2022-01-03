import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput, Image} from 'react-native';
import {colors, font} from '../theme/theme'
import { Icon } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SearchScreen({route, navigation}) {
  const {sellerList, buyerId} = route.params;

  const [sellers, setSellers] = useState(false);
  

  useEffect(() => {
    setSellers(sellerList);
  }, []);

  const handleSearch = (text) => {  
    const filteredSellers = sellerList.filter((item) => ((item.fullName).toLowerCase()).includes(text.toLowerCase()));
    setSellers(filteredSellers)
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
          <Text style={styles.headerText}>Search</Text>
        </View>
        <View style={styles.headerRight}></View>
      </View>


      <View style={styles.center}>
        <View style={styles.searchContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
            <Icon
                size={25}
                type={"feather"}
                name={"search"}
                color={colors.GRAY}
            />
          </TouchableOpacity>
          <TextInput 
            style={styles.searchInput}
            // value={searchText}
            onChangeText={(text)=>handleSearch(text)}
            placeholder='Search for a seller'
          />
        </View>
      </View>


      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.innerBody}>
            {sellers?.length > 0 ? sellers.map((item, index) =>
              <TouchableOpacity key={index} onPress={()=>navigation.navigate("SellerScreen", {sellerId: item._id, buyerId: buyerId})} style={[styles.sellerContainer, index%2 !== 0 && {marginLeft:"7%"}]}>
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
            )
            :
              <View style={styles.noResultView}>
                <Text style={styles.noResultText}>No matches found</Text>
              </View>
            }
          </View>                    
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
  searchContainer:{
    backgroundColor: colors.LIGHT_GRAY,
    width:"90%",
    flexDirection:"row",
    height:45,
    borderRadius:10,
    alignItems:"center"
  },
  searchButton:{
    // backgroundColor:"yellow",
    width:"15%"
  },
  searchInput:{
    // backgroundColor:"pink",
    width:"85%",
    fontFamily: font.MEDIUM,
    fontSize: 14,
    color: colors.GRAY
  },

  //------------- BODY ------------- 
  body:{
    flex:7,
    // backgroundColor: "red"
  },
  scrollView:{
    // backgroundColor:"yellow",
  },
  innerBody:{
    // backgroundColor:"blue",
    margin: "4.5%",
    flexDirection:"row",
    flexWrap:"wrap",
    // justifyContent:"center"
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
  noResultView:{
    // backgroundColor:"red",
    width: "100%",
    height: height/4,
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center"
  },
  noResultText:{
    fontFamily: font.MEDIUM,
    fontSize: 14,
    color: colors.GRAY
  }
});
