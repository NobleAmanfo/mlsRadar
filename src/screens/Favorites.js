import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Image, } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
// import { clubsUrl } from '../utils/Constants';
import * as wpActions from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Favorites({ navigation }) {
    const [pName, setpName] = useState('');
  const clubData = useSelector((state) => state.appData.clubData);
  const dispatch = useDispatch();


  const MarkFavorite=(code)=>{
    dispatch(wpActions.updateClubData(code));
  }
  const searchArray = clubData && clubData.filter(item => {
    if (pName === '') return item;
    if (item.teamName.toLowerCase().includes(pName.toLowerCase())) return item;
  });

  const renderItemView = ({ item }) => {
    console.log(item)
    return (
      item.show ?
      <View style={{ flexDirection: 'row', width: '95%',  marginHorizontal: 10, marginVertical: 5, borderRadius: 5, borderColor: '#94a274', borderWidth: 1, padding: 10, }} key={item.teamID}>
        
        <TouchableOpacity style={{ flexDirection: 'row', width: '90%' }}
          onPress={() => navigation.navigate('ClubDetails', { details: item, standings: item.options })}
        >
          <View style={{ width: '20%' }}>
            <Image source={{ uri: item.logo }} style={{ width: 50, height: 50 }} />
          </View>
          <View style={{ width: '80%', justifyContent: 'center', }}>
            <Text style={{ color: '#fff', textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>{item.teamName}</Text>
          </View>
          <View style={{ width: '10%', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => MarkFavorite(item.teamID)}
            style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Ionicons name={item.show ? 'star' : 'star-outline'} size={26} color={'white'} />
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
        
      </View> : null
    );
  };
    return (
      <>
      <SafeAreaView style={styles.container}>

        <View style = {{ alignItems: 'center', marginBottom:20}}>
          <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Favorites
          </Text>
        </View>
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
      </>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#00001c',
      
      flex: 1,
      
      justifyContent: 'center',
  
    },
  
  })
  
  

