export const ROUTES = {
  default: `/`,
  pageNotFound: `/404`,
  signIn: `/signIn`,
  police: `/police`,
  driver: `/driver`,
  recoverPassword: `/recover-password`,
  myAccount: `/myAccount`,

  // clientProfile: (id: number) => `/client-profile/${id}`,
  // cliebtSubscription: (id: number) => `/client-profile/${id}`,
  dynamicPath: (path: string) => `/static-path/${path}`
};
