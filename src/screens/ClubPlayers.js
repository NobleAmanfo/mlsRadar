import React, {useState,useEffect, Component } from 'react'
import {FlatList, SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { clubPLayesUrl } from '../utils/Constants';


function ClubPlayers({navigation}) {
  const [players,setPlayers]=useState([]);
  const [name, setName] = useState('');
  const [loading,setLoading]=useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
   fetchData();
  }, []);

  const fetchData=()=>{
    let url = clubPLayesUrl
    fetch(url)
    .then(response=>response.json())
    .then(responseJson=> {
      const arr = responseJson.season.players;
      const arr1 = arr.sort((a,b) => a.fullname > b.fullname ? 1 : -1)
      setPlayers(arr);

    }
    )
      .catch((error) => {
        console.error(error);
        setPlayers([])
      })
  }
  

  const renderItemView=({item})=> {
    console.log(item)
    return (
      <TouchableOpacity style={{flexDirection: 'row', marginHorizontal:10, marginVertical:5, borderRadius:5, backgroundColor:'#fff', padding:10 }}
      onPress={()=> navigation.navigate('PlayerDetails',{details: item})} 
      >
        <View style = {{backgroundColor: '#E5E4E2', padding: 5, borderRadius: 5}}>
        <Image source={{uri: item.photo ? item.photo : 'https://cdn-icons-png.flaticon.com/512/77/77305.png'}} style={{width: 50,height: 50}}/>
        </View>
        <View>
        <Text style={{fontSize: 20, color: 'black', paddingLeft:10, paddingTop:8, paddingBottom:5, textAlign: 'left', fontWeight:'bold' }}>{item.fullname}</Text>
        <Text style={{fontSize: 12, color: 'black', paddingLeft: 10,textAlign: 'left', fontWeight:'bold'}}>{item.teamname}</Text>
        </View>
      </TouchableOpacity>
    );

  };

  // const alphabeticalSort=()=>{
  //   if(toggle) {
  //   const newData = players.sort((a,b)=> {
  //     if(a.fullname.toLowerCase() < b.fullname.toLowerCase()) return -1;
  //     if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) return 1;
  //     return 0;
  //   });
  //   setPlayers(newData);
  //   setLoading(!loading);
  //   } else {
  //   fetchData();
  //   }
  // }

  const searchArray = players && players.filter(item=>  {
    if(name === '') return item;
    if (item.fullname.toLowerCase().includes(name.toLowerCase())) return item;
  })

    return (
        <SafeAreaView style={styles.container} >
          <View style = {{flexDirection: 'row', marginBottom:10 }}>
          <View style={{ paddingLeft: 15,  marginLeft: 10, flexDirection: 'row',  alignItems: 'center', backgroundColor: 'white', borderRadius: 5, backgroundColor: '#94a274', width: '95%', paddingVertical: 15 }}>
            <View>
              <Ionicons name='md-search' size={25} color='#fff'  />
            </View>
            <TextInput

              style={styles.input}
              placeholder="Search Player"
              placeholderTextColor='white'
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() =>{
            setToggle(!toggle);alphabeticalSort()
          }} style={styles.btn}>
            <Text style={styles.bold}>{toggle ? 'Sort Alphabetically' : 'Back to Previous Listing' }</Text>
          </TouchableOpacity>
          </View>
         */}

        
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

    )
  }

  export default ClubPlayers;

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
  listing:{
    flexDirection: 'row',
    marginVertical: 10, 
    
  },
  btn:{
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#94a274',
    margin: 20,
    borderRadius: 10,
  },

})