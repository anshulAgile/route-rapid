import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const tagsAPI = {
  async getTagsList(data: any): Promise<any> {
    return apiInstance
      .get(
        `${ApiEndPoints.tags.tagsList}?search=${data?.search}&ordering=${data?.ordering}&page=${data?.page}&size=${data?.size}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async addTag(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.tags.tagsList, data);
  },
  async deleteTag(id: number): Promise<any> {
    return apiInstance
      .delete(`${ApiEndPoints.tags.tagsList}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getDropdownTagList(): Promise<any> {
    return apiInstance
      .get(ApiEndPoints.tags.tagsDropdownList)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  }
};
