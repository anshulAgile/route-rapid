import useFetch from '..';
import { serviceAPI } from '../../../services/api/services';
import { serviceKeys } from '../queryKeys';

export const useServiceList = (args: any) => {
  return useFetch({
    queryKey: serviceKeys.serviceList(args),
    apiFunction: () => serviceAPI.getServiceList(args, 'list'),
    queryOptions: { staleTime: 0 }
  });
};
