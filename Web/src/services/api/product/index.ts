import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const productAPI = {
  async getProductList(data: any, from: string): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.product.productList}${from === 'export' ? `?export=csv` : `?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getProduct(id: any): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.product.productList}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addProduct(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.product.productList, data);
  },
  async editProduct(data: any, id: number): Promise<any> {
    return apiInstance.put(`${ApiEndPoints.product.productList}/${id}`, data);
  },
  async deleteProduct(id: number): Promise<any> {
    return apiInstance
      .delete(`${ApiEndPoints.product.productList}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async hideProduct(data: any, id: number): Promise<any> {
    return apiInstance
      .patch(`${ApiEndPoints.product.productHide}/${id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
};
