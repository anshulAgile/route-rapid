import { IUserListReq } from '../api/user/type';

export const userKeys = {
  all: ['user'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters: IUserListReq) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id: number) => [...userKeys.details(), id]
};

export const tagsKeys = {
  all: ['tags'] as const,
  tagsList: (args: any) => ['tags', args],
  detail: (id: string | number) => [...tagsKeys.all, id] as const
};

export const categoryKeys = {
  all: ['categories'] as const,
  categoryList: (args: any) => ['categories', args],
  detail: (id: string | number) => [...categoryKeys.all, id] as const
};

export const productKeys = {
  all: ['product'] as const,
  productList: (args: any) => ['product', args],
  detail: (id: string | number) => [...productKeys.all, id] as const
};

export const adminKeys = {
  all: ['admin'] as const,
  adminList: (args: any) => ['admin', args],
  detail: (id: string | number) => [...adminKeys.all, id] as const
};

export const serviceKeys = {
  all: ['service'] as const,
  serviceList: (args: any) => ['service', args],
  detail: (id: string | number) => [...serviceKeys.all, id] as const
};

export const resourceKeys = {
  all: ['resource'] as const,
  resourceList: (args: any) => ['resource', args],
  detail: (id: string | number) => [...resourceKeys.all, id] as const
};

export const clientKeys = {
  all: ['client'] as const,
  clientList: (args: any) => ['client', args],
  detail: (id: string | number) => [...clientKeys.all, id] as const
};

export const notificationKeys = {
  all: ['notification'] as const,
  notificationList: (args: any) => ['notification', args],
  notificationClientList: () => ['notification', 'clientlist'],
  detail: (id: string | number) => [...notificationKeys.all, id] as const
};

export const scanKeys = {
  all: ['scan'] as const,
  scanList: (args: any) => ['scan', args],
  scanAnalytics: ['scan', 'analytics'],
  detail: (id: string | number) => [...scanKeys.all, id] as const
};

export const subscriptionKeys = {
  all: ['subscription'] as const,
  subscriptionList: (args: any) => ['subscription', args],
  detail: (id: string | number) => [...subscriptionKeys.all, id] as const
};

export const settingsKeys = {
  all: ['settings'] as const,
  personalInfo: (id: string | number) => ['personalInfo', id]
};

export const analyticsKeys = {
  all: ['analytics'] as const,
  analyticsData: (id: string | number) => ['analytics', id]
};
