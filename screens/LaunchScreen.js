import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LaunchScreen = () => {
  return (
    <View style={styles.container}>
      {/* Add your splash screen content */}
      <Image source={require('../assets/imgs/machine-learning.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default LaunchScreen;