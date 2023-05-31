import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a delay for the splash screen
    const splashTimeout = setTimeout(() => {
      navigation.navigate('Login'); // Replace with the name of your main screen
    }, 2000); // Change the duration as per your requirement

    return () => clearTimeout(splashTimeout); // Clean up the timeout on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Add your splash screen image or content here */}
      <Image source={require('../assets/imgs/machine-learning.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SplashScreen;
