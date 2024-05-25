import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { API_BASE } from '../../utils/constants';
import { toastMessage } from '../../utils/functions';

import { authStore } from '../store/auth';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE
});

export function setAxiosInterceptor() {
  apiInstance.interceptors.request.use(
    (config) => {
      // Start Loading
      authStore.getState().actions.loaderChange(true);
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // It's used to intercept all the axios api response
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Stop Loading
      authStore.getState().actions.loaderChange(false);
      return response.data;
    },
    (err) => {
      authStore.getState().actions.loaderChange(false);
      if (err.response) {
        if (err.response.status === 401) {
          authStore.getState().actions.authFail();
          toastMessage('error', err?.response?.message);
          return Promise.reject(err);
        } else {
          return Promise.reject(err?.response?.data);
        }
      } else if (err.request) {
        return Promise.reject({
          response: {
            data: {
              message: 'Something went wrong, Please try again later!!!'
            }
          }
        });
      }
    }
  );
}

export default apiInstance;
