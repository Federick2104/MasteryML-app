//rnfes
import { ImageBackground ,KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';


WebBrowser.maybeCompleteAuthSession();


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '126727945280-t9f1qme0c55u4u8un11hguva9n895ov7.apps.googleusercontent.com',
        iosClientId: '126727945280-anbh8q2r53rfciqdmt7dk01q3ifl29bf.apps.googleusercontent.com',
        webClientId: '126727945280-su9cr3g4sv6bid992blshbic1qse0el9.apps.googleusercontent.com',
    })

    useEffect(() => {
        handleSignInWithGoogle()
    }, [response]);


    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem('@user');
        if (!user){
            if(response?.type === 'success'){
            await getUserInfo(response.authentication.accessToken)
            }
        } else {
            setUserInfo(JSON.parse(user))
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await response.json()
            await AsyncStorage.setItem('@user', JSON.stringify(user))
            setUserInfo(user)
        } catch (error) {
            console.log(error)
            //gestione errore
        }
    }
        


    const navigation = useNavigation();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Registrato con:', user.email);
            navigation.replace('Home');
          })
          .catch((error) => alert(error.message));
      };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Loggato con:', user.email);
                navigation.replace('Home');
            })
            .catch((error) => alert(error.message));
    };

  return (
    
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        
        <ImageBackground source={require('../assets/imgs/humanitycrop.png')} style={styles.image}>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => {setEmail(text)}}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => {setPassword(text)}}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={handleLogin} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => promptAsync()} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login with Google</Text>
                    
                </TouchableOpacity>
                {/* Sistemare il logout */}
                <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => { AsyncStorage.removeItem('@user') }}>
                    <Text style={styles.buttonOutlineText}>Delete Local Storage</Text>
                    <Text style={styles.buttonOutlineText}>{JSON.stringify(userInfo, null ,2)}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleSignUp} 
                    style={[styles.button, styles.buttonOutline]} //dai 2 styles
                >
                    <Text style={styles.buttonOutlineText}>Sign Up</Text>
                </TouchableOpacity>
               
        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        width: '80%',
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 6,
    },
    buttonContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#1877f2',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#1877f2',
        borderWidth: 2,
    },
    buttonOutlineText:{
        color: '#1877f2',
        fontWeight: '700',
        fontSize: 16,
    },
})