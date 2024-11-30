import * as Keychain from 'react-native-keychain';
import axiosInstance from '../utils/axiosInstance';

// Store refresh token as username and access token as password

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

export const refreshTokens = async (refreshToken) => {
  try {

    const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });

    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh;

    await Keychain.setGenericPassword('auth', JSON.stringify({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
    return true;
  } catch (error) {
    console.log('Error refreshing token:', error);
    return false;
  }
};
