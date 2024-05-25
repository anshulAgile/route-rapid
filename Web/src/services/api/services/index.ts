import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const serviceAPI = {
  async getServiceList(data: any, from: string): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.services.serviceList}${from === 'export' ? `?export=csv` : `?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getService(id: any): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.services.serviceList}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addService(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.services.serviceList, data);
  },
  async editService(data: any, id: number): Promise<any> {
    return apiInstance.patch(`${ApiEndPoints.services.serviceList}/${id}`, data);
  },
  async deleteService(id: number): Promise<any> {
    return apiInstance
      .delete(`${ApiEndPoints.services.serviceList}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async hideService(data: any, id: number): Promise<any> {
    return apiInstance
      .patch(`${ApiEndPoints.services.serviceHide}/${id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
};
