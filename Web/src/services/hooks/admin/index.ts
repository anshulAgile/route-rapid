import useFetch from '..';
import { adminAPI } from '../../../services/api/admin';
import { adminKeys } from '../queryKeys';

export const useAdminList = (args: any) => {
  return useFetch({
    queryKey: adminKeys.adminList(args),
    apiFunction: () => adminAPI.getAdminList(args),
    queryOptions: { staleTime: 0 }
  });
};
