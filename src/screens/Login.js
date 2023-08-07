//import liraries
import React, { Component, useState } from 'react';
import {KeyboardAvoidingView, TouchableOpacity, TextInput, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {authentication} from '../utils/Firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';



export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  



    const RegisterUser = () => {
        createUserWithEmailAndPassword(authentication, email, password)
        .then(() => navigation.replace('Home'))
        // .then((re)=>{
        //     console.log(re);
        //     setIsSigned(true)
        // })
        .catch((re)=>{
             console.log(re)
        })
    }

    const SignInUser = () => {
        signInWithEmailAndPassword(authentication,email,password)
        .then(() => navigation.replace('Home'))
        // .then((re)=>{
        //     console.log(re);
        //     setIsSigned(true)
        // })
        .catch((re)=>{
             console.log(re)
        })
    }

    const navigation = useNavigation()
    //     useEffect(()=>{
    //    const unsubscribe = authentication.onAuthStateChanged(re => {
    //         if (re){
    //             navigation.replace("Home")
    //         }
    //     })
    //     return unsubscribe
    // }, []) 
    


    // const handleSignup = () => {
    //     auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(userCredentials => {
    //         const user = userCredentials.user
    //         console.log(user.email)
    //     })
    //     .catch(error => alert(error.message))
    // }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style = {{marginTop: 90, alignItems:'center'}}>
            <Text style={{fontWeight: "bold", fontSize: 25, color:'white',  }}>Log in</Text>
            </View>

            <View style={styles.inputView}>
            <Text style={{ marginTop: 20,  fontSize: 13, color:'white' }}>
                Email
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={text => setEmail(text)}

            />
            <Text style={{ marginTop: 25,  fontSize: 13, color:'white' }}>
                Password
            </Text>
            <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <View>
            <Text style={{ marginTop: 10,  fontSize: 13, color:'white' }}>
                Forgot Password?
            </Text>
            </View>
            
            </View>
            
           

            <TouchableOpacity style={styles.button}
                onPress={SignInUser} >
                <Text style={{ color: '#fff', fontWeight: "bold" }} >Log in</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>

                <View style={{ marginLeft: 15, flex: 1, height: 1, backgroundColor: '#fff' }} />
                <View>
                    <Text style={{ width: 40, textAlign: 'center', color: '#fff' }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#fff', marginRight: 15, }} />
            </View>

            <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.button1}
                    onPress={() => this.props.navigation.navigate('Home')
                    } >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/google.png')
                            }
                        />
                        <Text style={{ color: 'black', fontWeight: "bold", fontSize: 15 }} >Continue with Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1}
                    onPress={() => this.props.navigation.navigate('Home')
                    } >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image
                            style={{
                                height: 18,
                                width: 18,
                                marginRight: 5,
                                marginLeft: 20
                            }}
                            source={require('../assets/facebook2.png')
                            }
                        />
                        <Text style={{ color: 'black', fontWeight: "bold", fontSize: 15 }} >Continue with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}
                    onPress={() => null
                    } >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} >
                        <Image
                            style={{ height: 28, width: 28, }}
                            source={require('../assets/apple.png')
                            }
                        />
                        <Text style={{ color: 'black', fontWeight: "bold", fontSize: 15 }} >Continue with Apple</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style = {{justifyContent: 'center', marginTop: 60, flexDirection: 'row' }}>
                <Text style = {{color: '#fff', }}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={RegisterUser}>
                <Text style = {{color: '#94a274', marginLeft: 5 }}>
                    Sign up
                </Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00001c',
        flex: 1,
        borderRadius: 20
    },
    inputView:{
        marginLeft: 20
    },
    input: {
        marginTop: 5,
        width: "95%",
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5
    },

    button: {
        alignItems: 'center',
        padding: 15,
        width: "90%",
        borderRadius: 5,
        elevation: 15,
        backgroundColor: '#94a274',
        marginTop: 40,
        marginLeft: 20
    },

    button1: {
        alignItems: 'center',
        padding: 15,
        width: "90%",
        borderRadius: 5,
        elevation: 15,
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 20
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
        borderColor: 'black',
        borderWidth: 1,
    },

    tinyLogo: {
        height: 18,
        width: 18,
        marginRight: 5
    }


})


