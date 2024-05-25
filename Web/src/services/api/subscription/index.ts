import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const subscriptionAPI = {
  async getSubscriptionList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.subscription.subscriptionList}?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
};
