import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { createContext, useContext } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatBot from './screens/ChatBot';
import SignupScreen from './screens/SignupScreen';
import ChatCommunity from './screens/ChatCommunity';




const Stack = createNativeStackNavigator();
//error
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    return (
      <AuthenticatedUserContext.Provider value={{ user, setUser }}>
        {children}
      </AuthenticatedUserContext.Provider>
    )
  }

function ChatStack (){


  return (
    <Stack.Navigator defaultScreenOptions={HomeScreen}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatCommunity" component={ChatCommunity} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
    </Stack.Navigator>
  )
}
function AuthStack (){
  return (
    <Stack.Navigator defaultScreenOptions={LoginScreen}>
            <Stack.Screen options={{headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function RootNavigator(){
  const {user , setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setTimeout(() => setLoading(false), 1000); // Pause for 2 seconds
    }
    );
  return () => unsubscribeAuth();
  }, [user]);
  if (loading) {
    return (
      console.log('loading'),
      <View style={styles.containerImg}>
        <Image source={require('./assets/imgs/machine-learning.png')} style={styles.image} />
     </View>
    )
  }

  return(
    <NavigationContainer>
      
      {user ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}


export default function App() {

  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
