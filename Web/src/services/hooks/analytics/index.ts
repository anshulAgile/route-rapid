import useFetch from '..';
import { analyticsAPI } from '../../api/analytics';
import { analyticsKeys } from '../queryKeys';

export const useAnalyticsData = (id: any) => {
  return useFetch({
    queryKey: analyticsKeys.analyticsData(id),
    apiFunction: () => analyticsAPI.getAnalyticsData(id),
    queryOptions: { staleTime: 0 }
  });
};
