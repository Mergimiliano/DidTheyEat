import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 667;
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

const responsiveFontSize = (size) => Math.round(size * scale);
const responsiveHeight = (size) => Math.round(size * scaleHeight);
const responsiveWidth = (size) => Math.round(size * scaleWidth);

const colors = {
  yellow: '#ffb71a',
  lightYellow: '#ffd571',
  peach: '#e2ae86',
  offWhite: '#f0f2f1',
  pink: '#fed6e1',         
  navy: '#11264b',
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveFontSize(16),
    backgroundColor: colors.offWhite,
  },
  card: {
    width: '80%',
    height: responsiveHeight(200),
    padding: responsiveFontSize(16),
    marginVertical: responsiveFontSize(10),
    borderRadius: responsiveFontSize(12),
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: responsiveFontSize(4) },
    shadowOpacity: 0.1,
    shadowRadius: responsiveFontSize(6),
    elevation: 3,
    backgroundColor: colors.yellow,
  },

  textHeading: {
    fontFamily: 'Satoshi, sans-serif',
    fontSize: responsiveFontSize(24),
    lineHeight: responsiveFontSize(24) * 1.3,
    letterSpacing: -0.005 * responsiveFontSize(24),
    color: colors.navy,
  },
  textBody: {
    fontFamily: 'Satoshi, sans-serif',
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(16) * 1.5,
    letterSpacing: -0.01 * responsiveFontSize(16),
    color: colors.navy,
  },
  textAccent: {
    fontFamily: 'Satoshi, sans-serif',
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveFontSize(18) * 1.5,
    letterSpacing: -0.02 * responsiveFontSize(18),
    color: colors.pink,
  },
  button: {
    display: 'inline-block',
    position: 'relative',
    marginBottom: 14, // Equivalent to margin: 0 0 0.875em 0
    borderWidth: 2, // Equivalent to border-width: 2px
    borderColor: 'currentColor', // Use text color for border (or any specific color)
    borderRadius: 16, // Equivalent to border-radius: 0.5em
    boxShadow: '0 6px 0 rgba(0, 0, 0, 0.1)', // Mimic box-shadow
    backgroundColor: '#fff', // Default white background
    paddingVertical: 14, // Padding calculated from the CSS (calc formula)
    paddingHorizontal: 30, // Horizontal padding equivalent
    textAlign: 'center',
    color: '#183153', // Text color (rgb equivalent)
    fontWeight: '600', // Equivalent to font-weight: 600
    cursor: 'pointer', // Cursor pointer for web (will not affect React Native)
    userSelect: 'none', // Prevent text selection
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi, sans-serif', // Custom font
    fontSize: 16, // Font size
    color: '#183153', // Text color (same as border)
  },
  buttonActive: {
    backgroundColor: '#e2ae86', // Peach color for active state
    borderColor: '#ffb71a', // Yellow border when pressed
  },
});

export { style, colors, responsiveFontSize, responsiveHeight, responsiveWidth };
