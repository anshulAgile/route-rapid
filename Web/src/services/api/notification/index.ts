import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const notificationAPI = {
  async getNotificationList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.notification.notificationList}?page=${data?.page}&size=${data?.size}&notification_type=${data?.notification_type}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addNotification(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.notification.notificationList, data);
  },
  async editNotification(data: any, id: any): Promise<any> {
    return apiInstance.patch(`${ApiEndPoints.notification.notificationList}/${id}`, data);
  },
  async getNotificationDetails(id: number | string): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.notification.notificationList}/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getClientNameList(): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.notification.notificationClientList}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async deleteNotification(id_list: any): Promise<any> {
    return apiInstance
      .delete(
        `${ApiEndPoints.notification.deleteNotification}?id_list=${encodeURIComponent(JSON.stringify(id_list))}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
};
