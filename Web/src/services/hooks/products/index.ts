import useFetch from '..';
import { productAPI } from '../../../services/api/product';
import { productKeys } from '../queryKeys';

export const useProductList = (args: any) => {
  return useFetch({
    queryKey: productKeys.productList(args),
    apiFunction: () => productAPI.getProductList(args, 'list'),
    queryOptions: { staleTime: 0 }
  });
};
