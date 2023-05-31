//rnfes
import { Linking, ImageBackground ,KeyboardAvoidingView, KeyboardAvoidingViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Loggato con:', user.email);
            })
            .catch((error) => alert(error.message));
    };

  return (
    
    <KeyboardAvoidingView
        style={styles.container}
    >
        
        <ImageBackground source={require('../assets/imgs/humanitycrop.png')} style={styles.image}>
        <View style={styles.inputContainer}>
            <Text style={styles.title}>MasteryML</Text>
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
                    onPress={handleLogin} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.viewSignUp} >
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 14}}>Dont Have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                        <Text style={{color: 'yellow', fontWeight: 'bold', fontSize: 16}}> Sign Up</Text>
                    </TouchableOpacity>
                    
                   
                    
                </View>
        </View>
        <View style={styles.support}>
            <View>
                    <Text style={{color: 'white', textDecorationLine: 'underline',textAlign: 'center'}}
                            onPress={() => Linking.openURL('https://fede.app')}>
                            Powered by Fede.app 
                    </Text>
            </View>
            <View>
                    <Text style={{color: 'white', textDecorationLine: 'underline',textAlign: 'center', fontSize: 20}}
                            onPress={() => Linking.openURL('https://u24.gov.ua/')}>
                            Support Ukraine 🇺🇦 
                    </Text>
                    <Text style={{color: 'white', textAlign: 'center'}} >Help Provide Humanitarian Aid to Ukraine.</Text>
            </View>
          
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
        position: 'relative',
        
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
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    support: {
        width: '100%',
        textAlign: 'center',
        flexDirection: 'column',
        marginTop: 40,
    }

})

