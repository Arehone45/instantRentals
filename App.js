import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from './src/SplashScreen';
import SignInScreen from './src/SignInScreen';
import SignUpScreen from './src/SignUpScreen';

import firebase from 'firebase';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW1xDUyNGhPdbCrOebIV6sjZAEaEhEfuI",
  authDomain: "instant-3ad54.firebaseapp.com",
  projectId: "instant-3ad54",
  storageBucket: "instant-3ad54.appspot.com",
  messagingSenderId: "657628002029",
  appId: "1:657628002029:web:99042621d1f0124ed7fee4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: true}}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: true}}/>
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
