// src/api/axiosInstance.js
import axios from 'axios';
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
      // 处理响应错误
      return Promise.reject(error);
    },
  );
};

export default setupAxiosInterceptors;
