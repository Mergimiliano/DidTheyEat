import { Text, View } from 'react-native';
import { style } from '../styles/style';

export default function Slider({item}) {

  return (
    <View style={style.slider}>
        <Text style={style.textTitle}> {item.title} </Text>
        <Text style={style.textSubtitle}> {item.text} </Text>
    </View>
  );
}
