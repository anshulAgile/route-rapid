import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const resourceAPI = {
  async getResourceList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.resource.resourceList}?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}&category_id=${data?.categoryId}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addResource(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.resource.resourceList, data);
  },
  async getResourceDetails(id: number | string): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.resource.resourceDetails}/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  }
};
