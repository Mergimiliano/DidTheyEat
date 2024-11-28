import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const colors = {
  yellow: '#ffb71a',
  lightYellow: '#ffd571',
  peach: '#e2ae86',
  offWhite: '#f0f2f1',
  pink: '#fed6e1',
  navy: '#11264b',
};

const style = StyleSheet.create({
  background: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    position: 'absolute',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: wp('6%'),
    textAlign: 'center',
    color: colors.navy,
  },
  textSubtitle: {
    fontSize: wp('4%'),
    textAlign: 'center',
    color: colors.navy,
  },
  getStartedTop: {
    width: wp('100%'),
    height: hp('70%'),
    paddingTop: hp('5%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  getStartedBottom: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: hp('5%')
  },
  welcomeImage: {
    width: wp('80%'),
    height: hp('30%'),
    resizeMode: 'contain',
    marginTop: hp('3%'),
  },
});

export { style, colors };
