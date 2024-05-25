import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const categoryAPI = {
  async getCategoryList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.category.categoryList}?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addCategory(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.category.categoryList, data);
  },
  async deleteCategory(id: number): Promise<any> {
    return apiInstance
      .delete(`${ApiEndPoints.category.categoryList}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getDropdownCategoryList(): Promise<any> {
    return apiInstance
      .get(ApiEndPoints.category.categoryDropdownList)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  }
};
