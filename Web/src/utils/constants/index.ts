// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`
};

export const recipientOptions = [
  { id: '0', name: 'Patient Name', value: 0 },
  { id: '1', name: 'Patient Name', value: 1 }
];

export const recurringNotificationOptions = [
  { id: 1, name: 'Never' },
  { id: 2, name: 'Daily' },
  { id: 3, name: 'Weekly' },
  { id: 4, name: 'Fortnightly' },
  { id: 5, name: 'Monthly' },
  { id: 6, name: 'Annually' }
];

export const INITIAL_ARGS_RESOURCE = {
  search: '',
  ordering: '',
  page: 1,
  size: 8,
  categoryId: ''
};

// Api Endpoint
export const ApiEndPoints = {
  auth: {
    signIn: `auth/admin/login`,
    logout: `users/logout`
  },
};
