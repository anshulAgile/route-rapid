import useFetch from '..';
import { userAPI } from '../../api/user';
import { IUserListReq } from '../../api/user/type';
import { userKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useUserList = (args: IUserListReq) => {
  return useFetch({
    queryKey: userKeys.list(args),
    apiFunction: () => userAPI.getUserList(args),
    queryOptions: { staleTime: 0 }
  });
};
