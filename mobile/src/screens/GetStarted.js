import React, { useRef } from 'react';
import { View, ImageBackground, Image, SafeAreaView, FlatList, Animated } from 'react-native';
import { colors, style } from '../styles/style';
import Button from '../components/Button';
import Slider from '../components/Slider';

const slides = [
  {
    id: '1',
    title: 'Welcome to DidTheyEat!',
    text: 'Feeding your pets has never been this easy'
  },
  {
    id: '2',
    title: 'Title 2',
    text: 'Text test 2'
  },
  {
    id: '3',
    title: 'Title 3',
    text: 'Text test 3'
  }
]

export default function GetStarted({ navigation }) {

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/background-landing.png')}
        resizeMode="cover"
        style={style.background}>

        <View style={style.getStartedTop}>

          <Image source={require('../assets/welcome-image.png')} style={style.imageWelcome} />

          <FlatList
          data={slides}
          renderItem={({ item }) => <Slider item={item} /> }
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={ (item) => item.id }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          />

            <View style={style.dotContainer}>
            {slides.map((_, index) => {
              const inputRange = [
                (index - 1) * style.sliderWidth,
                index * style.sliderWidth,
                (index + 1) * style.sliderWidth,
              ];
              const dotScale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8],
                extrapolate: 'clamp',
              });
              const dotOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index.toString()}
                  style={[
                    style.dot,
                    {
                      transform: [{ scale: dotScale }],
                      opacity: dotOpacity,
                    },
                  ]}
                />
              );
            })}
          </View>

        </View>

        <View style={style.getStartedBottom}>
          <Button title="Register" onPress={() => navigation.navigate('Register')} color={colors.yellow} />
          <Button title="Login" onPress={() => navigation.navigate('Login')} color={colors.yellow} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
