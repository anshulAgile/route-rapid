import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const settingsAPI = {
  async getPersonalInfo(id: any): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.settings.personalInfo}/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async updatePersonalInfo(id: any, data: any): Promise<any> {
    return apiInstance.patch(`${ApiEndPoints.settings.personalInfo}/${id}`, data);
  }
};
