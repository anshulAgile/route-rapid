import { policeAPI } from '../../api/user';
import useFetch from '..';
import { keys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const usePoliceList = () => {
  return useFetch({
    queryKey: keys.police,
    apiFunction: () => policeAPI.getPoliceList(),
    queryOptions: { staleTime: 0 }
  });
};

export const useDriverList = () => {
  return useFetch({
    queryKey: keys.driver,
    apiFunction: () => policeAPI.getDriverList(),
    queryOptions: { staleTime: 0 }
  });
};
