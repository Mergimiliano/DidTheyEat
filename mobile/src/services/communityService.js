import axiosInstance from '../utils/axiosInstance';

export const getCommunities = () => {
  return axiosInstance.get('/communities/')
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const getCommunity = (id) => {
  return axiosInstance.get(`/communities/${id}`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const createCommunity = (communityData) => {
  return axiosInstance.post('/communities/', communityData)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const updateCommunity = (id, communityData) => {
  return axiosInstance.patch(`/communities/${id}`, communityData)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const deleteCommunity = (id) => {
  return axiosInstance.delete(`/communities/${id}`)
    .then(response => response.data)
    .catch(err => { throw err; });
};
