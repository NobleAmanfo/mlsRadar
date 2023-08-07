import { StyleSheet } from 'react-native'
import { colorCode } from './colorCode'

export const styles = StyleSheet.create({
  
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  ctr:{
    justifyContent: 'center',
  },
  btw:{
    justifyContent: 'space-between',
  },
  ard:{
    justifyContent: 'space-around',
  },
  title:{
    fontSize: 48,
    color: colorCode.purple,
  },
  lg:{
    fontSize: 20,
    
    color: colorCode.white,
  },
  lg1:{
    fontSize: 20,
    color: colorCode.black,
  },
  lg2:{
    fontSize: 20,
    fontWeight: 'bold',
    color: colorCode.black,
  },
  md:{
    fontSize: 16,
    color: colorCode.purple,
  },
  sm:{
    fontSize: 12,
    flexWrap: 'wrap',
    color: colorCode.black,
    flex: 1,
    fontWeight: 'bold'
  },
  xs:{
    fontSize: 12,
    
    color: colorCode.purple,
  },
  caps:{
    textTransform: 'capitalize'
  },
  lightText:{
    color: colorCode.white,
  },
  darkText: {
    color: 
colorCode.black

  },
  textCenter:{
    textAlign: 'center',
  },
  error:{
    fontSize: 10,
    color: 'red',
  },
  pv:{
    paddingVertical: 10
  },
  ph:{
    paddingHorizontal: 20,
  },
  mt:{
    marginTop: 40,
  },
  input:{
    backgroundColor: colorCode.white,
    height: 50,
    paddingHorizontal: 10,
    color: 
colorCode.black
,
    marginVertical: 8,
    borderRadius: 5
  },
  border:{
    borderWidth: 1,
    padding: 5,
    borderColor: colorCode.white,
  },
  listing:{
    backgroundColor: 'rgba(255,255,255,0.98)',
    margin: 5,
    borderRadius: 10,
    width: '90%',
    padding: 20,
    alignSelf: 'center'
  },
    container1: {
      backgroundColor: colorCode.overallBg,
      alignItems: 'center',
      flex: 1,
      borderRadius: 20
    },
    input: {
      marginTop: 20,
      paddingVertical: 12,
      width: 300,
      borderWidth: 1,
      backgroundColor: colorCode.white,
      padding: 10,
      borderRadius: 10
    },
  
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      width: 380,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: colorCode.buttonBg,
      marginTop: 50
    },
  
    button1: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      width: 380,
      borderRadius: 10,
      elevation: 15,
      backgroundColor: 'white',
      marginTop: 8,
      // borderColor: 'black',
      // borderWidth: 1,
    },
    button2: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      width: 380,
      borderRadius: 10,
      elevation: 15,
      backgroundColor: 'white',
      marginTop: 20,
      // borderColor: 'black',
      borderWidth: 1,
    },
    button3: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      width: 380,
      borderRadius: 10,
      elevation: 15,
      backgroundColor: 'white',
      marginTop: 20,
      // borderColor: 'black',
      borderWidth: 1,
    },
  
    tinyLogo: {
      height: 18,
      width: 18,
      marginRight: 5
    }
  
  
  })
  
