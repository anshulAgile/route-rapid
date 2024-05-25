import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const analyticsAPI = {
  async getAnalyticsData(id: any): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.analytics.anlyticsData}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
};
