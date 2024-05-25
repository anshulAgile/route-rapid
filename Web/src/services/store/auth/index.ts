import { create } from 'zustand';

import { LocalStorageKeys } from '../../../utils/constants';

import apiInstance from '../../api';
import { ISignInRes } from 'services/api/auth/types';

export type IAuthStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: ISignInRes;
  isSuperAdmin?: boolean;
};

interface IAuthAction {
  actions: {
    loaderChange: (status: IAuthStore['isLoading']) => void;
    authSuccess: (payload:  ISignInRes ) => void;
    authFail: () => void;
  };
}

export const authStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  isLoading: false,
  isLoggedIn: false,
  userData: {} as ISignInRes,

  // Actions
  actions: {
    loaderChange: (status) => set((state) => ({ ...state, isLoading: status })),
    authSuccess: (payload) =>
      set((state) => {
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;
        localStorage.setItem(LocalStorageKeys.authToken, JSON.stringify(payload.token));
        localStorage.setItem(LocalStorageKeys.user, JSON.stringify(payload));
        return {
          ...state,
          userData: payload,
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
          userData: {} as ISignInRes,
          isLoggedIn: false
        };
      }),
  }
}));
