import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

  axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const credentials = await Keychain.getInternetCredentials('access_token');
          if (credentials) {
            config.headers['Authorization'] = `Bearer ${credentials.password}`;
          }
        } catch (error) {
          console.error('Error fetching token from Keychain:', error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const credentials = await Keychain.getInternetCredentials('refresh_token');
          const refreshToken = credentials?.password;
          if (!refreshToken) throw new Error('No refresh token found');

          const refreshResponse = await axios.post('http://10.0.2.2:8000/token/refresh/', {
            refresh: refreshToken,
          });
  
          const { access, refresh } = refreshResponse.data;
          await Keychain.setInternetCredentials('access_token', 'access', access);
          await Keychain.setInternetCredentials('refresh_token', 'refresh', refresh);
  
          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
export default axiosInstance;
  