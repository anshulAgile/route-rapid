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
    signIn: `users/login`,
    forgotPassword: `/users/forgot-password/`,
    logout: `users/logout`
  },
  user: {
    userList: `admin/user/list`
  },
  tags: {
    tagsList: `resources/tag`,
    tagsDropdownList: `resources/tag-name-list`
  },
  category: {
    categoryList: `resources/category`,
    categoryDropdownList: `resources/category-name-list`
  },
  product: {
    productList: `products/product`,
    productHide: `products/update-product-hide-status`
  },
  admin: {
    adminList: `users/admin`
  },
  services: {
    serviceList: `services/service`,
    serviceHide: `services/update-service-hide-status`
  },
  resource: {
    resourceList: `resources/resource`,
    resourceDetails: `resources/resources`
  },
  upload: {
    getUploadUrl: `api/v1/users/get-presigned-upload-urls`
  },
  client: {
    clientList: `users/clients`,
    deleteClient: `users/client`,
    verifyClient: `api/v1/users/verification`
  },
  notification: {
    notificationList: `notifications/notification`,
    notificationClientList: `notifications/notification-clients`,
    deleteNotification: `notifications/notification-delete`
  },
  scan: {
    scanList: `scans/scanhistory`,
    scanAnalytics: `users/analytics/admin`
  },
  subscription: {
    subscriptionList: `subscription/subscription`
  },
  settings: {
    personalInfo: `users/my-setting`
  },
  analytics: {
    anlyticsData: `users/analytics`
  }
};
