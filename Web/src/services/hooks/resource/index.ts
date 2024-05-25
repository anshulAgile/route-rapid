import useFetch from '..';
import { resourceAPI } from '../../../services/api/resource';
import { resourceKeys } from '../queryKeys';

export const useResourceList = (args: any) => {
  return useFetch({
    queryKey: resourceKeys.resourceList(args),
    apiFunction: () => resourceAPI.getResourceList(args),
    queryOptions: { staleTime: 0 }
  });
};

export const useResourceDetails = (id: string | number) => {
  return useFetch({
    queryKey: resourceKeys.detail(id),
    apiFunction: () => resourceAPI.getResourceDetails(id),
    queryOptions: { staleTime: 0 }
  });
};
