import useFetch from '..';
import { scanAPI } from '../../../services/api/scan';
import { scanKeys } from '../queryKeys';

export const useScanList = (args: any) => {
  return useFetch({
    queryKey: scanKeys.scanList(args),
    apiFunction: () => scanAPI.getScanList(args),
    queryOptions: { staleTime: 0 }
  });
};

export const useScanAnalytics = () => {
  return useFetch({
    queryKey: scanKeys.scanAnalytics,
    apiFunction: () => scanAPI.getScanAnalytics(),
    queryOptions: { staleTime: 0 }
  });
};
