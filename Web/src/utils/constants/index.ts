// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`
};

// Api Endpoint
export const ApiEndPoints = {
  auth: {
    signIn: `auth/admin/login`,
    logout: `users/logout`
  },
  userList:{
    list:(type : "driver"| "police")=>`user/by-role?Role=${type}`,
  },
  createUser:`auth/user/register`
};
