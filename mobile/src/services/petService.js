import axiosInstance from '../utils/axiosInstance';

export const getPets = (communityId) => {
  return axiosInstance.get(`/communities/${communityId}/pets/`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const getPet = (id) => {
  return axiosInstance.get(`/pets/${id}`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const createPet = (communityId,petData) => {
  return axiosInstance.post(`/communities/${communityId}/pets/`, petData)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const updatePet = (id, petData) => {
  return axiosInstance.patch(`/pets/${id}/`, petData)
    .then(response => response.data)
    .catch(err => { throw err; });
};

export const deletePet = (id) => {
  return axiosInstance.delete(`/pets/${id}/`)
    .then(response => response.data)
    .catch(err => { throw err; });
};
