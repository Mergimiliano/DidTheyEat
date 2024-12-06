import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const colors = {
  yellow: '#ffb71a',
  peach: '#e2ae86',
  offWhite: '#f0f2f1',
  navy: '#11264b',
  green: '#688E26',
  red: '#E75A7C',
  violet: '#A67DB8',
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
    marginBottom: hp('6%'),
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
    alignItems: 'center',
  },
  sliderWidth: wp('100%'),
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('6%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: wp('4%'),
    backgroundColor: colors.offWhite,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  textForm: {
    fontSize: wp('4%'),
    fontWeight: 800,
    color: colors.navy,
  },
  icon: {
    color:colors.navy,
    margin: wp('3%')
  },
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
  tab: {
    backgroundColor: colors.yellow,
    height: hp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    flex: 1,
  },
  topBar:{
    width: wp('100%'),
    height: hp('12%'),
    backgroundColor: colors.violet,
    borderBottomColor: colors.navy,
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('1%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('3%'),
    elevation: 6,
    paddingHorizontal: wp('3%'),
    justifyContent: 'center',
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('3%'),
    height: hp('5%'),
    flex: 1,
  },

});

export { style, colors };
