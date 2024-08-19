import axios from 'axios';

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(`token`);
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
      const { response } = error;
      if (response && [401, 403].includes(response.status)) {
        const channel = new BroadcastChannel('40x');
        channel.postMessage('40x');
      }
      return Promise.reject(error);
    },
  );
};

export default setupAxiosInterceptors;
