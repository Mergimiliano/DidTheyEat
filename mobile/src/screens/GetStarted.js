import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import { style } from '../styles/style';
import Button from '../components/Button';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const carouselData = [
  { text: 'First slide text here!'},
  { text: 'Second slide text here!'},
  { text: 'Third slide text here!'},
];


export default function GetStarted({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={style.background}
    >


      <View style={style.container}>

                
      <Image
          source={require('../assets/welcome-image.png')}
          style={style.welcomeImage}
        />

        <Text style={style.textTitle}>
          Welcome, let's get started
        </Text>

        <Carousel
          loop
          width={width * 0.8}
          height={100}
          autoPlay={true}
          data={carouselData}
          onSnapToItem={(index) => setCurrentIndex(index)} // Set current index on slide change
          renderItem={({ index }) => (
            <View style={style.carouselItem}>
              <Text style={style.textSubtitle}>{carouselData[index].text}</Text>
            </View>
          )}
        />

        {/* Pagination Dots */}
        <View style={style.pagination}>
          {carouselData.map((_, index) => (
            <View
              key={index}
              style={[
                style.dot,
                currentIndex === index ? style.activeDot : style.inactiveDot,
              ]}
            />
          ))}
        </View>

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
