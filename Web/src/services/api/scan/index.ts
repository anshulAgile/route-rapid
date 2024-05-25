import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const scanAPI = {
  async getScanList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.scan.scanList}?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getScanAnalytics(): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.scan.scanAnalytics}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
};
