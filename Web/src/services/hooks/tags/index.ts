import useFetch from '..';
import { tagsAPI } from '../../../services/api/tags';
import { tagsKeys } from '../queryKeys';

export const useTagsList = (args: any) => {
  return useFetch({
    queryKey: tagsKeys.tagsList(args),
    apiFunction: () => tagsAPI.getTagsList(args),
    queryOptions: { staleTime: 0 }
  });
};
