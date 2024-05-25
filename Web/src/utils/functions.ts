import { message } from 'antd';

import { setAxiosInterceptor } from '../services/api';
import { authStore } from '../services/store/auth';
// import { authStore } from '../services/store/auth';
import { PhoneNumberValidatorProps } from './Types';
import { LocalStorageKeys } from './constants';

const { actions } = authStore.getState();

//To concate the path for the public folder
export const toAbsoluteUrl = (pathname: string) => window.location.origin + pathname;

export const setupAxios = () => {
  const userStorage = localStorage.getItem(LocalStorageKeys.user);
  const tokenStorage = localStorage.getItem(LocalStorageKeys.authToken);

  if (userStorage && tokenStorage) {
    const token = JSON.parse(tokenStorage);
    const userData = JSON.parse(userStorage);

    if (token) {
      actions.authSuccess({ ...userData });
    } else {
      actions.authFail();
    }
  }

  // Set Axios Interceptor
  setAxiosInterceptor();
};

export const appLoader = (status: boolean) => actions.loaderChange(status);

export const toastMessage = (type: string, content: string) => {
  if (type === 'success') {
    message.success(typeof content === 'string' ? content : 'Success');
  } else if (type === 'error') {
    message.error(typeof content === 'string' ? content : 'Something went wrong');
  }
};

export const validateWhiteSpace = (_: any, value: string, errMsg: string) => {
  const isValid = /^(?!\s+$).+$/.test(value);
  if (value && !isValid) {
    return Promise.reject(new Error(errMsg));
  } else {
    return Promise.resolve();
  }
};

export const phoneNumberValidator = ({
  value,
  numberLength,
  errorMessage,
  validationMessage
}: PhoneNumberValidatorProps) => {
  return new Promise((resolve, reject) => {
    if (value) {
      const phoneNumber = value?.replace(/\D/g, '');
      if (phoneNumber?.length !== (numberLength ?? 10)) {
        const error = new Error(validationMessage ?? 'Please enter valid phone number');
        reject(error);
      } else {
        resolve(phoneNumber);
      }
    } else {
      const error = new Error(errorMessage ?? 'Please enter phone number');
      reject(error);
    }
  });
};

export const debounce = (callback: any, delay: any) => {
  let timeoutHandler: any = null;
  return (...args: any) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      callback(...args);
      timeoutHandler = null;
    }, delay);
  };
};

export const formatPhoneNumber = (phone: string) => {
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, '');
  //check if number length equals to 10
  if (phone.length === 10) {
    //reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return null;
};

export const isAnyValueUndefined = (object: any) => {
  for (const key in object) {
    if (typeof object[key] === 'undefined') {
      return true; // Found an undefined value, return true
    }
  }
  return false; // No undefined values found
};

export const exportData = (data: any, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}