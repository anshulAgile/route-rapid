import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';

export const uploadAPI = {
  async getUploadFileUrl(data: any): Promise<any> {
    return apiInstance.post(ApiEndPoints.upload.getUploadUrl, data);
  }
};
