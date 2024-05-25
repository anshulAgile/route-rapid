import useFetch from '..';
import { subscriptionAPI } from '../../../services/api/subscription';
import { subscriptionKeys } from '../queryKeys';

export const useSubscriptionList = (args: any) => {
  return useFetch({
    queryKey: subscriptionKeys.subscriptionList(args),
    apiFunction: () => subscriptionAPI.getSubscriptionList(args),
    queryOptions: { staleTime: 0 }
  });
};
