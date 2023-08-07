import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import { BottomSheet } from "react-native-btr";
import { styles } from '../design/styles';
import { useDispatch } from 'react-redux';
import * as wpActions from '../store/actions';


function ClubDetails({ navigation, route }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [visible, setVisible] = useState(false);


  function toggle() {
    setVisible((visible) => !visible);
  }


  const { details, standings } = route.params;
  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const fetchData = () => {
    let url = `https://api.statorium.com/api/v1/teams/${details.teamID}/?season_id=143&apikey=f41c2d8c8377a90c5d1708a22851eefb`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.team);
      }
      )
      .catch((error) => {
        console.error(error);
        // setClubs([])
      })
  }
  const fetchData1 = () => {
    let url = `https://newsapi.org/v2/everything?q="${details.teamName}"&pageSize=5&sortBy=relevancy&apiKey=b7ebb650437d4d95bcbf85be5d6b0113`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setNewsData(responseJson.articles);
        console.log(responseJson.articles)
      }
      )
      .catch((error) => {
        console.error(error);
        // setClubs([])
      })
  }


  const renderItemView = ({ item }) => {
    console.log(item)
    return (
      <TouchableOpacity onPress={()=> dispatch(wpActions.savePlayerDetails(item))}>
      <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', alignSelf: 'center', borderWidth: 2, borderColor: 'white', padding: 10, borderRadius: 5, width: '95%' }}>
        <View style={{ width: '20%', alignItems: 'center', backgroundColor: '#E5E4E2', padding: 5, borderRadius: 5, marginRight: 10}}>
          <Image source={{ uri: item.photo ? item.photo : 'https://cdn-icons-png.flaticon.com/512/77/77305.png' }} style={{ width: 50, height: 60, alignItems: 'center', }} />
        </View>

        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: '50%' }}>
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', color: '#94a274' }}>{item.fullName}</Text>
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>Squad Number: {item.playerNumber}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>position: {item.additionalInfo.position === "1" ? 'Gk' : data.additionalInfo && data.additionalInfo.position === "2" ? 'Defender' : data.additionalInfo && data.additionalInfo.position === "3" ? 'Midfielder' : 'Attacker'}</Text>
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>{item.country.name}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  console.log(JSON.parse(standings))
  return (
    <SafeAreaView style={[styles.container1]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={{ width: '30%', alignItems: 'center' }}>

          <Image source={{ uri: details.logo ? details.logo : 'https://cdn-icons-png.flaticon.com/512/77/77305.png' }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
        </View>
        <View style={{ width: '70%' }}>

          <Text style={[styles.lg]}>{details.teamName}</Text>
          {data ? <>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.tinyLogo}
                source={require('../assets/map-pin.png')
                }
              />
              <Text style={[styles.lg]}> {data.city} </Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <Image
                style={styles.tinyLogo}
                source={require('../assets/stadium.png')
                }
              />
            <Text style={[styles.lg]}> {data.homeVenue && data.homeVenue.name} </Text>
            </View>

          </>
            : null}
        </View>
      </View>

      <View style={{ flexDirection: 'row', borderWidth: 2, borderColor: '#94a274', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 10, marginTop: 10 }}>

        <Text style={styles.lg}>P: {JSON.parse(standings).played_chk} </Text>
        <Text style={[styles.lg, { color: '#94a274' }]}>W: {JSON.parse(standings).win_chk} </Text>
        <Text style={styles.lg}>D: {JSON.parse(standings).winhome_chk} </Text>
        <Text style={styles.lg}>L: {JSON.parse(standings).lost_chk} </Text>
        <Text style={styles.lg}>GD: {JSON.parse(standings).gd_chk} </Text>

      </View>
      <TouchableOpacity style={[styles.button1, {  }]} onPress={toggle}>
        <Text style={styles.md}>Latest News</Text>
      </TouchableOpacity>

      <FlatList
        data={data.players}
        renderItem={item => renderItemView(item)}
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 50 }}
        ListEmptyComponent={() => (
          <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', }}>
            Nothing to show
          </Text>
        )
        }
      />


      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styless.card}>
          <View style={{ alignItems: 'center', borderWidth: 2, borderColor: '#94a274', paddingVertical: 20, borderRadius: 10, paddingHorizontal: 10, width: '100%' }}>
            <View style ={{}}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black',   }}>NEWS</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                <View style={{ marginHorizontal: 5, flex: 1, height: 1, backgroundColor: 'black' }} />
               
            </View>
            {
              newsData && newsData.map(item => {
                return (
                  <TouchableOpacity key={item.publishedAt} style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, borderRadius: 10, borderColor: '#94a274', borderWidth: 1, padding: 10, width: '100%' }} onPress={() => Linking.openURL(item.url)} >
                    <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://cdn-icons-png.flaticon.com/512/77/77305.png' }} style={{ width: 50, height: 50, marginRight: 10, }} />
                    <Text style={[styles.sm, styles.textCenter,]}>{item.title}</Text>
                  </TouchableOpacity>
                )

              })
            }
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>

  );
};

//make this component available to the app
export default ClubDetails;

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "white",    
    borderRadius:10
  },
});
