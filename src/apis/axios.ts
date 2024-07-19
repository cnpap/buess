// src/api/axiosInstance.js
import axios, { AxiosResponse } from 'axios';
import { VITE_LOGTO_APP_ID } from '@/const';

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(`logto:${VITE_LOGTO_APP_ID}:idToken`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const response = error as AxiosResponse;
      if (response.status === 401) {
        location.href = '/auth';
      }
      return Promise.reject(error);
    },
  );
};

export default setupAxiosInterceptors;
