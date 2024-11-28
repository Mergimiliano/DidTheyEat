import { View, Text, ImageBackground, Image, SafeAreaView} from 'react-native';
import { style } from '../styles/style';
import Button from '../components/Button';

export default function GetStarted({ navigation }) {

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={style.background}>

        <View style={style.getStartedTop}>

          <Image source={require('../assets/welcome-image.png')} style={style.welcomeImage} />

          <Text style={style.textTitle}>Welcome, let's get started!</Text>

        </View>

        <View style={style.getStartedBottom}>
          <Button title="Register" onPress={() => navigation.navigate('Register')} />
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
