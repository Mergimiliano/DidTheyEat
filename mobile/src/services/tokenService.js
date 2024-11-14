import * as Keychain from 'react-native-keychain';

export const storeTokens = async (accessToken, refreshToken) => {
  try {
    await Keychain.setGenericPassword('auth', JSON.stringify({ accessToken, refreshToken }));
  } catch (error) {
    console.error('Error storing tokens', error);
  }
};

export const getTokens = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving tokens', error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Error clearing tokens', error);
  }
};
