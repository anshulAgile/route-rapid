import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const clientAPI = {
  async getClientList(data: any, from: string): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.client.clientList}${from === 'export' ? `?export=csv` : `?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async deleteClient(id: number): Promise<any> {
    return apiInstance
      .delete(`${ApiEndPoints.client.deleteClient}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async verifyClient(id: number): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.client.verifyClient}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
};
