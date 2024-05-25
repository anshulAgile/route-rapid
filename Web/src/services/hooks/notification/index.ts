import useFetch from '..';
import { notificationAPI } from '../../../services/api/notification';
import { notificationKeys } from '../queryKeys';

export const useNotificationList = (args: any) => {
  return useFetch({
    queryKey: notificationKeys.notificationList(args),
    apiFunction: () => notificationAPI.getNotificationList(args),
    queryOptions: { staleTime: 0 }
  });
};

export const useNotificationDetail = (id: string | number) => {
  return useFetch({
    queryKey: notificationKeys.detail(id),
    apiFunction: () => notificationAPI.getNotificationDetails(id),
    queryOptions: { staleTime: 0 }
  });
};

export const useClientNameList = () => {
  return useFetch({
    queryKey: notificationKeys.notificationClientList(),
    apiFunction: () => notificationAPI.getClientNameList(),
    queryOptions: { staleTime: 0 }
  });
};
