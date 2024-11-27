import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import { style } from '../styles/style';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const carouselData = [
  { text: 'First slide text here!'},
  { text: 'Second slide text here!'},
  { text: 'Third slide text here!'},
];


export default function GetStarted({ navigation }) {
  return (

    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={style.background}
    >
        
        <Image
          source={require('../assets/welcome-image.png')}
          style={style.welcomeImage}
        />


      <View style={style.container}>
        <Text style={style.textTitle}>
          Welcome, let's get started
        </Text>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>

      </View>
    </ImageBackground>
  );
}
