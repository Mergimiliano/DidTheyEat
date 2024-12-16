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
  green: '#499167',
  red: '#A30000',
};

const style = StyleSheet.create({
  background: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    position: 'absolute',
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
  title: {
    fontWeight: 'bold',
    fontSize: wp('8%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
    color: colors.navy,
  },
  subtitle: {
    fontWeight: 600,
    fontSize: wp('5%'),
    textAlign: 'center',
    marginBottom: hp('1%'),
    color: colors.navy,
  },
  formText: {
    paddingLeft: 10,
    width: '100%',
    fontSize: wp('4%'),
    fontWeight: 800,
    color: colors.navy,
  },
  link: {
    color: colors.peach,
  },
  createButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('80%'),
    height: hp('6%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: wp('4%'),
    backgroundColor: colors.offWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    color: colors.navy,
    margin: wp('3%'),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navy,
    margin: wp('3%'),
    borderRadius: wp('100%'),
    paddingHorizontal: wp('4%'),
    height: hp('6%'),
  },
  searchText: {
    fontSize: wp('4%'),
    fontWeight: 800,
    color: colors.offWhite,
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
    backgroundColor: colors.navy,
    height: hp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    flex: 1,
  },
  imageWelcome: {
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
  bottomSheet:{
    backgroundColor: colors.yellow,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    height: 50,
    borderRadius: 8,
    margin: 16,
  },
  inviteText: {
    color: colors.offWhite,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.offWhite,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.navy,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: colors.gray,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  cancelText: {
    color: colors.offWhite,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: colors.green,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  submitText: {
    color: colors.offWhite,
    textAlign: 'center',
  },
});

export { style, colors };
