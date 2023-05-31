//rnfes
import { ImageBackground ,KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import {createUserWithEmailAndPassword } from 'firebase/auth'

const SignupScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Registrato con:', user.email);
            navigation.replace('Login');
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
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={email}
                onChangeText={(text) => {setEmail(text)}}
                style={styles.input}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(text) => {setPassword(text)}}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={handleSignUp} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
        </View>
       
        </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

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
    viewSignUp: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
})

