import axiosInstance from '../utils/axiosInstance';

export const createCommunity = (communityData) => {
  return axiosInstance.post('/communities/', communityData)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const getCommunities = () => {
  return axiosInstance.get('/communities/')
    .then(response => response.data)
    .catch(err => { throw err; });
};
