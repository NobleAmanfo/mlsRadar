import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Image, } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { clubsUrl } from '../utils/Constants';
import * as wpActions from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
 
export default function Clubs({navigation}){
    const dispatch = useDispatch();
    const clubData = useSelector((state) => state.appData.clubData);
    const [pName, setpName] = useState('');
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [favoriteList, setFavoriteList] = useState([]);
  
  
    useEffect(() => {
      // Update the document title using the browser API
      fetchData();
    }, []);
  
    const fetchData = () => {
      let url = clubsUrl
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          // console.log('JSON', json)
          let easternConference = json.season.groups[0].standings;
          let westernConference = json.season.groups[1].standings;
          const combinedStandings = [...easternConference, ...westernConference]
          dispatch(wpActions.saveClubData(combinedStandings))
        })
        .catch((error) => {
          console.error(error);
          dispatch(wpActions.saveClubData())
        })
    }
  
    const markFavorite=(code)=>{
      dispatch(wpActions.updateClubData(code));
    }
  
    const renderItemView = ({ item }) => {
      console.log(item)
      return (
        <View style={{ flexDirection: 'row', width: '95%', borderColor: '#94a274', borderWidth: 1, marginLeft: 10, marginVertical: 5, borderRadius: 5,  padding: 10, }}>
          <TouchableOpacity style={{ flexDirection: 'row',  width: '90%' }}
            onPress={() => navigation.navigate('ClubDetails', { details: item, standings: item.options })}
          >
            <View style={{ width: '20%' }}>
              <Image source={{ uri: item.logo }} style={{ width: 50, height: 50 }} />
            </View>
            <View style={{ width: '80%', justifyContent: 'center', }}>
              <Text style={{ color: '#fff', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>{item.teamName}</Text>
  
            </View>
          </TouchableOpacity>
          <View style={{ width: '10%', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => markFavorite(item.teamID)}
              style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Ionicons name={item.show ? 'star' : 'star-outline'} size={26} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    };
  
   const searchArray = clubData && clubData.filter(item => {
      if (pName === '') return item;
      if (item.teamName.toLowerCase().includes(pName.toLowerCase())) return item;
    });
  
    return (
        <SafeAreaView style={styles.container} >
        <View style={{ flexDirection: 'row', marginBottom:10 }}>
          <View style={{paddingLeft: 15, marginLeft: 10, flexDirection: 'row',  alignItems: 'center', backgroundColor: 'white', borderRadius: 5, backgroundColor: '#94a274', width: '80%', paddingVertical: 15 }}>
            <View>
              <Ionicons name='md-search' size={25} color='#fff' />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search Player"
              placeholderTextColor='white'
              onChangeText={(text) => setpName(text)}
              value={pName}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '15%' }}>
          <TouchableOpacity onPress={() => {
            setToggle(!toggle); dispatch(wpActions.filterClubData())
          }} style={styles.btn}>
            
              <Ionicons name='md-filter-outline' size={40} color='#fff' />
            
            {/* <Text style={styles.bold}>{toggle ? 'Back to Previous Listing' : 'Sort Alphabetically'}</Text> */}
          </TouchableOpacity>
        </View>
        </View>
        
  
  
        <FlatList
          data={searchArray}
          renderItem={item => renderItemView(item)}
          ListEmptyComponent={() => (
            <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', }}>
              Nothing to show
            </Text>
          )
          }
        />
      </SafeAreaView>
  
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#00001c',
      padding: 20,
      flex: 1,
      borderRadius: 20,
      justifyContent: 'center',
    },
    input: {
      width: 270,
      backgroundColor: '#94a274',
      paddingLeft: 10
    },
    listing: {
      flexDirection: 'row',
      marginVertical: 10,
  
    },
    btn: {
      backgroundColor: '#00001c',
    },
  
  })

//make this component available to the app

