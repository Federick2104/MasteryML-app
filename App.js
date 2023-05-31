import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { createContext, useContext } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Swiper from 'react-native-swiper';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatBot from './screens/ChatBot';
import SignupScreen from './screens/SignupScreen';
import ChatCommunity from './screens/ChatCommunity';
import ArticleList from './screens/ArticleList';
import { TouchableOpacity } from 'react-native';





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

  function GettingStartedScreen({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleStart = () => {
      navigation.navigate('Login');
    };

    const handleSkip = () => {
      navigation.navigate('Login');
    };
  
    const slides = [
      {
        title: 'Welcome to MasteryML!',
        image: require('./assets/imgs/machine-learning.png'),
        description: "Unisciti alla vivace comunità di MasteryML e connettiti con altri appassionati di machine learning, collaborando per spingere insieme i confini dell'intelligenza artificiale.",
      },
      {
        title: 'Learn',
        image: require('./assets/imgs/hands.png'),
        description: "Intraprendi un emozionante percorso di apprendimento del machine learning, dove acquisirai le competenze e le conoscenze per sbloccare le infinite possibilità dell'intelligenza artificiale.",
      },
      {
        title: 'Talk',
        image: require('./assets/imgs/robotic.png'),
        description: 'Esplora nuove dimensioni di conversazioni, interagendo sia con esseri umani che con entità non umane, aprendo un mondo di comunicazione senza confini.',
      },
    ];
    const handleIndexChanged = (index) => {
      setCurrentIndex(index);
    };

    return (
      <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Swiper
          showsPagination
          loop={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          onIndexChanged={handleIndexChanged}
        >
          {slides.map((slide, index) => (
            <View style={styles.slide} key={index}>
              <Text style={styles.heading}>{slide.title}</Text>
              <Image source={slide.image} style={styles.image} />
              <Text style={styles.sliderText}>{slide.description}</Text>
              {index === 2 && (
                <TouchableOpacity style={{padding: 10}}title="Skip" onPress={handleStart}>
                <Text style={{marginBottom: 20, paddingBottom: 10, fontSize: 24, color: '#1877f2', fontWeight: '600'}}>Let's Start!</Text>
              </TouchableOpacity>
              )}
            </View>
          ))}
        </Swiper>
        </View>
      {currentIndex !== 2 && (
        <TouchableOpacity style={{padding: 10}} onPress={handleStart}>
          <Text style={{marginBottom: 20, paddingBottom: 10, fontSize: 16}}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
    );
  }

function ChatStack (){


  return (
    <Stack.Navigator defaultScreenOptions={HomeScreen}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatCommunity" component={ChatCommunity} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="Articles" component={ArticleList} />
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
      {user ? <ChatStack/> : (
        <Stack.Navigator>
          <Stack.Screen
            name="GettingStarted"
            component={GettingStartedScreen}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignUp" component={SignupScreen} />

        </Stack.Navigator>
      ) }
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
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
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
  sliderContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  sliderText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    width: '70%',
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  
});
