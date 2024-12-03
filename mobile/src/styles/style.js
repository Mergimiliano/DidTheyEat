import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const colors = {
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
    fontSize: wp('8%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
    color: colors.navy,
  },
  textSubtitle: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
    color: colors.navy,
  },
  link:{
    color: colors.peach,
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
    marginBottom: hp('6%')
  },
  welcomeImage: {
    width: wp('80%'),
    height: hp('30%'),
    resizeMode: 'contain',
    marginTop: hp('3%'),
  },
  slider: {
    width: wp('100%'),
    marginTop: hp('3%'),
    alignItems: 'center'
  },
  sliderWidth: wp('100%'),
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    marginHorizontal: 5,
  },
});

export { style, colors };
