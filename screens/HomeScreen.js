
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons'


const HomeScreen = () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log('Utente disconnesso!');
          })
          .catch((error) => {
            // Gestione l'errore
            console.log(error);
          });
      };
    
    


  return (
    <View style={styles.container}>
      <View style={styles.bigSection}>
        <Image source={require('../assets/imgs/machine-learning.png')} style={styles.image} />
        <Text style={styles.basicText}>Hello! {auth.currentUser?.email} welcome to:</Text>
        <Text style={styles.title}>MasteryML</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}
        onPress={handleSignOut}
        >
        <AntDesign name="logout" size={24} color="white" style={{alignContent: 'center'}} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            onPress={() => {navigation.navigate('ChatBot')}}
        >
        <Text style={styles.buttonText}>AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => {navigation.navigate('ChatCommunity')}}
    >
        <AntDesign name="wechat" size={24} color="white" style={{alignContent: 'center'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
         onPress={() => {navigation.navigate('Articles')}}
        >
        <Icon name="newspaper-o" size={24} color="white" style={styles.articleIcon} />
        </TouchableOpacity>
      </View>
    </View>

    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
   
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    container: {
        flex: 1,
      },
      bigSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
      },
      image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#ffffff',
      },
      button: {
        width: 80,
        height: 40,
        backgroundColor: '#1877f2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      title: {
        color: '#1877f2',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    basicText:{
        marginTop: 10,
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
    },
})