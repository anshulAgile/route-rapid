import useFetch from '..';
import { categoryAPI } from '../../../services/api/category';
import { categoryKeys } from '../queryKeys';

export const useCategoryList = (args: any) => {
  return useFetch({
    queryKey: categoryKeys.categoryList(args),
    apiFunction: () => categoryAPI.getCategoryList(args),
    queryOptions: { staleTime: 0 }
  });
};
