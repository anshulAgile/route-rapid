import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const adminAPI = {
  async getAdminList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.admin.adminList}?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getAdmin(id: any): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.admin.adminList}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addAdmin(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.admin.adminList, data);
  },
  async editAdmin(data: any, id: number): Promise<any> {
    return apiInstance.patch(`${ApiEndPoints.admin.adminList}/${id}`, data);
  },
  async deleteAdmin(id: number): Promise<any> {
    return apiInstance
      .delete(`${ApiEndPoints.admin.adminList}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
};
