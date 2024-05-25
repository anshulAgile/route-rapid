import { create } from 'zustand';

import { LocalStorageKeys } from '../../../utils/constants';

import apiInstance from '../../api';
import { IUserData } from './types';

export type IAuthStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: IUserData;
  isSuperAdmin?: boolean;
};

interface IAuthAction {
  actions: {
    loaderChange: (status: IAuthStore['isLoading']) => void;
    authSuccess: (payload: { data: IUserData }) => void;
    authFail: () => void;
    updateUser: (payload: IUserData) => void;
  };
}

export const authStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  isLoading: false,
  isLoggedIn: false,
  userData: {} as IUserData,

  // Actions
  actions: {
    loaderChange: (status) => set((state) => ({ ...state, isLoading: status })),
    authSuccess: (payload) =>
      set((state) => {
        apiInstance.defaults.headers.common['Authorization'] = `Token ${payload.data.token}`;
        localStorage.setItem(LocalStorageKeys.authToken, JSON.stringify(payload.data.token));
        localStorage.setItem(LocalStorageKeys.user, JSON.stringify(payload.data));
        return {
          ...state,
          userData: payload.data,
          isLoggedIn: true
        };
      }),
    authFail: () =>
      set((state) => {
        delete apiInstance.defaults.headers.common['Authorization'];
        localStorage.removeItem(LocalStorageKeys.authToken);
        localStorage.removeItem(LocalStorageKeys.user);
        return {
          ...state,
          userData: {} as IUserData,
          isLoggedIn: false
        };
      }),
    updateUser: (payload) =>
      set((state) => {
        const updatedUser = {
          ...state?.userData,
          business_name: payload?.business_name,
          email: payload?.email,
          first_name: payload?.first_name,
          last_name: payload?.last_name,
          profile_pic: payload?.profile_pic
        };
        localStorage.setItem(LocalStorageKeys.user, JSON.stringify(updatedUser));
        return {
          ...state,
          userData: updatedUser
        };
      })
  }
}));
