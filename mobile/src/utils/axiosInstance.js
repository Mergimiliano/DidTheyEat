import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const credentials = await Keychain.getGenericPassword();
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
          const refreshResponse = await axios.post('http://10.0.2.2:8000/token/refresh/', {
            refresh: await getRefreshToken(),
          });
  
          await Keychain.setGenericPassword('accessToken', refreshResponse.data.access);
  
          originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  async function getRefreshToken() {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials ? credentials.username : null;
    } catch (error) {
      console.error('Error fetching refresh token from Keychain:', error);
      return null;
    }
  }
  
  export default axiosInstance;
  