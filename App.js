import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatBot from './screens/ChatBot';
import LaunchScreen from './screens/LaunchScreen';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    // Simulate a delay for the splash screen
    const splashScreenTimeout = setTimeout(() => {
      setShowLaunchScreen(false);
    }, 2000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(splashScreenTimeout);
    };
  }, []);

  const [showLaunchScreen, setShowLaunchScreen] = useState(true);

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {showLaunchScreen && (
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen options={{headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatBot" component={ChatBot} />

    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
