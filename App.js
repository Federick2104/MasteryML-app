import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { createContext, useContext } from 'react';
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatBot from './screens/ChatBot';
import LaunchScreen from './screens/LaunchScreen';
import SignupScreen from './screens/SignupScreen';
import ChatCommunity from './screens/ChatCommunity';


// useEffect(() => {
//   // Simulate a delay for the splash screen
//   const splashScreenTimeout = setTimeout(() => {
//     setShowLaunchScreen(false);
//   }, 2000);

//   // Clean up the timeout when the component unmounts
//   return () => {
//     clearTimeout(splashScreenTimeout);
//   };
// }, []);

// const [showLaunchScreen, setShowLaunchScreen] = useState(true);


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
      setLoading(false);
    }
    );
  return () => unsubscribeAuth();
  }, [user]);
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large'/>
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
});
