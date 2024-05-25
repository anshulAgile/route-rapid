import useFetch from '..';
import { clientAPI } from '../../../services/api/client';
import { clientKeys } from '../queryKeys';

export const useClientList = (args: any) => {
  return useFetch({
    queryKey: clientKeys.clientList(args),
    apiFunction: () => clientAPI.getClientList(args, 'list'),
    queryOptions: { staleTime: 0 }
  });
};
