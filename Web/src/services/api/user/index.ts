import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';
import { IApiSuccess } from 'utils/Types';
import { ICreatePoliceReq, IPoliceRes } from './type';

export const policeAPI = {
  async getPoliceList(): Promise<IApiSuccess<IPoliceRes>> {
    return apiInstance
      .get(
        `${ApiEndPoints.userList.list("police")}`
      )
  },
  async createPolice(data: ICreatePoliceReq): Promise<any> {
    return apiInstance.post(ApiEndPoints.createUser, data);
  },
  async getDriverList(): Promise<IApiSuccess<IPoliceRes>> {
    return apiInstance
      .get(
        `${ApiEndPoints.userList.list("driver")}`
      )
  },
};
