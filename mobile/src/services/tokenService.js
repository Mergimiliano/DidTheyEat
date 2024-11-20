import * as Keychain from 'react-native-keychain';

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

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;
    await Keychain.setGenericPassword('accessToken', newAccessToken);
    return true;
  } catch (error) {
    return false;
  }
};
